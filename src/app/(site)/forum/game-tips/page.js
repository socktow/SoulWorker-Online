import { ForumCategories } from "@/components/forum/ForumHome";

export default function gametips() {
  return (
    <div>
      <div className="relative w-full h-40 md:h-48 flex items-center justify-center mb-6">
        <img
          src="/static/img/forum/forum-banner.png"
          alt="Forum Banner"
          className="object-cover w-full h-full rounded-lg shadow"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">gametips</h1>
        </div>
      </div>
      <ForumCategories />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">gametips Topics</h2>
      </div>
    </div>
  );
} 