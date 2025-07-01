"use client";
import { FaQuestionCircle } from "react-icons/fa";

export default function InquiryPage() {
  // Dữ liệu mẫu
  const inquiries = [
    { id: 1, subject: "Không nhận được S-Coin", status: "Đã trả lời", date: "2025-07-01" },
    { id: 2, subject: "Lỗi đăng nhập", status: "Chưa trả lời", date: "2025-06-29" },
  ];

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg border mt-8 p-8">
      <h1 className="text-2xl font-bold mb-6 text-yellow-500 flex items-center gap-2">
        <FaQuestionCircle className="text-yellow-600" /> LỊCH SỬ HỎI ĐÁP
      </h1>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-yellow-100 text-gray-700">
            <th className="py-2 px-2">Chủ đề</th>
            <th className="py-2 px-2">Trạng thái</th>
            <th className="py-2 px-2">Ngày gửi</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((item) => (
            <tr key={item.id} className="border-b last:border-b-0">
              <td className="py-2 px-2">{item.subject}</td>
              <td className={`py-2 px-2 font-bold ${item.status === "Đã trả lời" ? "text-green-600" : "text-red-500"}`}>
                {item.status}
              </td>
              <td className="py-2 px-2">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-xs text-gray-500">
        * Nếu có thắc mắc mới, vui lòng gửi yêu cầu tại mục "Send New Inquiry".
      </div>
    </div>
  );
}