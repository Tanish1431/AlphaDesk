import React from "react";
import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <div className="section">
      <div className="container">
        <div className="section-header" style={{ maxWidth: "800px" }}>
          <h1 style={{ fontSize: "var(--text-4xl)", marginBottom: "var(--space-6)" }}>
            Democratizing finance for everyone.
          </h1>
          <p className="text-lg text-secondary">
            AlphaDesks was founded on a simple principle: investing should be
            accessible, transparent, and built on robust technology. We're on a
            mission to break down the barriers to wealth creation.
          </p>
        </div>
        
        <div style={{ padding: "var(--space-12) 0", borderTop: "1px solid var(--color-border)", marginTop: "var(--space-12)" }}>
           <h2 style={{ marginBottom: "var(--space-8)", textAlign: "center" }}>Our Core Values</h2>
           <div className="grid-3">
              <div className="card">
                 <h3 style={{marginBottom: "var(--space-3)"}}>Transparency</h3>
                 <p className="text-secondary">No hidden fees, no complex jargon. We believe in clear, straightforward communication with our users.</p>
              </div>
              <div className="card">
                 <h3 style={{marginBottom: "var(--space-3)"}}>Technology First</h3>
                 <p className="text-secondary">We build scalable, low-latency systems to ensure your trades execute smoothly, even in volatile markets.</p>
              </div>
              <div className="card">
                 <h3 style={{marginBottom: "var(--space-3)"}}>Client Centric</h3>
                 <p className="text-secondary">Every feature we build starts with user feedback. Your success in the markets is our success.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
