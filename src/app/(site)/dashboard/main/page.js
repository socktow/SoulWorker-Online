"use client";
import {
  FaRegEdit,
  FaUserCircle,
  FaEnvelope,
  FaLock,
  FaQuestionCircle,
} from "react-icons/fa";
import { useUser } from "../context/UserContext";
import { BsCoin } from "react-icons/bs";
import { useRouter } from "next/navigation";

export default function DashboardMainPage() {
  const router = useRouter();
  const user = useUser();

  if (!user) return null;

  const Card = ({ title, icon, children }) => (
    <div className="col-span-1 bg-white rounded-2xl shadow-md border border-yellow-300 flex flex-col transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
      <div className="flex items-center gap-3 bg-yellow-400 rounded-t-2xl px-6 py-4">
        {icon && <div className="text-2xl text-yellow-700">{icon}</div>}
        <span className="font-bold text-lg text-gray-900">{title}</span>
      </div>
      <div className="flex-1 flex flex-col gap-3 px-6 py-5">{children}</div>
    </div>
  );

  const InfoRow = ({ label, value }) => (
    <div className="flex justify-between items-center">
      <span>{label}</span>
      <span className="font-bold text-gray-800">{value}</span>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
      {/* Basic Info */}
      <Card title="BASIC INFORMATION" icon={<FaUserCircle />}>
        <InfoRow label="SW Name" value={user.username} />
        <InfoRow
          label="Last Logout"
          value={new Date(user.lastLogin).toLocaleString()}
        />
        <div className="flex justify-between items-center">
          <span>S-Coin Balance</span>
          <span className="flex items-center gap-1 font-bold text-gray-800">
            <BsCoin className="text-yellow-400" /> {user.sCoin}
          </span>
        </div>
      </Card>

      {/* Account Info */}
      <Card title="ACCOUNT INFORMATION" icon={<FaEnvelope />}>
        <InfoRow label="Email" value={user.email} />
        <div className="flex justify-between items-center">
          <span>Password</span>
          <button
            onClick={() => router.push("/dashboard/change-password")}
            className="ml-2 bg-red-400 hover:bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow transition"
          >
            <FaLock className="inline mr-1" /> CHANGE
          </button>
        </div>
        <div className="flex justify-between items-center">
          <span>Security Q and A</span>
          <span className="font-bold">None</span>
          <button className="ml-2 bg-yellow-300 hover:bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow">
            <FaRegEdit /> EDIT
          </button>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            checked
            readOnly
            className="accent-yellow-400"
          />
          <span className="text-xs">Agree on receiving promotional email!</span>
        </div>
      </Card>

      {/* S-Coin */}
      <Card title="S-COIN" icon={<BsCoin />}>
        <div className="flex items-center gap-2 text-lg">
          <span>Total S-Coin</span>
          <BsCoin className="text-yellow-400" />
          <span className="font-bold">{user.sCoin}</span>
        </div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => router.push("/dashboard/coin-purchase")}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 rounded-full shadow-md w-full"
          >
            S-COIN HISTORY
          </button>
          <button
            onClick={() => router.push("/dashboard/coin-charge")}
            className="bg-red-400 hover:bg-red-500 text-white font-bold px-4 py-2 rounded-full shadow-md w-full"
          >
            CHARGE
          </button>
        </div>
      </Card>

      {/* Inquiry */}
      <Card title="MY INQUIRY" icon={<FaQuestionCircle />}>
        <InfoRow label="Total Inquiry" value="0" />
        <InfoRow label="Answered" value="0" />
        <InfoRow
          label="Not Answered"
          value={<span className="text-red-500">0</span>}
        />
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => router.push("/dashboard/inquiry")}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 rounded-full shadow-md w-full"
          >
            INQUIRY HISTORY
          </button>
          <button className="bg-red-400 hover:bg-red-500 text-white font-bold px-4 py-2 rounded-full shadow-md w-full">
            SEND NEW INQUIRY
          </button>
        </div>
      </Card>

      {/* Forum Activities */}
      <div className="col-span-1 lg:col-span-2 bg-white rounded-2xl shadow-md border border-yellow-300 flex flex-col transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
        <div className="flex items-center gap-3 bg-yellow-400 rounded-t-2xl px-6 py-4">
          <span className="font-bold text-lg text-gray-900">
            FORUM ACTIVITIES
          </span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-6 p-6">
          <div className="flex flex-col items-center w-full md:w-1/4">
            <img
              src="/static/img/forum/avatar-sample.png"
              alt="avatar"
              className="w-24 h-24 rounded-full border-4 border-yellow-300 object-cover shadow-md hover:shadow-yellow-500 transition-shadow"
            />
            <span className="font-bold mt-2">{user.username}</span>
            <span className="text-xs text-gray-500">
              Forum Sanction: <span className="text-blue-600">None</span>
            </span>
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {[ 
              { label: "Created\nTopics", count: 0, bg: "bg-gray-100" },
              { label: "Left\nComments", count: 0, bg: "bg-gray-200" },
              { label: "Received\nLikes", count: 0, bg: "bg-gray-300" },
              {
                label: "Bookmarked\nTopics",
                count: 0,
                bg: "bg-gray-800 text-white",
              },
            ].map(({ label, count, bg }, i) => (
              <div
                key={i}
                className={`${bg} rounded p-4 flex flex-col items-center`}
              >
                <span className="font-bold text-lg">{count}</span>
                <span className="text-xs text-center whitespace-pre-line">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
