import React from "react";
import { Link } from "react-router-dom";
import AlphaLogo from "./AlphaLogo";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <AlphaLogo size={28} />
              <span style={{ fontWeight: "700", fontSize: "18px" }}>AlphaDesks</span>
            </div>
            <p className="footer-desc">
              A modern investment platform built for the next generation of
              investors. Trade stocks, mutual funds, and derivatives with
              transparent pricing and powerful tools.
            </p>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <Link to="/about">About</Link>
            <Link to="/products">Products</Link>
            <Link to="/pricing">Pricing</Link>
            <a href="/">Careers</a>
            <a href="/">Blog</a>
          </div>

          <div className="footer-column">
            <h4>Support</h4>
            <Link to="/support">Help Center</Link>
            <a href="/">Contact Us</a>
            <a href="/">API Docs</a>
            <a href="/">Status</a>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <a href="/">Privacy Policy</a>
            <a href="/">Terms of Service</a>
            <a href="/">Disclosures</a>
            <a href="/">Security</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AlphaDesks Inc. All rights reserved.</p>
          <p>
            Member FINRA / SIPC. Securities offered through AlphaDesks Financial LLC.
          </p>
          <div style={{ marginTop: "14px", fontStyle: "italic", fontWeight: "300", letterSpacing: "0.5px", fontSize: "13px", color: "var(--color-text-muted)" }}>
            Made by <span style={{ color: "var(--color-primary)", fontWeight: "400" }}>Tanish</span>
          </div>
        </div>

        <div className="footer-disclaimer">
          <p>
            Investments in securities market are subject to market risks. Past
            performance is not indicative of future results. Please read all
            related documents carefully before investing. AlphaDesks does not
            provide investment advice. All investments involve risk, including
            the possible loss of capital.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
