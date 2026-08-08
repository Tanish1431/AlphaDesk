import React from "react";

function TopBar({ toggleSidebar }) {
  // Using fixed mock data for the indices for now
  const indices = [
    { name: "S&P 500", value: "5,180.74", change: "+44.15 (0.86%)", isUp: true },
    { name: "NASDAQ", value: "16,332.56", change: "+176.23 (1.09%)", isUp: true }
  ];

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
          <span className="index-value">22,514.65</span>
          <span className="index-change text-success">+120.40 (0.54%)</span>
        </div>
        <div className="market-index">
          <span className="index-name">SENSEX</span>
          <span className="index-value">74,221.05</span>
          <span className="index-change text-success">+351.10 (0.47%)</span>
        </div>
        <div className="market-index">
          <span className="index-name">NIFTY BANK</span>
          <span className="index-value">48,012.30</span>
          <span className="index-change text-danger">-45.20 (-0.09%)</span>
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
