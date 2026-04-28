import Depth from "@/app/components/depth/Depth";


interface Props {
    params: Promise<{ market: string }>
}

export default async function Tradeview({ params }: Props) {
  const { market } = await params;

  return (
    <div className="m-5 flex gap-10 border border-black h-fit">
      <h1>TradeChart</h1>
      <Depth market={market} />
    </div>
  );
}
