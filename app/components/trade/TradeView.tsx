import { getTrades } from "../../utils/httpClient";
import { ITrade } from "../../utils/types";

function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", { hour12: false });
}

export async function TradeView({ market }: { market: string }) {
  const trades: ITrade[] = await getTrades(market);
  return (
    <div>
      <TableHeader className="sticky top-0 z-10 bg-white"/>
      {trades.map((trade) => (
        <div className="flex gap-5" key={trade.id}>
          <p>{trade.price}</p>
          <p>{trade.quantity}</p>
          <p>{formatTime(trade.timestamp)}</p>
        </div>
      ))}
    </div>
  );
}

const TableHeader = ({ className }: { className?: string }) => {
  return (
    <div
      className={className}
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <h1>Price</h1>
      <h1>Quantity</h1>
      <h1>Timestamp</h1>
    </div>
  );
};

/**
    {
        "id": 85494557,
        "isBuyerMaker": true,
        "price": "83.01",
        "quantity": "29.75",
        "quoteQuantity": "2469.5475",
        "timestamp": 1777481470501
    },
    {
        "id": 85494556,
        "isBuyerMaker": true,
        "price": "83.01",
        "quantity": "11.26",
        "quoteQuantity": "934.6926",
        "timestamp": 1777481470501
    },
 */
