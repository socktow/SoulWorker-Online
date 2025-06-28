export default function DashboardHome() {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Tiêu đề & giới thiệu */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">🎉 Chào mừng đến với Bảng điều khiển</h1>
          <p className="text-gray-300 text-lg">
            Bạn đã đăng nhập thành công. Hãy chọn một chức năng từ thanh điều hướng để bắt đầu quản lý hệ thống.
          </p>
        </div>
      </div>
    </div>
  );
}
