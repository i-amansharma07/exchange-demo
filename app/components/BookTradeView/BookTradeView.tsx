"use client";

import { useState } from "react";

export function BookTradeView({
  book,
  trade,
}: {
  book: React.ReactNode;
  trade: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<"book" | "trades">("book");

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <button
          onClick={() => setActiveTab("book")}
          className={`flex-1 px-6 py-3 font-semibold text-sm transition-all duration-200 ${
            activeTab === "book"
              ? "text-blue-600 border-b-2 border-blue-500 bg-blue-50"
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
          }`}
        >
          Book
        </button>
        <button
          onClick={() => setActiveTab("trades")}
          className={`flex-1 px-6 py-3 font-semibold text-sm transition-all duration-200 ${
            activeTab === "trades"
              ? "text-blue-600 border-b-2 border-blue-500 bg-blue-50"
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
          }`}
        >
          Trades
        </button>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        {activeTab === "book" && <div className="space-y-2">{book}</div>}
        {activeTab === "trades" && <div className="space-y-2">{trade}</div>}
      </div>
    </div>
  );
}
