import { ForumCategories } from "@/components/forum/ForumHome";

export default function qa() {
  return (
    <div>
      <div className="relative w-full h-40 md:h-48 flex items-center justify-center mb-6">
        <img
          src="/static/img/forum/forum-banner.png"
          alt="Forum Banner"
          className="object-cover w-full h-full rounded-lg shadow"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">qa</h1>
        </div>
      </div>
      <ForumCategories />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">qa Topics</h2>
      </div>
    </div>
  );
} 