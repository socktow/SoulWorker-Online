import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redis } from "@/lib/redis";
import { connectMongo } from "@/lib/mongodb";
import { User } from "@/models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function getUserFromToken() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("token");
  const token = tokenCookie?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = await redis.get(`token:${token}`);
    if (!userId || userId !== decoded.userId) return null;

    await connectMongo();
    const dbUser = await User.findById(decoded.userId).lean();
    if (!dbUser) return null;

    return {
      id: dbUser._id.toString(),
      username: dbUser.username,
      email: dbUser.email,
      swcoin: dbUser.swcoin,
      lastLogin: dbUser.lastLogin,
    };
  } catch (err) {
    return null;
  }
}
