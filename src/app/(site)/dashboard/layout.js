"use client";

import DashboardTabs from "@/components/dashboard/DashboardTabs";
import { useUser } from "@/app/UserProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }) {
  const user = useUser();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!user) {
      const timeout = setTimeout(() => {
        router.push("/signin");
      }, 3000);

      setRedirecting(true);
      return () => clearTimeout(timeout);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="text-center py-10 text-red-600 font-semibold">
        You must be logged in to access this page.
        {redirecting && (
          <div className="text-sm text-gray-500 mt-2">
            Redirecting to Sign In...
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full h-40 md:h-48 flex items-center justify-center mb-6">
        <img
          src="/static/img/forum/forum-banner.png"
          alt="Forum Banner"
          className="object-cover w-full h-full rounded-lg shadow"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            Mypage
          </h1>
        </div>
      </div>
      <DashboardTabs />
      <div className="flex justify-center items-start w-full px-2">
        <main className="w-full max-w-7xl mx-auto my-4 min-h-[700px] ">
          {children}
        </main>
      </div>
    </>
  );
}
