import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3002/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setError(data.message || "Failed to login");
      }
    } catch (err) {
      setError("Server error, please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" style={{display: "inline-block", marginBottom: "24px"}}>
            <div style={{display: "flex", alignItems: "center", gap: "8px", fontWeight: "bold", fontSize: "1.25rem", color: "var(--color-primary)"}}>
              <span className="brand-icon" style={{width: "28px", height: "28px", background: "var(--color-accent)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "6px", fontSize: "14px"}}>A</span>
              AlphaDesks
            </div>
          </Link>
          <h1>Welcome back</h1>
          <p className="text-secondary">Log in to your AlphaDesks account.</p>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          {error && <div style={{color: "var(--color-danger)", marginBottom: "16px", fontSize: "14px"}}>{error}</div>}
          
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input type="email" id="email" className="form-input" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <label className="form-label" htmlFor="password">Password</label>
              <a href="#forgot" className="text-xs text-accent">Forgot password?</a>
            </div>
            <input type="password" id="password" className="form-input" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button type="submit" className="btn btn-primary" style={{width: "100%", marginTop: "8px"}}>
            Log In
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
