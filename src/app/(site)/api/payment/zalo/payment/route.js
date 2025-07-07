import { NextResponse } from 'next/server';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import moment from 'moment';

export async function POST(request) {
  try {
    const {
      ZALO_APP_ID,
      ZALO_KEY1,
      ZALO_ENDPOINT,
      ZALO_REDIRECT_URL,
      ZALO_CALLBACK_URL,
    } = process.env;

    const { amount } = await request.json();

    const embed_data = {
      redirecturl: ZALO_REDIRECT_URL,
    };

    const items = [];
    const transID = Math.floor(Math.random() * 1000000);
    const app_trans_id = `${moment().format('YYMMDD')}${transID}`;

    const order = {
      app_id: ZALO_APP_ID,
      app_trans_id,
      app_user: 'user123',
      app_time: Date.now(),
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount,
      callback_url: ZALO_CALLBACK_URL,
      description: `Kuromi - Payment for the order #${transID}`,
      bank_code: '',
    };

    const data =
      order.app_id +
      '|' +
      order.app_trans_id +
      '|' +
      order.app_user +
      '|' +
      order.amount +
      '|' +
      order.app_time +
      '|' +
      order.embed_data +
      '|' +
      order.item;

    order.mac = CryptoJS.HmacSHA256(data, ZALO_KEY1).toString();

    const result = await axios.post(ZALO_ENDPOINT, null, {
      params: order,
    });

    return NextResponse.json({
      ...result.data,
      app_trans_id,
      amount,
      description: order.description
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
