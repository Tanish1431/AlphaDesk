import React, { useContext, useState, useMemo } from "react";
import TradeContext from "../../context/TradeContext";
import { usePortfolio } from "../../context/PortfolioContext";
import { formatINR } from "../../utils/formatINR";

function WatchList() {
  const { openTradeModal } = useContext(TradeContext);
  const { instruments, loading } = usePortfolio();
  const [search, setSearch] = useState("");

  const filteredInstruments = useMemo(() => {
     if (!search) return instruments;
     return instruments.filter(i => i.symbol.toLowerCase().includes(search.toLowerCase()));
  }, [instruments, search]);

  if (loading) {
     return <div className="dashboard-watchlist"><div className="watchlist-header"><h3>Watchlist</h3></div><div style={{padding: "20px", textAlign: "center"}}>Loading...</div></div>;
  }

  return (
    <div className="dashboard-watchlist">
      <div className="watchlist-header">
        <h3>Watchlist</h3>
        <span className="text-secondary" style={{fontSize: "var(--text-xs)"}}>{filteredInstruments.length} items</span>
      </div>

      <div className="watchlist-search">
        <input 
          type="text" 
          placeholder="Search eg: RELIANCE, TCS..." 
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>

      <div className="watchlist-items">
        {filteredInstruments.length === 0 ? (
           <div className="text-center text-muted" style={{padding: "20px"}}>No instruments found.</div>
        ) : (
            filteredInstruments.map((item, index) => (
              <div key={index} className="watchlist-item">
                <div className="watchlist-item-info">
                  <span className="watchlist-item-name">{item.symbol}</span>
                  <span className={`watchlist-item-change ${item.dayChange >= 0 ? "text-success" : "text-danger"}`}>
                    {item.dayChange >= 0 ? "+" : ""}{item.dayChangePct.toFixed(2)}%
                  </span>
                </div>
                <div className="watchlist-item-price-actions">
                  <span className="watchlist-item-price">{formatINR(item.ltp, false)}</span>
                  <div className="watchlist-item-actions">
                    <button className="btn-buy-mini" onClick={() => openTradeModal(item.symbol, "BUY")}>B</button>
                    <button className="btn-sell-mini" onClick={() => openTradeModal(item.symbol, "SELL")}>S</button>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default WatchList;
