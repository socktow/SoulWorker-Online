"use client";
import { useState } from "react";
import { BsCoin } from "react-icons/bs";

export default function CoinCharge() {
  // Dữ liệu mẫu, bạn có thể lấy từ API thực tế
  const [balance, setBalance] = useState(1000);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("bank");
  const [message, setMessage] = useState("");

  const handleCharge = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setMessage("Please enter a valid amount.");
      return;
    }
    setBalance(balance + Number(amount));
    setMessage("Nạp tiền thành công!");
    setAmount("");
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg border mt-8 p-8">
      <h1 className="text-2xl font-bold mb-6 text-yellow-500">NẠP S-COIN</h1>
      <div className="mb-6 flex items-center justify-between bg-gray-50 rounded-lg p-4">
        <span className="font-semibold text-gray-700 flex items-center gap-2">
          Số dư hiện tại:
          <BsCoin className="text-yellow-400" />
        </span>
        <span className="text-xl font-bold text-gray-900 flex items-center gap-1">
          {balance} <span className="text-yellow-400"><BsCoin /></span>
        </span>
      </div>
      <form onSubmit={handleCharge} className="space-y-5">
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Số tiền muốn nạp</label>
          <input
            type="number"
            min="1"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Nhập số S-Coin muốn nạp"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Phương thức thanh toán</label>
          <select
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={method}
            onChange={e => setMethod(e.target.value)}
          >
            <option value="bank">Chuyển khoản ngân hàng</option>
            <option value="momo">Ví MoMo</option>
            <option value="card">Thẻ cào điện thoại</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg text-lg transition"
        >
          Xác nhận nạp tiền
        </button>
        {message && (
          <div className="mt-2 text-center font-semibold text-green-600">{message}</div>
        )}
      </form>
      <div className="mt-8 text-xs text-gray-500">
        * Sau khi nạp, S-Coin sẽ được cộng vào tài khoản của bạn. Nếu có vấn đề, vui lòng liên hệ hỗ trợ.
      </div>
    </div>
  );
} 