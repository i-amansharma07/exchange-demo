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
    <div>
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("book")}
          className={`px-4 py-2 font-medium ${
            activeTab === "book"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Book
        </button>
        <button
          onClick={() => setActiveTab("trades")}
          className={`px-4 py-2 font-medium ${
            activeTab === "trades"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Trades
        </button>
      </div>

      <div className="p-4">
        {activeTab === "book" && <div>{book}</div>}
        {activeTab === "trades" && <div>{trade}</div>}
      </div>
    </div>
  );
}
