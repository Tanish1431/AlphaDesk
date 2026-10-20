import React from "react";

function ProductsPage() {
  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <h1>Products for every investor</h1>
          <p className="text-secondary">Explore the AlphaDesks ecosystem.</p>
        </div>
        
        <div className="feature-row">
           <div className="feature-row-content">
              <h3>AlphaTrade</h3>
              <p className="text-secondary">Our flagship trading platform. Fast, reliable, and intuitive. Whether you're a long-term investor or an active day trader, AlphaTrade provides all the tools you need in one unified interface.</p>
              <ul className="pricing-features">
                 <li>Real-time market data</li>
                 <li>Advanced charting powered by TradingView</li>
                 <li>One-click order execution</li>
              </ul>
           </div>
           <div className="feature-row-visual" style={{ background: "#ffffff", padding: "24px", display: "flex", flexDirection: "column", gap: "10px", border: "1px solid var(--color-border)", minHeight: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--color-border-light)", paddingBottom: "8px", width: "100%" }}>
                <span style={{ fontWeight: "600", fontSize: "14px" }}>RELIANCE (NSE)</span>
                <span className="badge badge-success">+1.08%</span>
              </div>
              <div style={{ fontSize: "22px", fontWeight: "700", fontFamily: "var(--font-mono)", width: "100%", textAlign: "left" }}>₹2,850.50</div>
              <div style={{ display: "flex", gap: "8px", marginTop: "8px", width: "100%" }}>
                <button className="btn btn-primary" style={{ padding: "6px 14px", fontSize: "12px" }}>BUY</button>
                <button className="btn btn-danger" style={{ padding: "6px 14px", fontSize: "12px" }}>SELL</button>
              </div>
           </div>
        </div>

        <div className="feature-row reverse">
           <div className="feature-row-content">
              <h3>AlphaAPI</h3>
              <p className="text-secondary">Build your own trading applications or run automated algorithmic strategies with our REST API. Execute trades, stream live market data, and manage your portfolio programmatically.</p>
              <ul className="pricing-features">
                 <li>Sub-10ms latency</li>
                 <li>WebSockets for live ticking data</li>
                 <li>Comprehensive documentation</li>
              </ul>
           </div>
           <div className="feature-row-visual" style={{ background: "#1e1e1e", color: "#d4d4d4", padding: "20px", borderRadius: "8px", fontFamily: "var(--font-mono)", fontSize: "12px", display: "block", textAlign: "left", overflowX: "auto" }}>
             <div style={{ color: "#6a9955", marginBottom: "8px" }}>{"// Execute a market buy order via REST API"}</div>
             <div><span style={{ color: "#569cd6" }}>const</span> response = <span style={{ color: "#569cd6" }}>await</span> fetch(<span style={{ color: "#ce9178" }}>'/api/orders'</span>, &#123;</div>
             <div style={{ paddingLeft: "16px" }}>method: <span style={{ color: "#ce9178" }}>'POST'</span>,</div>
             <div style={{ paddingLeft: "16px" }}>body: JSON.stringify(&#123; name: <span style={{ color: "#ce9178" }}>'RELIANCE'</span>, qty: <span style={{ color: "#b5cea8" }}>10</span>, mode: <span style={{ color: "#ce9178" }}>'BUY'</span> &#125;)</div>
             <div>&#125;);</div>
             <div style={{ color: "#4ec9b0", marginTop: "8px" }}>&#62; 201 Created &#123; status: "COMPLETE" &#125;</div>
           </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
