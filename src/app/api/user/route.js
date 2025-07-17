import { getUserFromToken } from "@/lib/auth/server/user.server";

export async function GET() {
  const user = await getUserFromToken();
  if (!user || (user.role !== "user" && user.role !== "admin")) {
    return Response.json({ message: "❌ User access only" }, { status: 401 });
  }

  return Response.json({
    message: "✅ You are user, access granted to user API"
  });
}
