// src/app/api/payment/momo/checkpayment/route.js
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import axios from 'axios';

export async function POST(request) {
  try {
    const {
      MOMO_ACCESS_KEY,
      MOMO_SECRET_KEY,
      MOMO_PARTNER_CODE,
      MOMO_LANG
    } = process.env;

    const { orderId } = await request.json();
    const rawSignature = `accessKey=${MOMO_ACCESS_KEY}&orderId=${orderId}&partnerCode=${MOMO_PARTNER_CODE}&requestId=${orderId}`;

    const signature = crypto
      .createHmac('sha256', MOMO_SECRET_KEY)
      .update(rawSignature)
      .digest('hex');

    const requestBody = {
      partnerCode: MOMO_PARTNER_CODE,
      requestId: orderId,
      orderId,
      signature,
      lang: MOMO_LANG,
    };

    const { data } = await axios.post(
      'https://test-payment.momo.vn/v2/gateway/api/query',
      requestBody,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
