import BookTradeViewPage from "@/app/components/BookTradeView/BookTradeViewPage";
import TradeChart from "@/app/components/TradeChart";
interface Props {
  params: Promise<{ market: string }>;
}

export default async function Tradeview({ params }: Props) {
  const { market }: { market: string } = await params;

  return (
    <div className="m-5 flex gap-10 border border-black h-fit">
      <TradeChart market={market} />
      <BookTradeViewPage market={market} />
      {/* <RightPanel /> */}
    </div>
  );
}
      