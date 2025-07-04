"use client";
import { useState } from "react";
import { BsCoin } from "react-icons/bs";

const chargeHistory = [
  { id: 1, price: 100000, amount: 1000, date: "2025-07-01", order: "ORD123" },
  { id: 2, price: 50000, amount: 500, date: "2025-06-28", order: "ORD122" },
];
const usageHistory = [
  { id: 1, item: "Item A", used: 200, remain: 800, date: "2025-07-02" },
  { id: 2, item: "Item B", used: 100, remain: 700, date: "2025-07-03" },
];
const PAGE_SIZE = 7;

export default function CoinPurchasePage() {
  const [tab, setTab] = useState("charge");
  const [page, setPage] = useState(1);
  const data = tab === "charge" ? chargeHistory : usageHistory;
  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const pagedData = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalCoin = 1000;

  return (
    <div className="w-full max-w-7xl mx-auto min-h-[700px] p-8 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-yellow-500 flex items-center gap-2">
          <BsCoin className="text-yellow-400" /> N-COIN HISTORY
        </h1>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded-full shadow transition-all">
          CHARGE
        </button>
      </div>

      <div className="flex items-center gap-2 mb-8 text-lg font-bold">
        <span>Total N-Coin:</span>
        <span className="flex items-center gap-1 text-yellow-500">
          <BsCoin className="text-yellow-400" />
          {totalCoin}
        </span>
      </div>
      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          className={`px-5 py-2 rounded-t-lg font-semibold border-b-2 transition-all ${tab === "charge" ? "border-yellow-400 text-yellow-600 bg-yellow-50" : "border-transparent text-gray-500 bg-gray-50 hover:text-yellow-500"}`}
          onClick={() => { setTab("charge"); setPage(1); }}
        >
          Charge History
        </button>
        <button
          className={`px-5 py-2 rounded-t-lg font-semibold border-b-2 transition-all ${tab === "usage" ? "border-yellow-400 text-yellow-600 bg-yellow-50" : "border-transparent text-gray-500 bg-gray-50 hover:text-yellow-500"}`}
          onClick={() => { setTab("usage"); setPage(1); }}
        >
          Usage History
        </button>
      </div>
      {/* Table */}
      <div className="overflow-x-auto w-full">
  <table className="w-full table-fixed text-sm mb-2">
    <thead>
      <tr className="bg-yellow-100 text-gray-700">
        {tab === "charge" ? (
          <>
            <th className="py-2 px-2 w-1/4">Price</th>
            <th className="py-2 px-2 w-1/4">Amount</th>
            <th className="py-2 px-2 w-1/4">Date</th>
            <th className="py-2 px-2 w-1/4">Order Number</th>
          </>
        ) : (
          <>
            <th className="py-2 px-2 w-1/4">Item Name</th>
            <th className="py-2 px-2 w-1/4">Coin Used</th>
            <th className="py-2 px-2 w-1/4">Coin Remaining</th>
            <th className="py-2 px-2 w-1/4">Date</th>
          </>
        )}
      </tr>
    </thead>
    <tbody>
      {pagedData.map((item) => (
        <tr key={item.id} className="border-b last:border-b-0 text-center justify-between">
          {tab === "charge" ? (
            <>
              <td className="py-2 px-2">{item.price.toLocaleString()}₫</td>
              <td className="py-2 px-2 font-bold text-green-600">+{item.amount}</td>
              <td className="py-2 px-2">{item.date}</td>
              <td className="py-2 px-2">{item.order}</td>
            </>
          ) : (
            <>
              <td className="py-2 px-2">{item.item}</td>
              <td className="py-2 px-2 font-bold text-red-500">-{item.used}</td>
              <td className="py-2 px-2">{item.remain}</td>
              <td className="py-2 px-2">{item.date}</td>
            </>
          )}
        </tr>
      ))}
    </tbody>
  </table>
</div>

      {/* Pagination */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="px-2 py-1">{page} / {totalPages}</span>
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
} 