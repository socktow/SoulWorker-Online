"use client";
import { useEffect, useState } from "react";
import { BsCoin } from "react-icons/bs";
import { useUser } from "@/app/UserProvider";
const PAGE_SIZE = 10;

export default function CoinPurchasePage() {
  const [tab, setTab] = useState("charge");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCoin, setTotalCoin] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const fetchData = async () => {
    setLoading(true);
    const url =
      tab === "charge"
        ? `/api/payment/history?page=${page}&limit=${PAGE_SIZE}`
        : `/api/coin-usage/history?page=${page}&limit=${PAGE_SIZE}`;

    try {
      const res = await fetch(url, { credentials: "include" });
      const result = await res.json();
      setData(result.payments || []);
      setTotalPages(Math.ceil((result.total || 0) / PAGE_SIZE));
      if (result.totalCoin !== undefined) setTotalCoin(result.totalCoin);
    } catch (err) {
      console.error("Fetch error:", err);
      setData([]);
      setTotalPages(1);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [tab, page]);

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

      {/* Total Coin */}
      <div className="flex items-center gap-2 mb-8 text-lg font-bold">
        <span>Total N-Coin:</span>
        <span className="flex items-center gap-1 text-yellow-500">
          <BsCoin className="text-yellow-400" /> {user.swcoin}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          className={`px-5 py-2 rounded-t-lg font-semibold border-b-2 transition-all ${
            tab === "charge"
              ? "border-yellow-400 text-yellow-600 bg-yellow-50"
              : "border-transparent text-gray-500 bg-gray-50 hover:text-yellow-500"
          }`}
          onClick={() => {
            setTab("charge");
            setPage(1);
          }}
        >
          Charge History
        </button>
        <button
          className={`px-5 py-2 rounded-t-lg font-semibold border-b-2 transition-all ${
            tab === "usage"
              ? "border-yellow-400 text-yellow-600 bg-yellow-50"
              : "border-transparent text-gray-500 bg-gray-50 hover:text-yellow-500"
          }`}
          onClick={() => {
            setTab("usage");
            setPage(1);
          }}
        >
          Usage History
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        {loading ? (
          <div className="text-center p-10">Loading...</div>
        ) : (
          <table className="w-full table-fixed text-sm mb-2">
            <thead>
              <tr className="bg-yellow-100 text-gray-700">
                {tab === "charge" ? (
                  <>
                    <th className="py-2 px-2 w-[18%]">Order ID</th>
                    <th className="py-2 px-2 w-[12%]">Method</th>
                    <th className="py-2 px-2 w-[20%]">Item</th>
                    <th className="py-2 px-2 w-[15%]">Coins</th>
                    <th className="py-2 px-2 w-[15%]">Price (₫)</th>
                    <th className="py-2 px-2 w-[20%]">Date</th>
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
              {data.length === 0 ? (
                <tr>
                  <td colSpan={tab === "charge" ? 6 : 4} className="text-center py-4">
                    No data found.
                  </td>
                </tr>
              ) : data.map((item) => (
                <tr
                  key={item._id}
                  className="border-b last:border-b-0 text-center"
                >
                  {tab === "charge" ? (
                    <>
                      <td className="py-2 px-2">{item.app_trans_id}</td>
                      <td className="py-2 px-2">{item.method || "-"}</td>
                      <td className="py-2 px-2">
                        {item.item?.itemname || "N/A"}
                      </td>
                      <td className="py-2 px-2 text-green-600 font-bold">
                        +{item.item?.coins?.toLocaleString() || "0"}
                      </td>
                      <td className="py-2 px-2 font-bold">
                        {(
                          (item.amount || 0) -
                          (item.discount_amount || 0)
                        ).toLocaleString()}
                        ₫
                      </td>
                      <td className="py-2 px-2">
                        {item.paidAt
                          ? new Date(item.paidAt).toLocaleDateString()
                          : "-"}
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-2 px-2">{item.item}</td>
                      <td className="py-2 px-2 text-red-500 font-bold">
                        -{item.used}
                      </td>
                      <td className="py-2 px-2">{item.remain}</td>
                      <td className="py-2 px-2">
                        {new Date(item.date).toLocaleDateString()}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
        <span className="px-2 py-1">
          {page} / {totalPages}
        </span>
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
