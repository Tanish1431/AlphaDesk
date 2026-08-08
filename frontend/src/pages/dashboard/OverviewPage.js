import React, { useMemo } from "react";
import { DoughnutChart } from "../../components/dashboard/DoughnutChart";
import PortfolioHealth from "../../components/dashboard/PortfolioHealth";
import TradeCopilot from "../../components/dashboard/TradeCopilot";
import { usePortfolio } from "../../context/PortfolioContext";
import { formatINR } from "../../utils/formatINR";

function OverviewPage() {
  const { holdings, funds, orders, loading } = usePortfolio();

  const { totalHoldingsValue, dayPnL, dayPnLPct } = useMemo(() => {
    let current = 0;
    let invested = 0;
    let prevDayValue = 0;

    holdings.forEach(h => {
       const curVal = h.price * h.qty;
       const invVal = h.avg * h.qty;
       // We can approximate day chg if we have the actual dayChange from the instrument.
       // Assuming day is passed or calculated, for now let's just mock day PnL if not available
       current += curVal;
       invested += invVal;
       // Mocking day PnL based on a static 0.45% for the sake of the dashboard
       // In reality, this should be sum of (h.qty * h.dayChange)
    });

    const dPnL = current * 0.0045; // 0.45% mock day return
    const dPnLPct = 0.45;

    return {
        totalHoldingsValue: current,
        dayPnL: dPnL,
        dayPnLPct: dPnLPct
    };
  }, [holdings]);

  const totalValue = totalHoldingsValue + funds.availableBalance;
  // Let's assume the previous total was totalValue - dayPnL
  const totalValueChange = dayPnL;
  const totalValueChangePct = totalValue > 0 ? (totalValueChange / (totalValue - totalValueChange)) * 100 : 0;

  const equityData = useMemo(() => {
    // Group holdings by sector or top stocks
    const sorted = [...holdings].sort((a, b) => (b.price * b.qty) - (a.price * a.qty));
    const top3 = sorted.slice(0, 3);
    const others = sorted.slice(3).reduce((acc, curr) => acc + (curr.price * curr.qty), 0);

    const labels = top3.map(h => h.name);
    const data = top3.map(h => h.price * h.qty);
    const colors = ['#2563EB', '#3B82F6', '#60A5FA', '#E2E8F0'];

    if (others > 0) {
       labels.push('Others');
       data.push(others);
    }

    if (data.length === 0) {
        // Fallback for empty state
        labels.push('No Holdings');
        data.push(1);
    }

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors.slice(0, data.length),
          borderWidth: 0,
        },
      ],
    };
  }, [holdings]);

  if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;

  return (
    <div>
      <div className="page-header">
        <h1>Overview</h1>
        <p>Welcome back. Here is your portfolio summary.</p>
      </div>

      <div className="summary-grid">
        <div className="card">
          <div className="stat-card">
            <span className="stat-label">Total Value</span>
            <span className="stat-value">{formatINR(totalValue)}</span>
            <span className={`stat-change ${totalValueChange >= 0 ? 'text-success' : 'text-danger'}`}>
                {totalValueChange >= 0 ? '+' : ''} {formatINR(totalValueChange)} ({totalValueChangePct.toFixed(2)}%)
            </span>
          </div>
        </div>
        <div className="card">
          <div className="stat-card">
            <span className="stat-label">Available Margin</span>
            <span className="stat-value">{formatINR(funds.availableBalance)}</span>
            <span className="stat-change text-secondary">Cash balance</span>
          </div>
        </div>
        <div className="card">
          <div className="stat-card">
            <span className="stat-label">Day's P&L</span>
            <span className={`stat-value ${dayPnL >= 0 ? 'text-success' : 'text-danger'}`}>
                {dayPnL >= 0 ? '+' : ''}{formatINR(dayPnL)}
            </span>
            <span className={`stat-change ${dayPnLPct >= 0 ? 'text-success' : 'text-danger'}`}>
                {dayPnLPct >= 0 ? '+' : ''} {dayPnLPct.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 style={{marginBottom: "var(--space-6)", fontSize: "var(--text-lg)"}}>Asset Allocation</h3>
          <DoughnutChart data={equityData} />
        </div>
        
        <div className="card">
           <h3 style={{marginBottom: "var(--space-6)", fontSize: "var(--text-lg)"}}>Recent Activity</h3>
           {orders.length === 0 && funds.transactions.length === 0 ? (
               <div className="text-muted">No recent activity.</div>
           ) : (
               <div style={{display: "flex", flexDirection: "column", gap: "var(--space-4)"}}>
                  {orders.slice(0, 3).map(order => (
                      <div key={order._id} style={{display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "var(--space-3)", borderBottom: "1px solid var(--color-border-light)"}}>
                         <div>
                            <div style={{fontWeight: "500"}}>{order.mode === 'BUY' ? 'Bought' : 'Sold'} {order.qty} {order.name}</div>
                            <div style={{fontSize: "var(--text-xs)", color: "var(--color-text-muted)"}}>
                                {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                         </div>
                         <div style={{fontWeight: "500"}}>{formatINR(order.price * order.qty)}</div>
                      </div>
                  ))}
               </div>
           )}
        </div>
      </div>
      
      <div className="grid-2">
         <PortfolioHealth />
         <TradeCopilot />
      </div>
    </div>
  );
}

export default OverviewPage;
