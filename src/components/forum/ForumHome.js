import React from "react";
import Link from "next/link";

const categories = [
  { name: "General Discussion", href: "/forum/discussion" },
  { name: "Game Tips", href: "/forum/game-tips" },
  { name: "Q & A", href: "/forum/qa" },
  { name: "Art & Media", href: "/forum/art-media" },
];

export function ForumCategories() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 bg-white rounded-lg shadow">
      <div className="flex flex-wrap gap-4">
        {categories.map((cat) => (
          <Link key={cat.name} href={cat.href}>
            <div className="category-item btn-corner px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center cursor-pointer transition">
              <span className="mr-2 font-semibold text-gray-800">{cat.name}</span>
              <i className="far fa-chevron-right text-gray-500" />
            </div>
          </Link>
        ))}
      </div>
      <div className="flex items-end mt-4 md:mt-0">
        <div className="forum-policy mr-6 cursor-pointer text-blue-600 hover:underline">Forum Policy</div>
        <a target="_blank" rel="noopener noreferrer" href="https://store.steampowered.com/app/215830/Closers/">
          <div className="icon-link flex items-end mr-6 cursor-pointer">
            <img src="/static/img/steam.png" alt="Steam" className="h-8 w-8" />
          </div>
        </a>
        <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/w7hShma">
          <div className="icon-link flex items-end cursor-pointer">
            <img src="/static/img/discord.png" alt="Discord" className="h-8 w-8" />
          </div>
        </a>
      </div>
    </div>
  );
}

export default function ForumHome() {
  return (
    <div>
      <div className="relative w-full h-40 md:h-48 flex items-center justify-center mb-6">
        <img
          src="/static/img/forum/forum-banner.png"
          alt="Forum Banner"
          className="object-cover w-full h-full rounded-lg shadow"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">Forum</h1>
        </div>
      </div>
      <ForumCategories />
    </div>
  );
} 