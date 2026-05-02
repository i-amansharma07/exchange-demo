import { getTrades } from "@/app/utils/httpClient";
import { ITrade } from "@/app/utils/types";

function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", { hour12: false });
}

export async function TradeView({ market }: { market: string }) {
  const trades: ITrade[] = await getTrades(market);
  return (
    <div>
      <TableHeader className="sticky top-0 z-10 flex gap-5" />
      {trades.map((trade) => (
        <div className="flex gap-5" key={trade.id}>
          <p className="flex-1">{trade.price}</p>
          <p className="flex-1">{trade.quantity}</p>
          <p className="flex-1">{formatTime(trade.timestamp)}</p>
        </div>
      ))}
    </div>
  );
}

const TableHeader = ({ className }: { className?: string }) => {
  return (
    <div
      className={className}
      // style={{ display: "flex", justifyContent: "space-between" }}
    >
      <h1>Price</h1>
      <h1>Quantity</h1>
      <h1>Timestamp</h1>
    </div>
  );
};
