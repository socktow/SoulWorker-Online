import { connectMongo } from "@/lib/mongodb";
import Forum from "@/models/forum.model";
import mongoose from "mongoose";

export async function GET(request) {
  const slug = request.nextUrl.pathname.split("/").pop();
  await connectMongo();

  // Nếu slug là ObjectId
  if (!mongoose.Types.ObjectId.isValid(slug)) {
    return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });
  }

  const post = await Forum.findById(slug).lean();

  if (!post) {
    return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
  }

  return new Response(JSON.stringify({ post }), { status: 200 });
}
