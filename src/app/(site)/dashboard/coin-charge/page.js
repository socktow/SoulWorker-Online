"use client";
import { useState } from "react";
import { BsCoin } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";

export default function CoinCharge() {
  const [selectedPack, setSelectedPack] = useState(null);
  const [method, setMethod] = useState("bank");
  const [message, setMessage] = useState("");

  const coinPerVND = 490 / 50000; // ~0.0098

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

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!selectedPack) {
      setMessage("Please select a package.");
      return;
    }
  
    const bonus = calculateBonus(selectedPack);
    const totalCoin = selectedPack.coin;
  
    console.log("=== Payment Info ===");
    console.log("Pack ID:", selectedPack.packid);
    console.log("Amount:", selectedPack.cash.toLocaleString(), "VND");
    console.log("Coin:", totalCoin);
    console.log("Bonus:", bonus);
    console.log("Payment Method:", method);
    console.log("====================");
  
    setMessage(`Successfully paid ${selectedPack.cash.toLocaleString()} VND via ${method}.`);
    setSelectedPack(null);
  };
  
  const calculateBonus = (pack) => {
    const expected = pack.cash * coinPerVND;
    const bonus = Math.round(pack.coin - expected);
    return bonus > 0 ? bonus : 0;
  };

  return (
    <div className="w-full max-w-7xl mx-auto min-h-[700px] p-8 flex flex-col">
      <h1 className="text-2xl font-bold mb-6 text-yellow-500">TOP-UP S-COIN</h1>

      {/* Package Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {packs.map((pack) => {
          const bonus = calculateBonus(pack);
          return (
            <button
              key={pack.packid}
              className={`border rounded-lg p-4 text-center transition-all ${
                selectedPack?.packid === pack.packid
                  ? "bg-yellow-100 border-yellow-400 ring-2 ring-yellow-300"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => setSelectedPack(pack)}
            >
              <div className="text-lg font-bold text-gray-700">
                {pack.cash.toLocaleString()} VND
              </div>
              <div className="text-sm text-gray-500 flex justify-center items-center gap-1 mt-1">
                {pack.coin} <BsCoin className="text-yellow-400" />
                {bonus > 0 && (
                <div className="text-xs text-green-600 mt-1">+{bonus} Bonus</div>
              )}
              </div>
              {selectedPack?.packid === pack.packid && (
                <FaCheckCircle className="text-green-500 text-xl mt-2 mx-auto" />
              )}
            </button>
          );
        })}
      </div>

      {/* Payment Method */}
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label className="block font-semibold mb-2 text-gray-700">Payment Method</label>
          <select
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="bank">Bank Transfer</option>
            <option value="momo">MoMo E-Wallet</option>
            <option value="card">Mobile Top-up Card</option>
            <option value="paypal">PayPal</option>
          </select>
          
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg text-lg transition"
        >
          Proceed to Payment
        </button>

        {message && (
          <div className="text-center font-semibold text-green-600">{message}</div>
        )}
      </form>

      {/* Note */}
      <div className="mt-8 text-xs text-gray-500">
        * Once the payment is successful, your S-Coin balance will be updated automatically.
        If you experience any issues, please contact our support team.
      </div>
    </div>
  );
}
