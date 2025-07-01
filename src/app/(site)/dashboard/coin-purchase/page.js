"use client";
import { BsCoin } from "react-icons/bs";

export default function CoinPurchasePage() {
  // Dữ liệu mẫu
  const history = [
    { id: 1, date: "2025-07-01", amount: 500, type: "Nạp", status: "Thành công" },
    { id: 2, date: "2025-06-28", amount: -200, type: "Tiêu", status: "Đã sử dụng" },
  ];

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg border mt-8 p-8">
      <h1 className="text-2xl font-bold mb-6 text-yellow-500 flex items-center gap-2">
        <BsCoin className="text-yellow-400" /> LỊCH SỬ N-COIN
      </h1>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-yellow-100 text-gray-700">
            <th className="py-2 px-2">Ngày</th>
            <th className="py-2 px-2">Loại</th>
            <th className="py-2 px-2">Số lượng</th>
            <th className="py-2 px-2">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item.id} className="border-b last:border-b-0">
              <td className="py-2 px-2">{item.date}</td>
              <td className="py-2 px-2">{item.type}</td>
              <td className={`py-2 px-2 font-bold ${item.amount > 0 ? "text-green-600" : "text-red-500"}`}>
                {item.amount > 0 ? "+" : ""}{item.amount}
              </td>
              <td className="py-2 px-2">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-xs text-gray-500">
        * Chỉ hiển thị các giao dịch trong 30 ngày gần nhất.
      </div>
    </div>
  );
} 