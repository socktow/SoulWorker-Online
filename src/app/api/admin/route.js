import { getUserFromToken } from "@/lib/auth/server/user.server";

export async function GET() {
  const user = await getUserFromToken();

  if (!user || user.role !== "admin") {
    return Response.json({ message: "❌ Admin access only" }, { status: 401 });
  }

  return Response.json({
    message: "✅ You are admin, access granted to admin API"
  });
}
