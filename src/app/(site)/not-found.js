'use client';
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();

  // Logic kiểm tra nếu cần
  const isSiteRoute = pathname && !pathname.startsWith('/admin');
  
  // Nếu không phải site route, có thể redirect hoặc xử lý khác
  if (!isSiteRoute) {
    return null; // Hoặc redirect về trang chủ
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-500 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-4">Page Not Found</h2>
      <p className="mb-6">This page does not exist in the site section.</p>
      <a href="/" className="px-4 py-2 bg-white text-red-500 rounded">
        Go Home
      </a>
    </div>
  );
}
