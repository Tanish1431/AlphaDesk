import React from "react";
import { Link } from "react-router-dom";

function PricingPage() {
  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <h1>Transparent pricing for everyone.</h1>
          <p className="text-secondary">No hidden fees. No minimum balances.</p>
        </div>

        <div className="pricing-grid mb-8">
          <div className="pricing-card">
            <h3>Equity Delivery</h3>
            <div className="pricing-amount">₹0<span>/order</span></div>
            <p className="text-secondary mb-6">For long-term investments</p>
            <ul className="pricing-features">
              <li>Zero brokerage on equity investments</li>
              <li>No account maintenance fees</li>
              <li>Free direct mutual fund investments</li>
              <li>Basic charts and market screeners</li>
            </ul>
            <Link to="/signup" className="btn btn-secondary" style={{width: "100%", marginTop: "16px"}}>Open Free Account</Link>
          </div>
          
          <div className="pricing-card featured">
            <h3>Intraday & F&O</h3>
            <div className="pricing-amount">₹20<span>/order</span></div>
            <p className="text-secondary mb-6">For active traders</p>
            <ul className="pricing-features">
              <li>Flat fee per executed order</li>
              <li>Advanced charting with 100+ indicators</li>
              <li>Options chain and Greeks analysis</li>
              <li>API access for automated trading</li>
            </ul>
            <Link to="/signup" className="btn btn-primary" style={{width: "100%", marginTop: "16px"}}>Start Trading</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
