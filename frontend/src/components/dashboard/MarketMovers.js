import React, { useState, useContext } from "react";
import TradeContext from "../../context/TradeContext";
import { formatINR } from "../../utils/formatINR";

export default function MarketMovers({ instruments }) {
  const [tab, setTab] = useState("gainers");
  const { openTradeModal } = useContext(TradeContext);

  if (!instruments || instruments.length === 0) return null;

  // Sort by dayChangePct
  const gainers = [...instruments]
    .sort((a, b) => b.dayChangePct - a.dayChangePct)
    .slice(0, 4);

  const losers = [...instruments]
    .sort((a, b) => a.dayChangePct - b.dayChangePct)
    .slice(0, 4);

  const activeList = tab === "gainers" ? gainers : losers;

  return (
    <div className="card" style={{ marginBottom: "var(--space-6)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-4)" }}>
        <div>
          <h3 style={{ fontSize: "var(--text-lg)", fontWeight: "600", margin: 0 }}>Market Movers Today</h3>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>NSE Top Movers (Live Ticker)</span>
        </div>
        
        {/* Toggle Pills */}
        <div style={{ display: "flex", background: "var(--color-bg)", padding: "3px", borderRadius: "6px", border: "1px solid var(--color-border)" }}>
          <button
            onClick={() => setTab("gainers")}
            style={{
              border: "none",
              padding: "4px 12px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
              background: tab === "gainers" ? "var(--color-surface)" : "transparent",
              color: tab === "gainers" ? "var(--color-success)" : "var(--color-text-muted)",
              boxShadow: tab === "gainers" ? "var(--shadow-sm)" : "none",
              transition: "all 0.15s ease"
            }}
          >
            ▲ Top Gainers
          </button>
          <button
            onClick={() => setTab("losers")}
            style={{
              border: "none",
              padding: "4px 12px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
              background: tab === "losers" ? "var(--color-surface)" : "transparent",
              color: tab === "losers" ? "var(--color-danger)" : "var(--color-text-muted)",
              boxShadow: tab === "losers" ? "var(--shadow-sm)" : "none",
              transition: "all 0.15s ease"
            }}
          >
            ▼ Top Losers
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
        {activeList.map((item) => {
          const isUp = item.dayChange >= 0;
          return (
            <div
              key={item.symbol}
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                padding: "14px 16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 0.2s ease"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                <div>
                  <div style={{ fontWeight: "600", fontSize: "14px", color: "var(--color-text)" }}>{item.symbol}</div>
                  <span style={{ fontSize: "11px", color: "var(--color-text-muted)", textTransform: "uppercase" }}>{item.sector}</span>
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    background: isUp ? "rgba(76, 175, 80, 0.1)" : "rgba(223, 81, 76, 0.1)",
                    color: isUp ? "var(--color-success)" : "var(--color-danger)"
                  }}
                >
                  {isUp ? "+" : ""}{item.dayChangePct.toFixed(2)}%
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: "600", fontSize: "15px" }}>
                  {formatINR(item.ltp)}
                </span>
                <div style={{ display: "flex", gap: "4px" }}>
                  <button
                    className="btn-buy-mini"
                    onClick={() => openTradeModal(item.symbol, "BUY")}
                    title={`Buy ${item.symbol}`}
                  >
                    B
                  </button>
                  <button
                    className="btn-sell-mini"
                    onClick={() => openTradeModal(item.symbol, "SELL")}
                    title={`Sell ${item.symbol}`}
                  >
                    S
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
