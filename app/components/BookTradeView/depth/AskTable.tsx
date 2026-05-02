export default function AskTable({
  asks,
  tickerData,
}: {
  asks: [string, string][];
  tickerData: string | null;
}) {
  let filteredAsks: [string, string][] = asks.slice(0, 25);

  /*
   * 129.93 10
   * 129.94 5
   * 132.96 3
   * 132.97 253.03
   */

  filteredAsks.reverse();

  /*
   * 132.97 253.03     270
   * 132.96 3    18
   * 129.94 5    15
   * 129.93 10   10
   */

  let currentTotal = 0;

  let relevantAsks: [string, string, number][] = [];

  for (let i = filteredAsks.length - 1; i >= 0; i--) {
    currentTotal += parseFloat(filteredAsks[i][1]);
    relevantAsks.push([
      filteredAsks[i][0],
      filteredAsks[i][1],
      parseFloat(currentTotal.toFixed(2)),
    ]);
  }

  relevantAsks.reverse();

  const maxTotal = filteredAsks.reduce(
    (acc, [_, quantity]) => acc + Number(quantity),
    0,
  );

  return (
    <div>
      {relevantAsks.map(([price, quantity, total], index) => (
        <div className="flex gap-5" key={index}>
          <Ask
            maxTotal={maxTotal}
            key={price}
            price={price}
            quantity={quantity}
            total={total}
          />
        </div>
      ))}
      <h1 className="text-lg font-bold">${tickerData}</h1>
    </div>
  );
}

function Ask({
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
          background: "rgba(228, 75, 68, 0.325)",
          transition: "width 0.3s ease-in-out",
        }}
      ></div>
      <div className="flex justify-between text-xs w-full">
        <div className="flex-1">{price}</div>
        <div className="flex-1">{quantity}</div>
        <div className="flex-1">{total?.toFixed(2)}</div>
      </div>
    </div>
  );
}
