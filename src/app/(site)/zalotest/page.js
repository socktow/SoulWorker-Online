"use client";
import { useState, useEffect, useRef } from "react";
import QRCode from "react-qr-code";

const paymentMethods = [
  { value: "QR", label: "ZaloPay QR" },
  { value: "ATM", label: "ATM" },
  { value: "Credit", label: "Thẻ tín dụng" },
];

const rechargePacks = [
  { amount: 10000, coin: 1000 },
  { amount: 20000, coin: 2500 },
  { amount: 50000, coin: 7000 },
  { amount: 100000, coin: 15000 },
];

export default function ZaloQRCodeDisplay() {
  const [method, setMethod] = useState("QR");
  const [selectedPack, setSelectedPack] = useState(rechargePacks[0]);

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
      body: JSON.stringify({
        amount: selectedPack.amount,
        method,
        item: {
          itemid: `coin-${selectedPack.amount}`,
          itemname: `Gói coin ${selectedPack.coin}`,
          itemprice: selectedPack.amount,
          itemquantity: 1,
        },
      }),
    });

    const data = await res.json();

    if (data.qr_code) {
      setQrCodeValue(data.qr_code);
      setAppTransId(data.app_trans_id);
      setPaymentInfo(data);
      startAutoCheck(data.app_trans_id, data);
    } else {
      setPaymentStatus("❌ Tạo đơn hàng thất bại");
    }
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
    <div className="p-6 max-w-xl mx-auto">
      {!successInfo && (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block font-bold mb-1">Chọn phương thức thanh toán:</label>
            <div className="flex gap-4">
              {paymentMethods.map((m) => (
                <label key={m.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="method"
                    value={m.value}
                    checked={method === m.value}
                    onChange={(e) => setMethod(e.target.value)}
                  />
                  {m.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1">Chọn gói nạp:</label>
            <div className="flex gap-4 flex-wrap">
              {rechargePacks.map((pack) => (
                <button
                  key={pack.amount}
                  onClick={() => setSelectedPack(pack)}
                  className={`px-4 py-2 rounded border ${
                    selectedPack.amount === pack.amount
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {pack.amount.toLocaleString("vi-VN")}đ → {pack.coin} coin
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="bg-yellow-500 text-white px-4 py-2 rounded font-bold hover:bg-yellow-600"
          >
            Tạo mã QR thanh toán
          </button>
        </div>
      )}

      {qrCodeValue && !successInfo && (
        <div className="p-4 bg-white rounded shadow w-fit flex flex-col items-center">
          <QRCode value={qrCodeValue} size={200} />
          <p className="mt-2 text-sm text-gray-500">Quét bằng ZaloPay</p>

          <p className="mt-4 text-sm font-bold text-blue-700">
            Trạng thái: {paymentStatus || "Chưa thanh toán"}
          </p>

          {paymentInfo && (
            <div className="mt-4 text-sm text-gray-700 text-left w-full">
              <p><strong>Mã giao dịch:</strong> {paymentInfo.app_trans_id}</p>
              <p><strong>Link thanh toán:</strong> <a href={paymentInfo.order_url} className="text-blue-600 underline" target="_blank">Mở trong Zalo</a></p>
              <p><strong>Số tiền:</strong> {paymentInfo.amount.toLocaleString("vi-VN")} VND</p>
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
