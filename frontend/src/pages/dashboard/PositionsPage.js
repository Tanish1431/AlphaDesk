import React from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { formatINR } from "../../utils/formatINR";

function PositionsPage() {
  const { positions, loading } = usePortfolio();

  if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;

  return (
    <div>
      <div className="page-header">
        <h1>Positions</h1>
        <p>Your intraday and short-term trades.</p>
      </div>

      <div className="card">
        <div className="table-scroll-hint">
          <span>⇄ Swipe horizontally to see all columns</span>
        </div>
        <div className="table-responsive">
          <table className="table table-sticky-first">
            <thead>
              <tr>
                <th>Product</th>
                <th>Instrument</th>
                <th className="text-right">Qty.</th>
                <th className="text-right">Avg.</th>
                <th className="text-right">LTP</th>
                <th className="text-right">P&L</th>
                <th className="text-right">Chg.</th>
              </tr>
            </thead>
            <tbody>
              {positions.length === 0 ? (
                 <tr><td colSpan="7" className="text-center">No open positions.</td></tr>
              ) : (
                  positions.map((pos, index) => {
                    const pnl = (pos.price - pos.avg) * pos.qty;
                    const isLoss = pnl < 0;
                    
                    return (
                      <tr key={index}>
                        <td><span className="badge badge-primary">{pos.product || "MIS"}</span></td>
                        <td>{pos.name}</td>
                        <td className="text-right">{pos.qty}</td>
                        <td className="text-right">{formatINR(pos.avg)}</td>
                        <td className="text-right">{formatINR(pos.price)}</td>
                        <td className={`text-right ${isLoss ? "text-danger" : "text-success"}`}>
                          {formatINR(pnl)}
                        </td>
                        <td className={`text-right ${pos.day && pos.day.startsWith('-') ? "text-danger" : "text-success"}`}>
                          {pos.day || "+0.00%"}
                        </td>
                      </tr>
                    )
                  })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PositionsPage;
