import { NextResponse } from 'next/server';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import qs from 'qs';

export async function POST(request) {
  try {
    const { app_trans_id } = await request.json();

    const { ZALO_APP_ID, ZALO_KEY1 } = process.env;

    const data = `${ZALO_APP_ID}|${app_trans_id}|${ZALO_KEY1}`;
    const mac = CryptoJS.HmacSHA256(data, ZALO_KEY1).toString();

    const postData = {
      app_id: ZALO_APP_ID,
      app_trans_id,
      mac,
    };

    const response = await axios.post(
      'https://sb-openapi.zalopay.vn/v2/query',
      qs.stringify(postData),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
