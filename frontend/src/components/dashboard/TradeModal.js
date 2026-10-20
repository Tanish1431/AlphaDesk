import React, { useContext, useState, useMemo } from "react";
import TradeContext from "../../context/TradeContext";
import { usePortfolio } from "../../context/PortfolioContext";
import { calculateCharges } from "../../utils/tradingCharges";
import { formatINR } from "../../utils/formatINR";

function TradeModal() {
  const { isTradeModalOpen, closeTradeModal, tradeStock, tradeMode } = useContext(TradeContext);
  const { placeOrder, instruments } = usePortfolio();
  
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0);
  const [orderType, setOrderType] = useState("MARKET"); // MARKET or LIMIT
  const [error, setError] = useState(null);

  // Auto-fill price with LTP if MARKET order and we have the instrument
  React.useEffect(() => {
    if (isTradeModalOpen && tradeStock) {
      const instrument = instruments.find(i => i.symbol === tradeStock);
      if (instrument) {
         setPrice(instrument.ltp);
      }
      setQty(1);
      setError(null);
    }
  }, [isTradeModalOpen, tradeStock, instruments]);

  const charges = useMemo(() => {
     return calculateCharges({ qty: Number(qty) || 0, price: Number(price) || 0, mode: tradeMode, orderType, product: "CNC" });
  }, [qty, price, tradeMode, orderType]);

  if (!isTradeModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    const result = await placeOrder({
        name: tradeStock,
        qty: Number(qty),
        price: Number(price),
        mode: tradeMode,
        orderType
    });

    if (!result.success) {
        setError(result.error);
    }
  };

  const isBuy = tradeMode === "BUY";
  
  // Use CSS styles instead of inline for modal overlay/container
  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) closeTradeModal(); }}>
      <div className="trade-modal">
        <div className="trade-modal-header">
          <div className="trade-modal-title">
            <span className={isBuy ? "text-accent" : "text-danger"}>{isBuy ? "Buy" : "Sell"}</span> {tradeStock}
          </div>
          <button onClick={closeTradeModal} style={{background: "none", border: "none", cursor: "pointer"}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <input 
              type="radio" 
              name="orderType" 
              checked={orderType === "MARKET"} 
              onChange={() => setOrderType("MARKET")} 
            />
            <span className="text-sm">Market</span>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <input 
              type="radio" 
              name="orderType" 
              checked={orderType === "LIMIT"} 
              onChange={() => setOrderType("LIMIT")} 
            />
            <span className="text-sm">Limit</span>
          </label>
        </div>

        {error && (
            <div style={{ marginBottom: "16px", padding: "12px", background: "var(--color-danger-light)", color: "var(--color-danger)", borderRadius: "var(--radius-md)", fontSize: "var(--text-sm)" }}>
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="trade-modal-inputs">
            <div className="form-group">
              <label className="form-label">Quantity</label>
              <input 
                type="number" 
                className="form-input" 
                value={qty} 
                onChange={(e) => setQty(e.target.value)} 
                min="1"
                required 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Price</label>
              <input 
                type="number" 
                className="form-input" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                disabled={orderType === "MARKET"}
                step="0.01"
                placeholder={orderType === "MARKET" ? "Market Price" : "0.00"}
              />
            </div>
          </div>

          <div style={{ marginBottom: "16px", padding: "12px", background: "var(--color-surface)", borderRadius: "var(--radius-md)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "var(--text-sm)" }}>
                  <span className="text-secondary">Brokerage</span>
                  <span>{formatINR(charges.brokerage, false)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "var(--text-sm)" }}>
                  <span className="text-secondary">STT / CTT</span>
                  <span>{formatINR(charges.stt, false)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "var(--text-sm)" }}>
                  <span className="text-secondary">Exchange txn charge</span>
                  <span>{formatINR(charges.exchangeCharges, false)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "var(--text-sm)" }}>
                  <span className="text-secondary">GST (18%)</span>
                  <span>{formatINR(charges.gst, false)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "var(--text-sm)" }}>
                  <span className="text-secondary">SEBI charges</span>
                  <span>{formatINR(charges.sebiCharges, false)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "var(--text-sm)" }}>
                  <span className="text-secondary">Stamp duty</span>
                  <span>{formatINR(charges.stampDuty, false)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "8px", borderTop: "1px solid var(--color-border)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-semibold)" }}>
                  <span>Total Charges</span>
                  <span>{formatINR(charges.totalCharges)}</span>
              </div>
          </div>

          <div className="trade-modal-footer">
            <div className="trade-modal-margin">
              Margin required: <strong style={{ color: "var(--color-text)", fontSize: "var(--text-base)" }}>{formatINR(charges.totalAmount)}</strong>
            </div>
            <div className="trade-modal-actions">
              <button type="button" className="btn btn-secondary" onClick={closeTradeModal}>
                Cancel
              </button>
              <button type="submit" className={`btn ${isBuy ? "btn-primary" : "btn-danger"}`}>
                {isBuy ? "Buy" : "Sell"} {tradeStock}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TradeModal;
