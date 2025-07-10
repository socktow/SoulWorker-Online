import { NextResponse } from 'next/server';
import {
  checkMoMoPayment,
  checkZaloPayment,
  getConfig
} from '@/lib/auth/apizalo';

export async function POST(request) {
  try {
    const body = await request.json();
    const { type, amount, description, appUser, orderInfo, appTransId, orderId, action } = body;

    if (!type) {
      return NextResponse.json({ error: 'Missing payment type' }, { status: 400 });
    }

    // if (type === 'momo') {
    //   if (action === 'check') {
    //     if (!orderId) return NextResponse.json({ error: 'Missing orderId' }, { status: 400 });
    //     const result = await checkMoMoPayment(orderId);
    //     return NextResponse.json(result);
    //   } else {
    //     if (!amount) return NextResponse.json({ error: 'Missing amount' }, { status: 400 });
    //     const result = await createMoMoPayment(amount, orderInfo);
    //     return NextResponse.json(result);
    //   }
    // }

    if (type === 'zalo') {
      if (action === 'check') {
        if (!appTransId) return NextResponse.json({ error: 'Missing appTransId' }, { status: 400 });
        const result = await checkZaloPayment(appTransId);
        return NextResponse.json(result);
      } else {
        if (!amount) return NextResponse.json({ error: 'Missing amount' }, { status: 400 });
        const result = await createZaloPayment(amount, description, appUser);
        return NextResponse.json(result);
      }
    }

    return NextResponse.json({ error: 'Invalid payment type' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  // Trả về config các cổng thanh toán
  return NextResponse.json(getConfig());
} 