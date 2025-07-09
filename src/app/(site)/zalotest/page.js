// app/Zalotest/ZaloQRCodeDisplay.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [method, setMethod] = useState("QR");
  const [selectedPack, setSelectedPack] = useState(rechargePacks[0]);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
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
    const transactionId = data.ordernumberstr || data.app_trans_id;

    if (transactionId) {
      router.push(`/dashboard/coin-charge/result/${transactionId}`);
    } else {
      alert("❌ Tạo đơn hàng thất bại!");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="space-y-4 mb-6">
        <div>
          <label className="block font-bold mb-1">
            Chọn phương thức thanh toán:
          </label>
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
          disabled={loading}
          className="bg-yellow-500 text-white px-4 py-2 rounded font-bold hover:bg-yellow-600 disabled:opacity-50"
        >
          {loading ? "Đang tạo đơn hàng..." : "Tạo mã QR thanh toán"}
        </button>
      </div>
    </div>
  );
}
