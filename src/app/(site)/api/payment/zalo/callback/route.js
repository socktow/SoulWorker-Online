import { NextResponse } from 'next/server';
import CryptoJS from 'crypto-js';

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

    // TODO: Update DB for this order as paid

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
