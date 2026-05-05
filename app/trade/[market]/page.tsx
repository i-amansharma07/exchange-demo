import BookTradeViewPage from "@/app/components/BookTradeView/BookTradeViewPage";
import TradeChart from "@/app/components/TradeChart";
import MarketAppBar from "@/app/components/MarketAppBar";
import { getTicker } from "@/app/utils/httpClient";
import {TickerData} from "@/app/components/MarketAppBar";
interface Props {
  params: Promise<{ market: string }>;
}

export default async function Tradeview({ params }: Props) {
  const { market }: { market: string } = await params;
  const tickerData: TickerData = await getTicker(market);

  return (
    <div className="m-5 flex-col gap-10 border border-black h-fit p-6 bg-white shadow-lg rounded-lg">
      <MarketAppBar data={tickerData} />
      <div className="flex gap-10">
        <TradeChart market={market} />
        <BookTradeViewPage market={market} />
      </div>

      {/* <RightPanel /> */}
    </div>
  );
}
