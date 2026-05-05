
export interface TickerData {
  firstPrice: string;
  high: string;
  lastPrice: string;
  low: string;
  priceChange: string;
  priceChangePercent: string;
  quoteVolume: string;
  symbol: string;
  trades: string;
  volume: string;
}

function formatNumber(value: string, decimals = 2): string {
  return parseFloat(value).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function formatPercent(raw: string): string {
  return (parseFloat(raw) * 100).toFixed(2) + "%";
}

export default function MarketBar({ data }: { data: TickerData }) {
  // const priceChangeNum = parseFloat(data.priceChange);
  // const isPositive = priceChangeNum >= 0;
  // const changeColor = isPositive ? "text-emerald-400" : "text-red-400";
  // const changeSign = isPositive ? "+" : "";

  return (
    <div className="flex items-center gap-6 bg-[#0f1117] border-b border-white/10 px-4 py-2 overflow-x-auto scrollbar-none whitespace-nowrap text-sm">
      {/* Price block */}
      <div className="flex-shrink-0 flex flex-col leading-tight mr-2">
        <span className="text-red-500 text-xl font-semibold tracking-tight">
          {formatNumber(data.lastPrice, 2)}
        </span>
        <span className="text-[#9ca3af] text-xs mt-0.5">
         
        </span>
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-white/10 flex-shrink-0" />

      {/* Stats */}
      {/* {stats.map((stat) => (
        <div key={stat.label} className="flex-shrink-0 flex flex-col gap-0.5">
          <span className="text-[#6b7280] text-[11px] leading-none">
            {stat.label}
          </span>
          <span
            className={`text-xs font-medium leading-none ${stat.valueClass}`}
          >
            {stat.value}
            {stat.suffix}
          </span>
        </div>
      ))} */}
    </div>
  );
}
