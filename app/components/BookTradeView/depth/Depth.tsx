import AskTable from "./AskTable";
import { getDepth } from "@/app/utils/httpClient";
import { getTicker } from "@/app/utils/httpClient";
import BidTable from "./BidTable";

export default async function Depth({ market }: { market: string }) {
  const depthData: { asks: [string, string][]; bids: [string, string][] } =
    await getDepth(market);
  const tickerData: { lastPrice: string } | null = await getTicker(market);
  const ticker: string | null = tickerData ? tickerData.lastPrice : null;

  return (
    <div className="flex flex-col w-50">
      <TableHeader className="sticky top-0 z-10 bg-white flex justify-between" />
      <AskTable asks={depthData.asks} tickerData={ticker} />
      <BidTable bids={depthData.bids} />
    </div>
  );
}

const TableHeader = ({ className }: { className: string }) => {
  return (
    <div
      className={className}
    >
      <h1>Price</h1>
      <h1>Size</h1>
      <h1>Total</h1>
    </div>
  );
};
