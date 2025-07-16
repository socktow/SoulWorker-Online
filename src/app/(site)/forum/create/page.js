"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { FaPaperclip , FaTag, FaListUl } from "react-icons/fa";
import 'react-quill-new/dist/quill.snow.css';

const categories = {
  discussion: ["Off-Topic", "Game", "Crew"],
  "game-tips": ["Character", "Dungeon", "ETC"],
  qa: ["ETC", "Character", "Content"],
  "art-media": ["FanArt", "FanMovie", "Event", "Fan Fiction", "ScreenShoot"],
};

const categoryNames = {
  discussion: "General Discussion",
  "game-tips": "Game Tips",
  qa: "Q & A",
  "art-media": "Art & Media",
};

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function CreatePostPage() {
  const [mainCategory, setMainCategory] = useState("discussion");
  const [subCategory, setSubCategory] = useState(categories["discussion"][0]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");


  const handleMainCategoryChange = (e) => {
    const selected = e.target.value;
    setMainCategory(selected);
    setSubCategory(categories[selected][0]);
    setFile(null);
    setPreviewUrl("");
  };

  const handleAttachFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center py-8 px-2">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 md:p-14 border border-gray-100">
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Create New Post</h1>
        </div>

        <div className="bg-white rounded-lg p-6 mb-4 space-y-5">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col flex-1">
              <label className="font-semibold mb-2 flex items-center gap-2 text-gray-700">
                <FaTag className="text-blue-500" /> Main Category
              </label>
              <select
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-200"
                value={mainCategory}
                onChange={handleMainCategoryChange}
              >
                {Object.keys(categories).map((key) => (
                  <option key={key} value={key}>
                    {categoryNames[key]}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col flex-1">
              <label className="font-semibold mb-2 text-gray-700 flex items-center gap-2">
                <FaListUl className="text-blue-500" /> Sub Category
              </label>
              <select
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-200"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              >
                {categories[mainCategory].map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold mb-2 block text-gray-700">Title</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 text-lg"
              maxLength={300}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your post title (max 300 characters)"
            />
            <div className="text-right text-sm text-gray-500">{title.length}/300</div>
          </div>

          {(mainCategory === "art-media" || mainCategory === "qa") && (
            <div>
              <label className="font-medium flex items-center gap-2 text-gray-700">
                <FaPaperclip className="text-indigo-500" /> Attach Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleAttachFile}
                className="mt-1 p-2 border rounded w-full"
              />
              {file && <p className="text-sm text-green-600 mt-1">Selected: {file.name}</p>}
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="mt-3 rounded border max-h-60 object-contain"
                />
              )}
            </div>
          )}

          <div>
            <label className="font-semibold mb-2 block text-gray-700">Content</label>
            <div className="border border-gray-300  overflow-hidden">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                placeholder="Write your content here..."
                className="h-4"
                style={{ minHeight: 180 }}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition">Cancel</button>
            <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold shadow-md transition">Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}