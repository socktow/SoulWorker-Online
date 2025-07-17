"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/auth/server/user";

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      const user = await getUser();
      if (user) {
        router.replace("/dashboard/main");
      } else {
        router.replace("/signin");
      }
    }

    checkUser();
  }, [router]);

  return null;
}
