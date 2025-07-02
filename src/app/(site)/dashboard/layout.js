// layout client component
"use client";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";
import { UserContext } from "./context/UserContext";
import DashboardTabs from "@/components/dashboard/DashboardTabs";

export default function SiteLayout({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = getUser();
    setUser(userData);
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <UserContext.Provider value={user}>
      <div className="relative w-full h-40 md:h-48 flex items-center justify-center mb-6">
        <img
          src="/static/img/forum/forum-banner.png"
          alt="Forum Banner"
          className="object-cover w-full h-full rounded-lg shadow"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">Mypage</h1>
        </div>
      </div>
      <DashboardTabs />
      <div className="flex justify-center items-center w-full px-2">
        <main className="w-full max-w-7xl mx-auto my-4">{children}</main>
      </div>
    </UserContext.Provider>
  );
}
