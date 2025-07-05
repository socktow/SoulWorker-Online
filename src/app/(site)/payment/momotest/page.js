'use client';

import { useSearchParams } from 'next/navigation';

export default function MomoTestPage() {
  const searchParams = useSearchParams();

  const paymentInfo = {
    partnerCode: searchParams.get('partnerCode'),
    orderId: searchParams.get('orderId'),
    requestId: searchParams.get('requestId'),
    amount: searchParams.get('amount'),
    orderInfo: searchParams.get('orderInfo'),
    orderType: searchParams.get('orderType'),
    transId: searchParams.get('transId'),
    resultCode: searchParams.get('resultCode'),
    message: searchParams.get('message'),
    payType: searchParams.get('payType'),
    responseTime: searchParams.get('responseTime'),
    extraData: searchParams.get('extraData'),
    signature: searchParams.get('signature'),
  };

  const status =
    paymentInfo.resultCode === '0'
      ? '✅ Thanh toán thành công'
      : '❌ Thanh toán thất bại';

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-indigo-600">
          Kết quả giao dịch Momo
        </h1>
        <p className="text-lg font-medium mb-4 text-center">{status}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          {Object.entries(paymentInfo).map(([key, value]) => (
            <div key={key} className="border p-3 rounded bg-gray-100">
              <span className="font-semibold capitalize">{key}:</span>
              <div className="break-words text-gray-700 mt-1">
                {value || '—'}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
            Back Home
        </div>
      </div>
    </main>
  );
}
