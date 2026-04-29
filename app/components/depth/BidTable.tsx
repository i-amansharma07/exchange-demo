export default async function BidTable({ bids }: { bids: [string, string][] }) {
  bids.reverse();  
  const filteredBids: [string, string][] = bids.slice(0, 25);

  const relevantBids: [string, string, number][] = [];

  let currentTotal = 0;
  filteredBids.forEach(([price, quantity]) => {
    currentTotal += parseFloat(quantity);
    relevantBids.push([price, quantity, currentTotal]);
  });
  return relevantBids.map(([price, quantity, total]) => (
    <Bid
      key={price}
      price={price}
      quantity={quantity}
      total={total}
      maxTotal={parseFloat(relevantBids[relevantBids.length - 1][2].toString())}
    />
  ));
}

function Bid({
  price,
  quantity,
  total,
  maxTotal,
}: {
  price: string;
  quantity: string;
  total: number;
  maxTotal: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: "100%",
        backgroundColor: "transparent",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: `${(100 * total) / maxTotal}%`,
          height: "100%",
          background: "rgba(68, 228, 75, 0.325)",
          transition: "width 0.3s ease-in-out",
        }}
      ></div>
      <div className="flex justify-between text-xs w-full">
        <div>{price}</div>
        <div>{quantity}</div>
        <div>{total?.toFixed(2)}</div>
      </div>
    </div>
  );
}
