import { NextResponse } from 'next/server';
import CryptoJS from 'crypto-js';
import { connectMongo } from '@/lib/mongodb';
import { Order } from '@/models/order.model';

export async function POST(request) {
  try {
    const body = await request.json();
    const { data: dataStr, mac: reqMac } = body;
    const { ZALO_KEY2 } = process.env;

    const mac = CryptoJS.HmacSHA256(dataStr, ZALO_KEY2).toString();

    if (reqMac !== mac) {
      return NextResponse.json({
        return_code: -1,
        return_message: 'mac not equal',
      });
    }

    const data = JSON.parse(dataStr);
    console.log('ZaloPay callback received for order:', data.app_trans_id);

    // 👉 Kết nối Mongo và cập nhật đơn hàng
    await connectMongo();
    const order = await Order.findOne({ app_trans_id: data.app_trans_id });

    if (!order) {
      console.warn('Order not found for callback:', data.app_trans_id);
      return NextResponse.json({
        return_code: 1,
        return_message: 'Order not found, but acknowledged',
      });
    }

    order.status = String(data.status) === '1' ? 'fail' : 'success';

    order.zalo_response = data;
    await order.save();

    return NextResponse.json({
      return_code: 1,
      return_message: 'success',
    });
  } catch (error) {
    return NextResponse.json({
      return_code: 0,
      return_message: error.message,
    });
  }
}
