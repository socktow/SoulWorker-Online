import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redis } from "@/lib/redis";
import { connectMongo } from "@/lib/mongodb";
import { User } from "@/models/user.model";
import SiteLayout from "./SiteLayout";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let user = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const userId = await redis.get(`token:${token}`);
      if (userId && userId === decoded.userId) {
        await connectMongo();
        const dbUser = await User.findById(decoded.userId).lean();
        if (dbUser) {
          user = {
            id: dbUser._id.toString(),
            username: dbUser.username,
            email: dbUser.email,
            sCoin: dbUser.sCoin,
            lastLogin: dbUser.lastLogin,
          };
        }
      }
    } catch (e) {
    }
  }
  return <SiteLayout user={user}>{children}</SiteLayout>;
}
