"use client";
import { useEffect, useState } from "react";

export default function ViewPostTestPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user/forum/allpost")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Danh sách bài viết (Demo)</h1>
      {loading ? (
        <div>Đang tải...</div>
      ) : posts.length === 0 ? (
        <div>Chưa có bài viết nào.</div>
      ) : (
        <ul className="space-y-4">
          {posts.map((post, idx) => (
            <li key={post._id || idx} className="p-4 border rounded bg-white shadow">
              <div className="font-semibold text-lg">{post.title}</div>
              <div className="text-gray-600 text-sm mb-1">
                {post.mainCategory} - {post.subCategory} | {post.authorId?.toString?.() || "Ẩn danh"} | {post.createdAt ? new Date(post.createdAt).toLocaleString() : ""}
              </div>
              <div className="text-gray-800">{post.content?.slice(0, 100)}...</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
