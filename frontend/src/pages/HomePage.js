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
          <img 
            src="/images/landing.png" 
            alt="Dashboard mockup" 
            className="hero-image"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div className="hero-fallback" style={{ display: 'none' }}>
            <div className="mock-browser">
              <div className="mock-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="mock-body">
                <div className="mock-sidebar"></div>
                <div className="mock-content">
                  <div className="mock-chart"></div>
                  <div className="mock-grid">
                    <div></div>
                    <div></div>
                  </div>
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
