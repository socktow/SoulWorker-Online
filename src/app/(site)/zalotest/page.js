"use client";
import { useState } from "react";
import QRCode from "react-qr-code";

export default function ZaloQRCodeDisplay() {
  const [qrCodeValue, setQrCodeValue] = useState("");

  const handlePayment = async () => {
    const res = await fetch("/api/payment/zalo/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 50000 }),
    });

    const data = await res.json();
    setQrCodeValue(data.qr_code); // ← Gán chuỗi QR code vào component
  };

  return (
    <div className="p-6">
      <button
        onClick={handlePayment}
        className="bg-yellow-400 px-4 py-2 rounded hover:bg-yellow-500 font-bold"
      >
        Create Payment QR
      </button>

      {qrCodeValue && (
        <div className="mt-6 p-4 bg-white rounded shadow w-fit">
          <QRCode value={qrCodeValue} size={200} />
          <p className="mt-2 text-sm text-gray-500 text-center">Scan with ZaloPay</p>
        </div>
      )}
    </div>
  );
}
