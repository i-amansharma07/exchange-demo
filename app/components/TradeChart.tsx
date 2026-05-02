"use client";

import { getKlines } from "@/app/utils/httpClient";
import { IKLine } from "@/app/utils/types";
import { useCallback, useEffect, useRef } from "react";
import { ChartManager } from "../utils/ChartManager";

export default function TradeChart({ market }: { market: string }) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartManagerRef = useRef<ChartManager>(null);

  let KLines: IKLine[] = [];

  const init = useCallback(async () => {
    KLines = await getKlines(
      market,
      "1h",
      Math.floor(
        (new Date().getTime() - 1000 * 60 * 60 * 24 * 7 * 4 * 2) / 1000,
      ),
      Math.floor(new Date().getTime() / 1000),
    );

    if (chartRef.current) {
      if (chartManagerRef.current) {
        chartManagerRef.current.destroy();
      }
      chartManagerRef.current = new ChartManager(
        chartRef.current,
        [
          ...KLines?.map((x) => ({
            close: parseFloat(x.close),
            high: parseFloat(x.high),
            low: parseFloat(x.low),
            open: parseFloat(x.open),
            timestamp: new Date(x.end),
          })),
        ].sort((x, y) => (x.timestamp < y.timestamp ? -1 : 1)) || [],
        {
          background: "#0e0f14",
          color: "white",
        },
      );
    }
  }, []);

  useEffect(() => {
    init();
  }, [market]);

  if (!KLines) {
    return <h1 className="text-xl font-bold text-black">No Data Available</h1>;
  }

  return (
    <>
      <div
        ref={chartRef}
        style={{ height: "520px", width: "100%", marginTop: 4 }}
      ></div>
    </>
  );
}
