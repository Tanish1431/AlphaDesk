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
           <div className="feature-row-visual">
              <div style={{textAlign: "center", color: "var(--color-text-muted)"}}>AlphaTrade Dashboard Preview</div>
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
           <div className="feature-row-visual">
              <div style={{textAlign: "center", color: "var(--color-text-muted)"}}>AlphaAPI Code Snippet Preview</div>
           </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
