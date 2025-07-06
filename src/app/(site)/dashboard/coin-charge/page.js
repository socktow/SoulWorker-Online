"use client";
import { useState } from "react";
import { BsCoin } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import { RiCoupon3Line } from "react-icons/ri";

export default function CoinChargeTable() {
  const [selectedPackId, setSelectedPackId] = useState(null);
  const [method, setMethod] = useState("bank");
  const [message, setMessage] = useState("");

  const coinPerVND = 490 / 50000;

  const packs = [
    { packid: 1, cash: 20000, coin: 190 },
    { packid: 2, cash: 50000, coin: 490 },
    { packid: 3, cash: 100000, coin: 1040 },
    { packid: 4, cash: 200000, coin: 2115 },
    { packid: 5, cash: 500000, coin: 5350 },
    { packid: 6, cash: 750000, coin: 8125 },
    { packid: 7, cash: 1000000, coin: 11000 },
    { packid: 8, cash: 2000000, coin: 22500 },
    { packid: 9, cash: 5000000, coin: 57500 },
  ];

  const calculateBonus = (pack) => {
    const expected = pack.cash * coinPerVND;
    const bonus = Math.round(pack.coin - expected);
    return bonus > 0 ? bonus : 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedPack = packs.find((p) => p.packid === selectedPackId);
    if (!selectedPack) {
      setMessage("⚠️ Please select a package.");
      return;
    }
    const bonus = calculateBonus(selectedPack);
    setMessage(
      `✅ You selected ${selectedPack.cash.toLocaleString()} VND via ${method}. Total coin: ${selectedPack.coin} (+${bonus} bonus)`
    );
    setSelectedPackId(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-8">
      <h1 className="text-2xl font-bold text-yellow-500 mb-6 text-center">Recharge S-Coin</h1>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Select</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Cash (VND)</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">S-Coin</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Bonus</th>
            </tr>
          </thead>
          <tbody>
            {packs.map((pack) => {
              const isSelected = selectedPackId === pack.packid;
              const bonus = calculateBonus(pack);

              return (
                <tr
                  key={pack.packid}
                  onClick={() => setSelectedPackId(pack.packid)}
                  className={`cursor-pointer transition-all ${
                    isSelected ? "bg-yellow-100 shadow-inner ring-1 ring-yellow-300" : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="radio"
                      name="pack"
                      checked={isSelected}
                      onChange={() => setSelectedPackId(pack.packid)}
                      className="accent-yellow-400 w-5 h-5"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {pack.cash.toLocaleString()} VND
                  </td>
                  <td className="px-4 py-3 text-gray-700 flex items-center gap-1">
                    {pack.coin}
                    <BsCoin className="text-yellow-400" />
                  </td>
                  <td className="px-4 py-3 text-green-600">
                    {bonus > 0 ? (
                      <div className="flex items-center gap-1">
                        <RiCoupon3Line className="text-sm" />
                        +{bonus}
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Payment Method & Submit */}
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            <MdPayment className="inline mr-1 text-xl" />
            Payment Method
          </label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="zalo">Zalo Pay</option>
            <option value="momo">MoMo E-Wallet</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg text-lg transition"
        >
          Confirm & Recharge
        </button>

        {message && (
          <div className="text-center font-semibold text-green-600 mt-2">{message}</div>
        )}
      </form>

      <p className="mt-8 text-xs text-gray-500 text-center">
        Your S-Coin will be updated after a successful transaction. Need help? Contact support.
      </p>
    </div>
  );
}
