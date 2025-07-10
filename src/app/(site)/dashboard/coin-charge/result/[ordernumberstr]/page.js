"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import QRCode from "react-qr-code";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function CoinChargeResultPage() {
  const { ordernumberstr } = useParams();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPaymentInfo();
  }, []);

  const fetchPaymentInfo = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/payment/zalo/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ordernumberstr }),
      });

      const data = await res.json();
      setPaymentInfo(data);

      try {
        const raw = data.zalo_response?.item?.[0];
        if (raw) {
          const parsed = JSON.parse(raw);
          setItems(parsed || []);
        }
      } catch (err) {
        console.error("Lỗi khi phân tích item:", err);
      }
    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!paymentInfo) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg text-center space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Quét mã QR bằng ứng dụng ZaloPay để thanh toán
        </h2>
        <p className="text-gray-600">Mã giao dịch: {ordernumberstr}</p>
        <div className="flex justify-center">
          <QRCode value={ordernumberstr} size={200} />
        </div>
        <button
          onClick={fetchPaymentInfo}
          disabled={loading}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-6 py-2 rounded hover:opacity-90 disabled:opacity-50 transition"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="animate-spin w-4 h-4 mr-2" /> Đang kiểm tra...
            </span>
          ) : (
            "Kiểm tra kết quả giao dịch"
          )}
        </button>
      </div>
    );
  }

  const zalo = paymentInfo.zalo_response || {};
  const amount = zalo.amount || 0;
  const discount = zalo.discount_amount || 0;
  const totalPaid = amount - discount;

  const createdAt = paymentInfo.createdAt
    ? new Date(paymentInfo.createdAt).toLocaleString("vi-VN")
    : "Không rõ";

  // Giao dịch FAILED hoặc PENDING
  if (paymentInfo.status === "failed" || paymentInfo.status === "pending") {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg space-y-6 border border-red-300 text-center">
        <div className="text-red-500 text-6xl flex justify-center">❌</div>
        <h1 className="text-2xl font-bold text-red-600">
          THANH TOÁN {paymentInfo.status === "failed" ? "THẤT BẠI" : "CHƯA HOÀN THÀNH"}
        </h1>

        <p className="text-gray-700 font-medium">
          Nhân vật: <span className="font-bold">{paymentInfo.username}</span>
        </p>

        <div className="bg-gray-100 rounded p-4 text-left space-y-2 text-sm">
          <p><strong>Mã giao dịch:</strong> {paymentInfo.app_trans_id}</p>
          <p><strong>Phương thức thanh toán:</strong> {paymentInfo.method}</p>
          <p><strong>Thời gian giao dịch:</strong> {createdAt}</p>
          <p className="text-red-600">
            <strong>Nguyên nhân:</strong>{" "}
            {paymentInfo.status === "failed"
              ? "Hệ thống đang có lỗi, giao dịch thất bại!"
              : "Bạn cần hoàn thành thanh toán của mình trước. Nếu thanh toán không thành công, liên hệ với fanpage hoặc đường dây nóng để được hỗ trợ."}
          </p>
        </div>

        <button
          onClick={fetchPaymentInfo}
          className="mt-4 px-6 py-2 rounded text-white font-semibold bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90"
        >
          Thanh toán lại
        </button>

        <p className="text-sm text-gray-500 mt-3">
          Cần hỗ trợ? Hãy liên hệ{" "}
          <a href="https://www.facebook.com/" target="_blank" className="text-blue-600 underline">
            Fanpage
          </a>{" "}
          hoặc gọi hotline chăm sóc khách hàng.
        </p>
      </div>
    );
  }

  // Giao dịch thành công
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-blue-700">Kết quả giao dịch</h1>
        <p className="text-gray-600">Thông tin chi tiết đơn hàng và trạng thái thanh toán.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-5 border space-y-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">🧾 Thông tin giao dịch</h2>
          <p><strong>Mã đơn hàng:</strong> {paymentInfo.app_trans_id}</p>
          <p><strong>Mã giao dịch ZaloPay:</strong> {zalo.zp_trans_id || "Chưa có"}</p>
          <p><strong>Người dùng:</strong> {paymentInfo.username}</p>
          <p><strong>Phương thức:</strong> {paymentInfo.method}</p>
          <p><strong>Trạng thái:</strong> ✅ Giao dịch thành công</p>
          <p><strong>Ghi chú:</strong> {paymentInfo.description}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-5 border space-y-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">💵 Chi tiết thanh toán</h2>
          <p><strong>Tổng giá trị:</strong> {amount.toLocaleString("vi-VN")} VND</p>
          <p><strong>Giảm giá:</strong> {discount.toLocaleString("vi-VN")} VND</p>
          <p className="text-green-600 font-bold">
            Thanh toán thực tế: {totalPaid.toLocaleString("vi-VN")} VND
          </p>
        </div>
      </div>

      {items.length > 0 && (
        <div className="bg-white rounded-lg shadow p-5 border">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">🎁 Danh sách vật phẩm</h2>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {items.map((item, index) => (
              <li key={index}>
                {item.itemname} — {item.itemquantity} x{" "}
                {item.itemprice.toLocaleString("vi-VN")} VND
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-center mt-4">
        <div className="flex items-center bg-green-100 text-green-700 px-4 py-3 rounded shadow">
          <CheckCircle className="w-5 h-5 mr-2" />
          Giao dịch đã được xác nhận thành công!
        </div>
      </div>
    </div>
  );
}
