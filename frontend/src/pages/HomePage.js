import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="landing-page">
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">Invest in everything</h1>
          <p className="hero-subtitle">
            Online platform to invest in stocks, derivatives, mutual funds, and more
          </p>
          <Link to="/signup" className="btn btn-primary btn-lg hero-cta">
            Sign up now
          </Link>
        </div>
        <div className="hero-image-wrapper">
          <div className="mock-browser">
            <div className="mock-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span style={{ fontSize: "11px", color: "#888", marginLeft: "12px", fontFamily: "var(--font-mono)" }}>alphadesks.com/dashboard</span>
            </div>
            <div className="mock-body" style={{ height: "360px", background: "var(--color-bg)" }}>
              <div className="mock-sidebar" style={{ width: "260px", background: "var(--color-surface)", borderRight: "1px solid var(--color-border)", padding: "16px", textAlign: "left" }}>
                <div style={{ fontSize: "12px", fontWeight: "600", color: "var(--color-text-muted)", textTransform: "uppercase", marginBottom: "12px" }}>Market Watch (NSE)</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", padding: "6px 8px", background: "var(--color-surface-hover)", borderRadius: "4px" }}>
                    <span style={{ fontWeight: "600" }}>RELIANCE</span>
                    <span style={{ color: "var(--color-success)", fontWeight: "500" }}>₹2,850.50 (+1.08%)</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", padding: "6px 8px" }}>
                    <span style={{ fontWeight: "600" }}>TCS</span>
                    <span style={{ color: "var(--color-danger)", fontWeight: "500" }}>₹3,950.25 (-0.75%)</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", padding: "6px 8px" }}>
                    <span style={{ fontWeight: "600" }}>HDFCBANK</span>
                    <span style={{ color: "var(--color-success)", fontWeight: "500" }}>₹1,530.15 (+1.98%)</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", padding: "6px 8px" }}>
                    <span style={{ fontWeight: "600" }}>INFY</span>
                    <span style={{ color: "var(--color-success)", fontWeight: "500" }}>₹1,480.80 (+2.12%)</span>
                  </div>
                </div>
              </div>
              <div className="mock-content" style={{ flex: 1, padding: "20px", display: "flex", flexDirection: "column", gap: "16px", textAlign: "left" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>Total Portfolio Value</span>
                    <div style={{ fontSize: "24px", fontWeight: "700", fontFamily: "var(--font-mono)", color: "var(--color-text)" }}>₹5,74,100.00</div>
                  </div>
                  <span className="badge badge-success" style={{ padding: "4px 8px", fontSize: "12px" }}>+₹12,450.00 (+2.21%) Today</span>
                </div>
                <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "6px", padding: "16px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--color-text-muted)", marginBottom: "8px" }}>
                    <span>Performance Curve</span>
                    <span style={{ color: "var(--color-primary)", fontWeight: "500" }}>All-Time High</span>
                  </div>
                  <svg viewBox="0 0 500 100" style={{ width: "100%", height: "80px", overflow: "visible" }}>
                    <defs>
                      <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#4184f3" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#4184f3" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,80 Q70,70 120,50 T240,45 T360,25 T500,10 L500,100 L0,100 Z" fill="url(#grad)" />
                    <path d="M0,80 Q70,70 120,50 T240,45 T360,25 T500,10" fill="none" stroke="#4184f3" strokeWidth="3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="feature-grid">
            <div className="feature-item">
              <h2 className="feature-title">Trust with confidence</h2>
              <p className="feature-desc">
                Built for the new generation of investors. We keep things simple, transparent, and absolutely secure.
              </p>
            </div>
            <div className="feature-item">
              <h2 className="feature-title">Unbeatable pricing</h2>
              <p className="feature-desc">
                We pioneered the discount broking model in India.
                Now, we are breaking ground with our powerful tech.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing-section">
        <div className="container">
          <div className="pricing-header">
            <h2>Unbeatable pricing</h2>
            <p>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
          </div>
          <div className="pricing-cards">
            <div className="price-box">
              <div className="price-val">₹0</div>
              <p>Free equity delivery and<br/>direct mutual funds</p>
            </div>
            <div className="price-box">
              <div className="price-val">₹20</div>
              <p>Intraday and F&O</p>
            </div>
          </div>
        </div>
      </section>

      <section className="open-account-section">
        <div className="container center-text">
          <h2>Open an AlphaDesks account</h2>
          <p className="text-muted" style={{ marginBottom: "30px", marginTop: "15px" }}>
            Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.
          </p>
          <Link to="/signup" className="btn btn-primary btn-lg">
            Sign up now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
