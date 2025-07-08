import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { connectMongo } from '@/lib/mongodb';
import { User } from '@/models/user.model';
import { Order } from '@/models/order.model';
import { redis } from '@/lib/redis';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import moment from 'moment';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request) {
  try {
    const {
      ZALO_APP_ID,
      ZALO_KEY1,
      ZALO_ENDPOINT,
      ZALO_REDIRECT_URL,
      ZALO_CALLBACK_URL,
    } = process.env;

    if (!ZALO_APP_ID || !ZALO_KEY1 || !ZALO_ENDPOINT || !ZALO_REDIRECT_URL || !ZALO_CALLBACK_URL) {
      return NextResponse.json({ error: 'Missing ZaloPay environment variables' }, { status: 500 });
    }

    // ✅ Lấy token từ cookie
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: missing token' }, { status: 401 });
    }

    // ✅ Xác minh JWT
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    const userId = payload.userId;

    // ✅ Kiểm tra token trong Redis
    const redisUserId = await redis.get(`token:${token}`);
    if (!redisUserId || redisUserId !== userId) {
      return NextResponse.json({ error: 'Unauthorized: token expired or invalid' }, { status: 401 });
    }

    // ✅ Lấy thông tin user từ MongoDB
    await connectMongo();
    const user = await User.findById(userId).lean();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // ✅ Đọc thông tin đơn hàng từ body
    const body = await request.json();
    const { amount, method, item } = body;

    if (!amount || typeof amount !== 'number' || !method || !item) {
      return NextResponse.json({ error: 'Missing or invalid parameters' }, { status: 400 });
    }

    // ✅ Tạo thông tin đơn hàng
    const embed_data = { redirecturl: ZALO_REDIRECT_URL };
    const items = [item];

    const transID = Math.floor(Math.random() * 1000000);
    const app_trans_id = `${moment().format('YYMMDD')}${transID}`;
    const description = `${user.username} nạp ${amount.toLocaleString('vi-VN')} VND vào game SoulWorker qua ZaloPay`;

    const order = {
      app_id: ZALO_APP_ID,
      app_trans_id,
      app_user: user.username,
      app_time: Date.now(),
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount,
      callback_url: ZALO_CALLBACK_URL,
      description,
      bank_code: '',
    };

    // ✅ Tạo MAC
    const dataToSign =
      `${order.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
    order.mac = CryptoJS.HmacSHA256(dataToSign, ZALO_KEY1).toString();

    // ✅ Gửi yêu cầu tới ZaloPay
    const result = await axios.post(ZALO_ENDPOINT, null, {
      params: order,
    });

    // ✅ Lưu đơn hàng vào MongoDB
    await Order.create({
      userId,
      username: user.username,
      app_trans_id,
      amount,
      method,
      item: items,
      status: 'pending',
      description,
      zalo_response: result.data,
    });

    // ✅ Trả về kết quả cho frontend
    return NextResponse.json({
      ...result.data,
      ordernumberstr: app_trans_id,
      amount,
      description,
    });
  } catch (error) {
    console.error('ZaloPay Payment Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
