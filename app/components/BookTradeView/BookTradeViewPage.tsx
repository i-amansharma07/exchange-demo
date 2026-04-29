import Depth from "@/app/components/depth/Depth";
import { BookTradeView } from "./BookTradeView";
import { TradeView } from "../trade/TradeView";

export default function BookTradeViewPage({ market }: { market: string }) {
  return (
    <BookTradeView
      book={
        <div className="w-fit  border border-black-500 m-2 p-2 h-[700px] overflow-y-scroll">
          <Depth market={market} />
        </div>
      }
      trade={
        <div className="w-fit  border border-black-500 m-2 p-2 h-[700px] overflow-y-scroll">
          <TradeView market={market} />{" "}
        </div>
      }
    />
  );
}
