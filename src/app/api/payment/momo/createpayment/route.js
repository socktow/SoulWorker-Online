// src/app/api/payment/momo/createpayment/route.js
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import axios from 'axios';

export async function POST(request) {
  try {
    const {
      MOMO_ACCESS_KEY,
      MOMO_SECRET_KEY,
      MOMO_PARTNER_CODE,
      MOMO_REDIRECT_URL,
      MOMO_IPN_URL,
      MOMO_REQUEST_TYPE,
      MOMO_EXTRA_DATA,
      MOMO_ORDER_GROUP_ID,
      MOMO_AUTO_CAPTURE,
      MOMO_LANG
    } = process.env;

    const { amount } = await request.json();
    const orderId = MOMO_PARTNER_CODE + Date.now();
    const requestId = orderId;
    const orderInfo = `SWVN - ${orderId}`;

    const rawSignature = `accessKey=${MOMO_ACCESS_KEY}&amount=${amount}&extraData=${MOMO_EXTRA_DATA}&ipnUrl=${MOMO_IPN_URL}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${MOMO_PARTNER_CODE}&redirectUrl=${MOMO_REDIRECT_URL}&requestId=${requestId}&requestType=${MOMO_REQUEST_TYPE}`;

    const signature = crypto
      .createHmac('sha256', MOMO_SECRET_KEY)
      .update(rawSignature)
      .digest('hex');

    const requestBody = {
      partnerCode: MOMO_PARTNER_CODE,
      partnerName: 'KuromiShop',
      storeId: 'MomoTestStore',
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl: MOMO_REDIRECT_URL,
      ipnUrl: MOMO_IPN_URL,
      lang: MOMO_LANG,
      requestType: MOMO_REQUEST_TYPE,
      autoCapture: MOMO_AUTO_CAPTURE === 'true',
      extraData: MOMO_EXTRA_DATA,
      orderGroupId: MOMO_ORDER_GROUP_ID,
      signature,
    };

    const { data } = await axios.post(
      'https://test-payment.momo.vn/v2/gateway/api/create',
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
