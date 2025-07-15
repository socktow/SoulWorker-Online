import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  // TODO: Xử lý truy vấn database tại đây

  const total = 25;
  const usageHistory = Array.from({ length: limit }, (_, index) => ({
    id: (page - 1) * limit + index + 1,
    type: "Giftcode",
    value: 500,
    description: "Sử dụng giftcode tháng 7",
    createdAt: new Date().toISOString(),
  }));

  return NextResponse.json({
    history: usageHistory,
    total,
  });
}
