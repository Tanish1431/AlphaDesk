import React from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { formatINR } from "../../utils/formatINR";

function HoldingsPage() {
  const { holdings, instruments, loading } = usePortfolio();

  if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;

  return (
    <div>
      <div className="page-header">
        <h1>Holdings</h1>
        <p>Your long-term equity portfolio.</p>
      </div>

      <div className="card">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Instrument</th>
                <th className="text-right">Qty.</th>
                <th className="text-right">Avg. cost</th>
                <th className="text-right">LTP</th>
                <th className="text-right">Cur. val</th>
                <th className="text-right">P&L</th>
                <th className="text-right">Net chg.</th>
                <th className="text-right">Day chg.</th>
              </tr>
            </thead>
            <tbody>
              {holdings.length === 0 ? (
                 <tr><td colSpan="8" className="text-center">No holdings available.</td></tr>
              ) : (
                holdings.map((stock, index) => {
                  const inst = instruments.find(i => i.symbol === stock.name);
                  const ltp = inst ? inst.ltp : stock.price;
                  const dayChangePct = inst ? inst.dayChangePct : 0;
                  const curValue = ltp * stock.qty;
                  const invValue = stock.avg * stock.qty;
                  const pnl = curValue - invValue;
                  const pnlPct = invValue > 0 ? (pnl / invValue) * 100 : 0;
                  const isLoss = pnl < 0;
                  const isDayLoss = dayChangePct < 0;

                  return (
                    <tr key={index}>
                      <td style={{ fontWeight: "500" }}>{stock.name}</td>
                      <td className="text-right">{stock.qty}</td>
                      <td className="text-right">{formatINR(stock.avg)}</td>
                      <td className="text-right">{formatINR(ltp)}</td>
                      <td className="text-right">{formatINR(curValue)}</td>
                      <td className={`text-right ${isLoss ? "text-danger" : "text-success"}`}>
                        {formatINR(pnl)}
                      </td>
                      <td className={`text-right ${isLoss ? "text-danger" : "text-success"}`}>
                        {isLoss ? "" : "+"}{pnlPct.toFixed(2)}%
                      </td>
                      <td className={`text-right ${isDayLoss ? "text-danger" : "text-success"}`}>
                        {dayChangePct >= 0 ? "+" : ""}{dayChangePct.toFixed(2)}%
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

export default HoldingsPage;
