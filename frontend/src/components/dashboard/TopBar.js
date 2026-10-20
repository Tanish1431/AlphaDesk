import React, { useState, useEffect } from "react";

function TopBar({ toggleSidebar }) {
  const [nifty, setNifty] = useState({ val: 22514.65, chg: 120.40, pct: 0.54 });
  const [sensex, setSensex] = useState({ val: 74221.05, chg: 351.10, pct: 0.47 });
  const [bankNifty, setBankNifty] = useState({ val: 48012.30, chg: -45.20, pct: -0.09 });

  useEffect(() => {
    const timer = setInterval(() => {
      // Natural micro-fluctuation every 2 seconds
      setNifty(prev => {
        const delta = (Math.random() - 0.48) * 1.5;
        const newVal = +(prev.val + delta).toFixed(2);
        const newChg = +(prev.chg + delta).toFixed(2);
        return { val: newVal, chg: newChg, pct: +((newChg / 22394) * 100).toFixed(2) };
      });
      setSensex(prev => {
        const delta = (Math.random() - 0.48) * 4.2;
        const newVal = +(prev.val + delta).toFixed(2);
        const newChg = +(prev.chg + delta).toFixed(2);
        return { val: newVal, chg: newChg, pct: +((newChg / 73870) * 100).toFixed(2) };
      });
      setBankNifty(prev => {
        const delta = (Math.random() - 0.51) * 2.8;
        const newVal = +(prev.val + delta).toFixed(2);
        const newChg = +(prev.chg + delta).toFixed(2);
        return { val: newVal, chg: newChg, pct: +((newChg / 48057) * 100).toFixed(2) };
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="dashboard-topbar">
      <div className="dashboard-topbar-left">
        <button 
          onClick={toggleSidebar} 
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}
          className="hide-desktop"
          aria-label="Toggle Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <div className="market-index">
          <span className="index-name">NIFTY 50</span>
          <span className="index-value font-mono">{nifty.val.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          <span className={`index-change ${nifty.chg >= 0 ? 'text-success' : 'text-danger'}`}>
            {nifty.chg >= 0 ? '+' : ''}{nifty.chg.toFixed(2)} ({nifty.pct >= 0 ? '+' : ''}{nifty.pct.toFixed(2)}%)
          </span>
        </div>
        <div className="market-index">
          <span className="index-name">SENSEX</span>
          <span className="index-value font-mono">{sensex.val.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          <span className={`index-change ${sensex.chg >= 0 ? 'text-success' : 'text-danger'}`}>
            {sensex.chg >= 0 ? '+' : ''}{sensex.chg.toFixed(2)} ({sensex.pct >= 0 ? '+' : ''}{sensex.pct.toFixed(2)}%)
          </span>
        </div>
        <div className="market-index">
          <span className="index-name">NIFTY BANK</span>
          <span className="index-value font-mono">{bankNifty.val.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          <span className={`index-change ${bankNifty.chg >= 0 ? 'text-success' : 'text-danger'}`}>
            {bankNifty.chg >= 0 ? '+' : ''}{bankNifty.chg.toFixed(2)} ({bankNifty.pct >= 0 ? '+' : ''}{bankNifty.pct.toFixed(2)}%)
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginLeft: "12px", fontSize: "11px", color: "var(--color-text-muted)" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--color-success)", display: "inline-block", boxShadow: "0 0 6px rgba(76, 175, 80, 0.6)" }}></span>
          <span>LIVE MARKET</span>
        </div>
      </div>

      <div className="dashboard-topbar-right">
        <button className="btn btn-icon btn-ghost" aria-label="Notifications">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </button>
      </div>
    </header>
  );
}

export default TopBar;
