// src/app/api/payment/zalo/query/route.js
import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { Order } from '@/models/order.model';

export async function POST(req) {
  try {
    const { ordernumberstr } = await req.json();

    if (!ordernumberstr) {
      return NextResponse.json({ error: "Thiếu mã đơn hàng" }, { status: 400 });
    }

    await connectMongo();

    const order = await Order.findOne({ app_trans_id: ordernumberstr }).lean();

    if (!order) {
      return NextResponse.json({ error: "Không tìm thấy đơn hàng" }, { status: 404 });
    }

    return NextResponse.json({
      app_trans_id: order.app_trans_id,
      status: order.status,
      amount: order.amount,
      method: order.method,
      zp_trans_id: order.zp_trans_id,
      description: order.description,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      expireAt: order.expireAt,
      order_url: order.zalo_response?.order_url || null,
      qr_code: order.zalo_response?.qr_code || null,
    });
  } catch (err) {
    console.error("Lỗi khi truy vấn đơn hàng:", err);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
