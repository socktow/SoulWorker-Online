'use client';
import { useEffect, useState } from 'react';

export default function ForumPage() {
  const [posts, setPosts] = useState([]);
  const [isCache, setIsCache] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/public/forum/allpost')
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts || []);
        setIsCache(data.cache || false);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4">Loading forum posts...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Forum Latest Posts</h1>
      {isCache && <p className="text-green-500 mb-4">⚡ Loaded from Redis Cache</p>}
      <ul className="space-y-4">
        {posts.map(post => (
          <li key={post._id} className="p-4 border rounded-lg hover:bg-gray-100 transition">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600 text-sm">Category: {post.mainCategory} / {post.subCategory}</p>
            <p className="mt-2 text-gray-800 line-clamp-3">{post.content.substring(0, 100)}...</p>
            <a href={`/forum/${post._id}`} className="text-blue-600 font-medium mt-2 inline-block">Read More →</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
