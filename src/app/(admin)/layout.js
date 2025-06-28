import "./globals.css";
import Navbar from "../(admin)/admin/components/Navbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Navbar />
      <main className="flex-1 overflow-auto bg-gray-50">
        {children}
      </main>
    </div>
  );
}
