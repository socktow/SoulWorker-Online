import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();
  const { resultCode } = body;

  console.log('📥 Momo Callback:', body);

  switch (resultCode) {
    case 0:
      console.log('✅ Thanh toán thành công');
      break;
    case 5:
      console.log('❌ Người dùng đã hủy giao dịch');
      break;
    case 9:
      console.log('⚠️ Thông tin đơn hàng không hợp lệ');
      break;
    case 11:
      console.log('❌ Giao dịch bị từ chối bởi ngân hàng');
      break;
    case 12:
      console.log('❌ Không đủ số dư');
      break;
    case 13:
      console.log('❌ Giao dịch bị từ chối bởi Momo');
      break;
    default:
      console.log(`❌ Lỗi không xác định. Mã lỗi: ${resultCode}`);
  }

  const redirectUrl = `https://kuromi-shop.vercel.app/testpayment?resultCode=${resultCode}`;
  return NextResponse.redirect(redirectUrl);
}
