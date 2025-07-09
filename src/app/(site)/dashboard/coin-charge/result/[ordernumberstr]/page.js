// app/Zalotest/Result/[ordernumberstr]/page.tsx
"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import QRCode from "react-qr-code";

export default function ZaloResultPage() {
  const { ordernumberstr } = useParams();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [status, setStatus] = useState("⏳ Đang kiểm tra...");
  const [success, setSuccess] = useState(false);
  const intervalRef = useRef(null);

  const fetchPaymentInfo = async () => {
    const res = await fetch("/api/payment/zalo/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ordernumberstr }),
    });

    const data = await res.json();
    setPaymentInfo(data);
  };

  const checkStatus = async () => {
    const res = await fetch("/api/payment/zalo/checkpayment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ app_trans_id: ordernumberstr }),
    });

    const data = await res.json();
    console.log("📦 paymentInfo data:", data);

    if (data.return_code === 1) {
      setStatus("✅ Thanh toán thành công!");
      setSuccess(true);
      clearInterval(intervalRef.current);
    } else {
      setStatus("⏳ Đang xử lý hoặc chưa thanh toán");
    }
  };

  useEffect(() => {
    fetchPaymentInfo();
    checkStatus(); // check ngay từ đầu
    intervalRef.current = setInterval(checkStatus, 5000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  if (!paymentInfo) {
    return (
      <div className="p-6 text-center text-gray-500">Đang tải thông tin...</div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Thông tin giao dịch</h2>

      <div className="bg-white p-4 rounded shadow text-sm text-gray-700">
        <p>
          <strong>Mã giao dịch:</strong> {ordernumberstr}
        </p>
        <p>
          <strong>Số tiền:</strong>{" "}
          {paymentInfo.amount?.toLocaleString("vi-VN")} VND
        </p>
        <p>
          <strong>Nội dung:</strong> {paymentInfo.description}
        </p>
        <p>
          <strong>Hết hạn:</strong>{" "}
          {paymentInfo.expireAt
            ? new Date(paymentInfo.expireAt).toLocaleString("vi-VN")
            : "Không rõ"}
        </p>
        <p>
          <strong>Trạng thái:</strong> {status}
        </p>
        {paymentInfo.order_url && (
          <p>
            <strong>Link thanh toán:</strong>{" "}
            <a
              href={paymentInfo.order_url}
              target="_blank"
              className="text-blue-600 underline"
            >
              Mở trong Zalo
            </a>
          </p>
        )}
      </div>

      {!success && paymentInfo.qr_code && (
        <div className="mt-6 flex flex-col items-center gap-2">
          <QRCode value={paymentInfo.qr_code} size={200} />
          <p className="text-sm text-gray-500">
            Quét bằng ZaloPay để thanh toán
          </p>
        </div>
      )}

      {success && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded shadow">
          <p>🎉 Giao dịch đã được xác nhận thành công!</p>
        </div>
      )}
    </div>
  );
}
