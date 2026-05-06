"use client";

import { ITicker } from "@/app/utils/types";
import SignalingManager from "@/app/utils/SignalingManager";
import { useEffect, useState } from "react";

function formatNumber(value: string, decimals = 2): string {
  return parseFloat(value).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
//{"method":"SUBSCRIBE","params":["ticker.SOL_USDC_PERP"],"id":1}
export default function MarketBar({ market }: { market: string }) {
  const [ticker, setTicker] = useState<Partial<ITicker> | null>(null);

  useEffect(() => {
    //register the callback for ticker updates
    SignalingManager.getInstance().registerCallback(
      "ticker",
      (data: Partial<ITicker>) =>
        setTicker((prevTicker) => ({
          firstPrice: data?.firstPrice ?? prevTicker?.firstPrice ?? "",
          high: data?.high ?? prevTicker?.high ?? "",
          lastPrice: data?.lastPrice ?? prevTicker?.lastPrice ?? "",
          low: data?.low ?? prevTicker?.low ?? "",
          priceChange: data?.priceChange ?? prevTicker?.priceChange ?? "",
          priceChangePercent:
            data?.priceChangePercent ?? prevTicker?.priceChangePercent ?? "",
          quoteVolume: data?.quoteVolume ?? prevTicker?.quoteVolume ?? "",
          symbol: data?.symbol ?? prevTicker?.symbol ?? "",
          trades: data?.trades ?? prevTicker?.trades ?? "",
          volume: data?.volume ?? prevTicker?.volume ?? "",
        })),
      `TICKER-${market}`,
    );

    //subscribe to ticker updates for the selected market
    SignalingManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`ticker.${market}`],
    });

    //cleanup function to unregister the callback and unsubscribe 
    // from ticker updates when the component unmounts or market changes
    return () => {
      SignalingManager.getInstance().deRegisterCallback(
        "ticker",
        `TICKER-${market}`,
      );
      SignalingManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`ticker.${market}`],
      });
    };
  }, [market]);

 return <div>
        <div className="flex items-center flex-row relative w-full overflow-hidden border-b border-slate-800">
            <div className="flex items-center justify-between flex-row no-scrollbar overflow-auto pr-4">
                    <Ticker market={market} />
                    <div className="flex items-center flex-row space-x-8 pl-4">
                        <div className="flex flex-col h-full justify-center">
                            <p className={`font-medium tabular-nums text-greenText text-md text-green-500`}>${ticker?.lastPrice}</p>
                            <p className="font-medium text-sm text-sm tabular-nums">${ticker?.lastPrice}</p>
                        </div>
                        <div className="flex flex-col">
                                <p className="font-medium text-xs text-slate-400 text-sm">24H High</p>
                                <p className="text-sm font-medium tabular-nums leading-5 text-sm ">{ticker?.high}</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-medium text-xs text-slate-400 text-sm">24H Low</p>
                                    <p className="text-sm font-medium tabular-nums leading-5 text-sm ">{ticker?.low}</p>
                                </div>
                            <button type="button" className="font-medium transition-opacity hover:opacity-80 hover:cursor-pointer text-base text-left" data-rac="">
                                <div className="flex flex-col">
                                    <p className="font-medium text-xs text-slate-400 text-sm">24H Volume</p>
                                    <p className="mt-1 text-sm font-medium tabular-nums leading-5 text-sm ">{ticker?.volume}
                                </p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
}

function Ticker({market}: {market: string}) {
    return <div className="flex h-[60px] shrink-0 space-x-4">
        <div className="flex flex-row relative ml-2 -mr-4">
            <img alt="SOL Logo" loading="lazy" decoding="async" data-nimg="1" className="z-10 rounded-full h-6 w-6 mt-4 outline-baseBackgroundL1"  src="/sol.webp" />
            <img alt="USDC Logo" loading="lazy"decoding="async" data-nimg="1" className="h-6 w-6 -ml-2 mt-4 rounded-full" src="/usdc.webp" />
        </div>
    <button type="button" className="react-aria-Button" data-rac="">
        <div className="flex items-center justify-between flex-row cursor-pointer rounded-lg p-3 hover:opacity-80">
            <div className="flex items-center flex-row gap-2 undefined">
                <div className="flex flex-row relative">
                    <p className="font-medium text-sm undefined">{market.replace("_", " / ")}</p>
                </div>
            </div>
        </div>
    </button>
    </div>
}
//{"data":{"E":1778053600820427,"V":"20710709.1073","c":"87.79","e":"ticker","h":"87.84","l":"84.43","n":21691,"o":"84.91","s":"SOL_USDC_PERP","v":"2{"data":{"E":1778053600820427,"V":"20710709.1073","c":"87.79","e":"ticker","h":"87.84","l":"84.43","n":21691,"o":"84.91","s":"SOL_USDC_PERP","v":{"data":{"E":1778053600820427,"V":"20710709.1073","c":"87.79","e":"ticker","h":"87.84","l":"84.43","n":21691,"o":"84.91","s":"SOL_USDC_PERP","v":{"data":{"E":1778053600820427,"V":"20710709.1073","c":"87.79","e":"ticker","h":"87.84","l":"84.43","n":21691,"o":"84.91","s":"SOL_USDC_PERP","v":"240564.44"},"stream":"ticker.SOL_USDC_PERP"}"240564.44"},"stream":"ticker.SOL_USDC_PERP"}"240564.44"},"stream":"ticker.SOL_USDC_PERP"}40564.44"},"stream":"ticker.SOL_USDC_PERP"}

/*
"use client";

import { useEffect, useState } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

interface TickerData {
  lastPrice: string;
  high: string;
  low: string;
  volume: string;      // base volume  (v)
  quoteVolume: string; // quote volume (V) → shown as 24H Volume (USD)
  symbol: string;
}

interface TickerBarProps {
  data: TickerData;
  openPrice: number;   // from message.data.o — needed for 24H Change
  fundingRate?: number; // e.g. 0.0003  (separate endpoint)
  openInterest?: number; // e.g. 239120.84 SOL (separate endpoint)
  profitApy?: number;    // e.g. 3.91 (separate endpoint)
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number, decimals = 2) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function useCountdown(initialSeconds: number) {
  const [secs, setSecs] = useState(initialSeconds);
  useEffect(() => {
    const id = setInterval(
      () => setSecs((s) => (s - 1 + 3600) % 3600),
      1000
    );
    return () => clearInterval(id);
  }, []);
  const m = String(Math.floor(secs / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return `00:${m}:${s}`;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Divider() {
  return <div className="h-8 w-px bg-white/[0.06] shrink-0" />;
}

interface ColProps {
  label: string;
  children: React.ReactNode;
}

function Col({ label, children }: ColProps) {
  return (
    <div className="flex flex-col gap-1.5 px-4 shrink-0">
      <span className="text-[10px] text-white/30 font-sans tracking-wide uppercase">
        {label}
      </span>
      <span className="text-[12px] font-mono font-medium">{children}</span>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function TickerBar({
  data,
  openPrice,
  fundingRate = 0.0003,
  openInterest = 239120.84,
  profitApy = 3.91,
}: TickerBarProps) {
  const last = parseFloat(data.lastPrice);
  const high = parseFloat(data.high);
  const low = parseFloat(data.low);
  const quoteVol = parseFloat(data.quoteVolume);

  const change = last - openPrice;
  const changePct = (change / openPrice) * 100;
  const isUp = change >= 0;
  const sign = isUp ? "+" : "";

  const countdown = useCountdown(710);

  return (
    <div className="w-full bg-[#0d0f14] border border-white/[0.06] rounded-md overflow-x-auto">
      <div className="flex items-center min-w-max px-4 py-2.5">

        // {/* ── Live price ─────────────────────────────────── }
        <div className="flex flex-col gap-1.5 pr-5 shrink-0">
          <span
            className={`text-[22px] font-mono font-semibold leading-none tracking-tight ${
              isUp ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {fmt(last)}
          </span>
          <span className="text-[11px] font-mono text-white/30">
            {fmt(last - 0.05)}
          </span>
        </div>

        <Divider />

        // {/* ── Index Price ─────────────────────────────────── }
        <Col label="Index Price">
          <span className="text-white/70">{fmt(last)}</span>
        </Col>

        <Divider />

        // {/* ── 24H Change ──────────────────────────────────── }
        <Col label="24H Change">
          <span className={isUp ? "text-emerald-400" : "text-red-400"}>
            {sign}{fmt(change)} {sign}{fmt(changePct)}%
          </span>
        </Col>

        <Divider />

        // {/* ── 1H Funding / Countdown ──────────────────────── }
        <Col label="1H Funding / Countdown">
          <span className="text-amber-400">
            {fundingRate.toFixed(4)}%
            <span className="mx-1.5 text-white/20">/</span>
            {countdown}
          </span>
        </Col>

        <Divider />

        {/* ── 24H High ──────────────────────────────────────
        <Col label="24H High">
          <span className="text-white/70">{fmt(high)}</span>
        </Col>

        <Divider />

        // {/* ── 24H Low ─────────────────────────────────────── }
        <Col label="24H Low">
          <span className="text-white/70">{fmt(low)}</span>
        </Col>

        <Divider />

        // {/* ── 24H Volume (USD) ────────────────────────────── }
        <Col label="24H Volume (USD)">
          <span className="text-white/70">{fmt(quoteVol)}</span>
        </Col>

        <Divider />

        // {/* ── Open Interest ───────────────────────────────── }
        <Col label="Open Interest (SOL)">
          <span className="text-white/70">{fmt(openInterest)}</span>
        </Col>

        <Divider />

        {/* ── Profit APY ──────────────────────────────────── }
        <Col label="Profit APY">
          <span className="flex items-center gap-1 text-emerald-400">
            {fmt(profitApy)}%
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3 h-3"
              aria-hidden="true"
            >
              <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
            </svg>
          </span>
        </Col>

      </div>
    </div>
  );
}*/