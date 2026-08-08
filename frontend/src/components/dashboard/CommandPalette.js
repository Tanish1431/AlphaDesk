import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { usePortfolio } from "../../context/PortfolioContext";
import TradeContext from "../../context/TradeContext";

function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  
  const navigate = useNavigate();
  const { instruments } = usePortfolio();
  const { openTradeModal } = useContext(TradeContext);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    } else {
      setQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const navItems = [
    { label: "Go to Dashboard", action: () => navigate("/dashboard") },
    { label: "Go to Holdings", action: () => navigate("/dashboard/holdings") },
    { label: "Go to Orders", action: () => navigate("/dashboard/orders") },
    { label: "Go to Positions", action: () => navigate("/dashboard/positions") },
    { label: "Go to Funds", action: () => navigate("/dashboard/funds") },
    { label: "Go to Tax Center", action: () => navigate("/dashboard/tax") },
    { label: "Go to Time Machine", action: () => navigate("/dashboard/time-machine") },
  ];

  const searchResults = [];
  
  const q = query.toLowerCase();
  
  if (q) {
      navItems.forEach(item => {
          if (item.label.toLowerCase().includes(q)) {
              searchResults.push({ type: "Navigation", ...item });
          }
      });
      
      instruments.forEach(inst => {
          if (inst.symbol.toLowerCase().includes(q) || (inst.sector && inst.sector.toLowerCase().includes(q))) {
              searchResults.push({
                  type: "Trade",
                  label: `Buy ${inst.symbol}`,
                  action: () => openTradeModal(inst.symbol, "BUY")
              });
              searchResults.push({
                  type: "Trade",
                  label: `Sell ${inst.symbol}`,
                  action: () => openTradeModal(inst.symbol, "SELL")
              });
          }
      });
  } else {
      // Default suggestions
      navItems.slice(0, 4).forEach(item => {
          searchResults.push({ type: "Navigation", ...item });
      });
  }

  const handleSelect = (action) => {
      action();
      setIsOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsOpen(false)} style={{alignItems: "flex-start", paddingTop: "10vh", zIndex: 9999}}>
      <div className="trade-modal" onClick={(e) => e.stopPropagation()} style={{maxWidth: "600px", background: "var(--color-surface)", border: "1px solid var(--color-border)", boxShadow: "0 20px 40px rgba(0,0,0,0.4)"}}>
        <div style={{padding: "var(--space-4)", borderBottom: "1px solid var(--color-border)"}}>
           <input
             ref={inputRef}
             type="text"
             className="form-control"
             placeholder="Type a command or search (e.g. 'buy rel', 'funds')"
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             style={{fontSize: "var(--text-lg)", background: "transparent", border: "none", boxShadow: "none", padding: 0}}
           />
        </div>
        
        <div style={{maxHeight: "400px", overflowY: "auto", padding: "var(--space-2)"}}>
           {searchResults.length === 0 ? (
               <div className="text-center text-muted" style={{padding: "var(--space-6)"}}>No results found.</div>
           ) : (
               searchResults.slice(0, 10).map((res, i) => (
                   <div 
                     key={i} 
                     onClick={() => handleSelect(res.action)}
                     style={{
                         padding: "var(--space-3) var(--space-4)",
                         cursor: "pointer",
                         display: "flex",
                         justifyContent: "space-between",
                         alignItems: "center",
                         borderRadius: "var(--radius-md)",
                     }}
                     onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-bg)"}
                     onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                   >
                      <span style={{fontWeight: "500"}}>{res.label}</span>
                      <span className="badge badge-secondary">{res.type}</span>
                   </div>
               ))
           )}
        </div>
      </div>
    </div>
  );
}

export default CommandPalette;
