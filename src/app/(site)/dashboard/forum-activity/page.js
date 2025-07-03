"use client";
import { FaRegUserCircle } from "react-icons/fa";
import Image from "next/image";
import { useUser } from "../context/UserContext";

export default function ForumActivityPage() {
  const user = useUser();

  if (!user) return null;

  const stats = [
    { label: "Created Topics", value: 0, color: "bg-gray-100" },
    { label: "Left Comments", value: 0, color: "bg-gray-200" },
    { label: "Received Likes", value: 0, color: "bg-gray-300" },
    { label: "Bookmarked Topics", value: 0, color: "bg-gray-800 text-white" },
  ];

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg border mt-8 p-8">
      <h1 className="text-2xl font-bold mb-6 text-yellow-500 flex items-center gap-2">
        <FaRegUserCircle className="text-yellow-600" /> HOẠT ĐỘNG DIỄN ĐÀN
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex flex-col items-center w-full md:w-1/4">
          <Image
            src="/static/img/test/avatar.gif"
            alt="avatar"
            width={96}
            height={96}
            className="rounded-full border-2 border-gray-200 object-cover"
          />
          <span className="font-bold mt-2"> {user.username} </span>
          <span className="text-xs text-gray-500">
            Forum Sanction : <span className="text-blue-600">None</span>
          </span>
        </div>
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
          {stats.map((item) => (
            <div key={item.label} className={`${item.color} rounded p-3 flex flex-col items-center`}>
              <span className="font-bold text-lg">{item.value}</span>
              <span className="text-xs text-center">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
