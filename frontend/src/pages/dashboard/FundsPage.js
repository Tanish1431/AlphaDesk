import React from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { formatINR } from "../../utils/formatINR";

function FundsPage() {
  const { funds, loading } = usePortfolio();

  if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;

  return (
    <div>
      <div className="page-header">
        <h1>Funds</h1>
        <p>Manage your account balance and margins.</p>
      </div>

      <div className="grid-2">
        <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "var(--space-6)" }}>
          <h2 style={{ fontSize: "clamp(1.6rem, 5vw, 2.25rem)", marginBottom: "var(--space-2)", fontFamily: "var(--font-mono)", textAlign: "center" }}>{formatINR(funds.availableBalance)}</h2>
          <p className="text-secondary" style={{ marginBottom: "var(--space-5)" }}>Available Margin</p>
          
          <div style={{ display: "flex", gap: "var(--space-3)", width: "100%", maxWidth: "320px" }}>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => alert("Deposit feature coming soon.")}>Add Funds</button>
            <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => alert("Withdraw feature coming soon.")}>Withdraw</button>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: "var(--space-3)", fontSize: "var(--text-lg)" }}>Recent Transactions</h3>
          <div className="table-scroll-hint">
            <span>⇄ Swipe horizontally to see all columns</span>
          </div>
          <div className="table-responsive">
            <table className="table table-sticky-first">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th className="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {funds.transactions && funds.transactions.length > 0 ? (
                  [...funds.transactions].reverse().slice(0, 5).map((tx, idx) => (
                    <tr key={idx}>
                      <td className="text-muted">{new Date(tx.date).toLocaleDateString()}</td>
                      <td>
                         <span className={`badge ${tx.type === 'DEPOSIT' || tx.type === 'WITHDRAWAL' ? 'badge-primary' : 'badge-secondary'}`}>
                           {tx.type}
                         </span>
                      </td>
                      <td>{tx.description}</td>
                      <td className={`text-right ${tx.amount > 0 ? 'text-success' : 'text-danger'} font-mono`}>
                        {tx.amount > 0 ? '+' : ''}{formatINR(tx.amount)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4" className="text-center">No transactions yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FundsPage;
