import "../globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

export default function SiteLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
