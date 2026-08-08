import React from "react";
import { Link } from "react-router-dom";

function SupportPage() {
  return (
    <div className="section">
      <div className="container">
        <div className="section-header">
          <h1>How can we help?</h1>
          <p className="text-secondary">Search our knowledge base or contact support.</p>
          
          <div style={{marginTop: "var(--space-8)", maxWidth: "500px", margin: "var(--space-8) auto 0"}}>
             <input type="text" className="form-input" placeholder="Search for articles, topics, or features..." style={{padding: "var(--space-4)", fontSize: "var(--text-base)", borderRadius: "var(--radius-full)"}} />
          </div>
        </div>

        <div className="grid-3 mt-12">
           <div className="card card-interactive">
              <h3 style={{fontSize: "var(--text-lg)", marginBottom: "var(--space-2)"}}>Account Opening</h3>
              <p className="text-secondary text-sm">Everything you need to know about setting up your AlphaDesks account.</p>
           </div>
           <div className="card card-interactive">
              <h3 style={{fontSize: "var(--text-lg)", marginBottom: "var(--space-2)"}}>Funding</h3>
              <p className="text-secondary text-sm">Deposits, withdrawals, and margin requirements.</p>
           </div>
           <div className="card card-interactive">
              <h3 style={{fontSize: "var(--text-lg)", marginBottom: "var(--space-2)"}}>Trading Platform</h3>
              <p className="text-secondary text-sm">Guides on using AlphaTrade, chart setups, and order types.</p>
           </div>
        </div>
        
        <div className="cta-section" style={{marginTop: "var(--space-16)", background: "transparent", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)"}}>
           <h2>Still need help?</h2>
           <p className="text-secondary" style={{marginBottom: "var(--space-6)"}}>Our support team is available 24/7 to assist you.</p>
           <button className="btn btn-primary">Contact Support</button>
        </div>
      </div>
    </div>
  );
}

export default SupportPage;
