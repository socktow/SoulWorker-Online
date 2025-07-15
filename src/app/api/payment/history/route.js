import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { connectMongo } from "@/lib/mongodb";
import { UserPayment } from "@/models/userpayment.model";
import { redis } from "@/lib/redis";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function GET(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );
    const userId = payload.userId;

    const redisUserId = await redis.get(`token:${token}`);
    if (!redisUserId || redisUserId !== userId) {
      return NextResponse.json(
        { error: "Token expired or invalid" },
        { status: 401 }
      );
    }

    await connectMongo();

    // Lấy params từ URL
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const skip = (page - 1) * limit;

    const payments = await UserPayment.find({ userId })
      .sort({ paidAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await UserPayment.countDocuments({ userId });

    return NextResponse.json({
      total,
      page,
      limit,
      payments,
    });
  } catch (err) {
    console.error("Coin purchase history error:", err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
