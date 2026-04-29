import BookTradeViewPage from "@/app/components/BookTradeView/BookTradeViewPage";
interface Props {
  params: Promise<{ market: string }>;
}

export default async function Tradeview({ params }: Props) {
  const { market }: { market: string } = await params;

  return (
    <div className="m-5 flex gap-10 border border-black h-fit">
      <h1>TradeChart</h1>
      <BookTradeViewPage market={market} />
      {/* <RightPanel /> */}
    </div>
  );
}
      