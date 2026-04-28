import AskTable from "./AskTable";
import { getDepth } from "@/app/utils/httpClient";

export default async function Depth({ market }: { market: string }) {
  const depthData = await getDepth(market);
  return (
    <div className="flex flex-col">
      <TableHeader />
      <AskTable asks={depthData.asks} />
      {/* <BidTable /> */}
    </div>
  );
}

const TableHeader = () => {
  return (
    <div className="flex gap-4">
      <h1>Price</h1>
      <h1>Size</h1>
      <h1>Total</h1>
    </div>
  );
};
