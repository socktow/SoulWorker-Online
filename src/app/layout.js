import { Geist, Geist_Mono } from "next/font/google";
import "./test.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SoulWorker VietNam Online",
  description: "SoulWorker VietNam",
  icons: {
    icon: '/static/favicon.ico',
  },
};

import { getUserFromToken } from "@/lib/auth/server/user.server";
import { UserProvider } from "./UserProvider";

export default async function RootLayout({ children }) {
  const user = await getUserFromToken();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider user={user}>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
