"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import QRCode from "react-qr-code";

export default function ZaloPayResult() {
  const { ordernumberstr } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ordernumberstr) fetchResult();
  }, [ordernumberstr]);

  const fetchResult = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/payment/zalo/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ordernumberstr }),
      });
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Lỗi khi lấy kết quả giao dịch:", err);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý dữ liệu item
  let item = null;
  try {
    const raw = data?.zalo_response?.item;
    if (raw) {
      const arr = JSON.parse(raw);
      item = arr?.[0]?.[0] || null;
    }
  } catch {
    item = null;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <Loader2 className="w-6 h-6 animate-spin mr-2 text-gray-500" />
        <span>Đang tải thông tin giao dịch...</span>
      </div>
    );
  }

  if (!data || !data.status) {
    return ;
  }
  
  if (data.status === "pending") {
    return (
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow text-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-500 mx-auto" />
        <h1 className="text-xl font-bold text-yellow-600">ĐANG CHỜ THANH TOÁN</h1>
        <p className="text-gray-700 text-sm">
          Hệ thống đang chờ phản hồi từ ZaloPay. Vui lòng hoàn tất thanh toán trong ứng dụng Zalo hoặc kiểm tra lại sau vài giây.
        </p>
        <div className="flex justify-center">
        <QRCode value={ordernumberstr} size={200} />
      </div>
        <a
          href={`/dashboard/coin-charge/result/${ordernumberstr}`}
          className="inline-block mt-4 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded transition"
        >
          Kiểm tra lại trạng thái
        </a>
      </div>
    );
  }

  const isSuccess = data.status === "success";
  const icon = isSuccess ? <CheckCircle className="w-8 h-8 text-green-600" /> : <XCircle className="w-8 h-8 text-red-600" />;
  const statusText = isSuccess ? "THANH TOÁN THÀNH CÔNG" : "THANH TOÁN THẤT BẠI";
  const reasonText = isSuccess
    ? "Cảm ơn bạn đã thanh toán. Giao dịch đã hoàn tất!"
    : "Hệ thống đang có lỗi, giao dịch thất bại!";

  // Thông tin giao dịch
  const username = data.username || "-";
  const appTransId = data.app_trans_id || "-";
  const method = data.method === "QR" ? "Ngân hàng" : data.method;
  const time = data.zalo_response?.app_time
    ? new Date(data.zalo_response.app_time).toLocaleString("vi-VN")
    : "-";
  const amount = data.amount || 0;
  const quantity = item?.itemquantity || 1;
  const packName = item?.itemname || "-";
  const bonus = item?.bonus || item?.coins || 0;

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow text-center space-y-4">
      {icon}
      <h1 className={`text-2xl font-bold ${isSuccess ? "text-green-600" : "text-red-600"}`}>{statusText}</h1>

      <div className="flex justify-between text-sm text-gray-700 mb-2">
        <div className="text-left">
          <div className="font-semibold">ID nhận vật:</div>
          <div>{username}</div>
        </div>
        <div className="text-right">
          <div className="font-semibold">Nhân vật:</div>
          <div>{username}</div>
        </div>
      </div>

      <div className="border rounded p-4 text-left text-sm bg-gray-50">
        <div className="flex items-center gap-4 mb-3">
          <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="coin" className="w-14 h-14" />
          <div>
            <div className="font-bold text-base text-yellow-700">{bonus} {item?.bonus ? `+ ${item.bonus} Bonus` : ""}</div>
            <div className="text-gray-700">{packName}</div>
          </div>
        </div>
        <p><strong>Tên gói nạp:</strong> {packName}</p>
        <p><strong>Số lượng:</strong> x{quantity}</p>
        <p><strong>Mã giao dịch:</strong> {appTransId}</p>
        <p><strong>Phương thức thanh toán:</strong> {method}</p>
        <p><strong>Thời gian giao dịch:</strong> {time}</p>
        <div className="mt-2">
          <div className="font-semibold">Nguyên nhân</div>
          <div className="bg-gray-200 rounded p-2 text-red-700 text-xs mt-1">{reasonText}</div>
        </div>
      </div>

      <a
        href="/dashboard/coin-charge"
        className="inline-block mt-4 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded transition"
      >
        Thanh toán lại
      </a>

      <div className="text-xs text-gray-500 mt-2">
        Bạn cần hỗ trợ về thanh toán? Hãy liên hệ bộ phận chăm sóc khách hàng <a href="#" className="underline text-orange-600">tại đây</a>.
      </div>
    </div>
  );
}
