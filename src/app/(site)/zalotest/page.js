"use client";
import { useState, useEffect, useRef } from "react";
import QRCode from "react-qr-code";

export default function ZaloQRCodeDisplay() {
  const [qrCodeValue, setQrCodeValue] = useState("");
  const [appTransId, setAppTransId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [successInfo, setSuccessInfo] = useState(null);
  const intervalRef = useRef(null);

  const handlePayment = async () => {
    setPaymentStatus(null);
    setSuccessInfo(null);
    const res = await fetch("/api/payment/zalo/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 50000 }),
    });

    const data = await res.json();
    setQrCodeValue(data.qr_code);
    setAppTransId(data.app_trans_id);
    setPaymentInfo(data);
    startAutoCheck(data.app_trans_id, data);
  };

  const startAutoCheck = (appTransId, originalInfo) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(async () => {
      const res = await fetch("/api/payment/zalo/checkpayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ app_trans_id: appTransId }),
      });

      const data = await res.json();

      if (data.return_code === 1) {
        setPaymentStatus("✅ Thành công");
        clearInterval(intervalRef.current);
        intervalRef.current = null;

        setSuccessInfo({
          app_trans_id: appTransId,
          amount: originalInfo.amount,
          description: originalInfo.description,
          success_time: new Date().toLocaleString("vi-VN"),
        });
      } else {
        setPaymentStatus("⏳ Đang xử lý hoặc thất bại");
      }
    }, 5000);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="p-6">
      {!successInfo && (
        <button
          onClick={handlePayment}
          className="bg-yellow-400 px-4 py-2 rounded hover:bg-yellow-500 font-bold"
        >
          Tạo mã QR thanh toán
        </button>
      )}

      {qrCodeValue && !successInfo && (
        <div className="mt-6 p-4 bg-white rounded shadow w-fit flex flex-col items-center">
          <QRCode value={qrCodeValue} size={200} />
          <p className="mt-2 text-sm text-gray-500">Quét bằng ZaloPay</p>

          <p className="mt-4 text-sm font-bold text-blue-700">
            Trạng thái: {paymentStatus || "Chưa thanh toán"}
          </p>

          {paymentInfo && (
            <div className="mt-4 text-sm text-gray-700 text-left w-full">
              <p><strong>Mã giao dịch:</strong> {paymentInfo.app_trans_id}</p>
              <p><strong>Link thanh toán:</strong> <a href={paymentInfo.order_url} className="text-blue-600 underline" target="_blank">Mở trong Zalo</a></p>
              <p>
                <strong>Số tiền:</strong>{" "}
                {typeof paymentInfo.amount === "number"
                  ? paymentInfo.amount.toLocaleString("vi-VN")
                  : "N/A"}{" "}
                VND
              </p>
              <p><strong>Nội dung:</strong> {paymentInfo.description}</p>
              <p>
                <strong>Hết hạn:</strong>{" "}
                {paymentInfo.expire_at
                  ? new Date(paymentInfo.expire_at).toLocaleString("vi-VN")
                  : "Không rõ"}
              </p>
            </div>
          )}
        </div>
      )}

      {successInfo && (
        <div className="mt-6 p-6 bg-green-100 text-green-800 rounded shadow w-fit">
          <h2 className="text-xl font-bold mb-2">🎉 Thanh toán thành công!</h2>
          <p><strong>Mã giao dịch:</strong> {successInfo.app_trans_id}</p>
          <p><strong>Số tiền:</strong> {successInfo.amount.toLocaleString("vi-VN")} VND</p>
          <p><strong>Nội dung:</strong> {successInfo.description}</p>
          <p><strong>Thời điểm:</strong> {successInfo.success_time}</p>
        </div>
      )}
    </div>
  );
}
