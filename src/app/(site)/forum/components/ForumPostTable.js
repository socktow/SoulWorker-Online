"use client";
import Link from "next/link";

export default function ForumPostTable({ posts, category }) {
  if (!posts.length) return <div className="text-center text-gray-500">Chưa có bài viết nào.</div>;

  return (
    <ul className="divide-y divide-gray-200">
      {posts.map((post) => (
        <li
          key={post._id}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 py-5 px-2 sm:px-4 hover:bg-yellow-50 transition group"
        >
          {/* Category & Subcategory */}
          <div className="flex flex-col min-w-[120px]">
            <span className="inline-flex items-center gap-1 bg-yellow-400 text-black font-bold px-2 py-1 rounded text-xs mb-1">
              <i className="fas fa-folder-open text-yellow-700 text-xs" />
              {post.mainCategory?.replace("-", " ") || "Unknown"}
            </span>
            {post.subCategory && (
              <span className="bg-green-100 text-green-700 font-semibold px-2 py-1 rounded text-xs">
                {post.subCategory}
              </span>
            )}
          </div>

          {/* Title & meta */}
          <div className="flex-1 min-w-0">
            <Link
              href={`/forum/${category || post.mainCategory}/${post._id}`}
              className="block font-bold text-base sm:text-lg text-gray-900 group-hover:text-green-700 transition hover:underline mb-1 truncate"
            >
              {post.title}
            </Link>
            <div className="flex flex-wrap gap-3 items-center text-xs text-gray-500">
              <span className="inline-flex items-center gap-1">
                <i className="fas fa-user-circle text-green-600" />
                {post.authorId?.toString?.().slice(-5)}
              </span>
              <span className="inline-flex items-center gap-1">
                <i className="fas fa-calendar-alt text-yellow-600" />
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 items-center mt-2 sm:mt-0">
            <span className="inline-flex items-center gap-1 text-red-500 font-semibold">
              <i className="fas fa-heart" /> {post.likes?.length || 0}
            </span>
            <span className="inline-flex items-center gap-1 text-blue-500 font-semibold">
              <i className="fas fa-comments" /> {post.commentCount || 0}
            </span>
            <span className="inline-flex items-center gap-1 text-gray-500 font-semibold">
              <i className="fas fa-eye" /> 0
            </span>
            <span className="inline-flex items-center gap-1 text-yellow-600 font-semibold">
              <i className="fas fa-clock" /> {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Xem chi tiết */}
          <Link
            href={`/forum/${category || post.mainCategory}/${post._id}`}
            className="ml-auto bg-green-500 text-white rounded-full p-2 shadow hover:bg-green-700 transition flex items-center justify-center"
            title="Xem chi tiết"
          >
            <i className="fas fa-arrow-right" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
