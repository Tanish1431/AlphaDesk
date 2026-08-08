import React, { useMemo } from "react";
import { usePortfolio } from "../../context/PortfolioContext";

function PortfolioHealth() {
  const { holdings } = usePortfolio();

  const health = useMemo(() => {
    let score = 100;
    const issues = [];
    
    if (holdings.length === 0) {
       return { score: 0, issues: ["No holdings found. Start investing!"] };
    }

    const totalValue = holdings.reduce((acc, h) => acc + (h.price * h.qty), 0);
    
    // Check Single Stock Concentration
    const maxStock = holdings.reduce((max, h) => {
        const val = h.price * h.qty;
        return val > max.val ? { name: h.name, val } : max;
    }, { name: "", val: 0 });
    
    if (maxStock.val / totalValue > 0.3) {
        score -= 20;
        issues.push(`High concentration in ${maxStock.name} (${((maxStock.val/totalValue)*100).toFixed(1)}%). Consider diversifying.`);
    }

    // Check Sector Concentration
    const sectorMap = holdings.reduce((acc, h) => {
        const val = h.price * h.qty;
        const sector = h.sector || "Other";
        acc[sector] = (acc[sector] || 0) + val;
        return acc;
    }, {});

    const maxSector = Object.entries(sectorMap).reduce((max, [sector, val]) => {
        return val > max.val ? { sector, val } : max;
    }, { sector: "", val: 0 });

    if (maxSector.val / totalValue > 0.4) {
        score -= 15;
        issues.push(`Overweight in ${maxSector.sector} sector (${((maxSector.val/totalValue)*100).toFixed(1)}%).`);
    }

    // Number of holdings
    if (holdings.length < 5) {
        score -= 15;
        issues.push("Portfolio is under-diversified (less than 5 stocks).");
    } else if (holdings.length > 25) {
        score -= 10;
        issues.push("Portfolio might be over-diversified, making it hard to track.");
    }

    return { score, issues };
  }, [holdings]);

  let colorClass = "text-success";
  if (health.score < 80) colorClass = "text-warning";
  if (health.score < 50) colorClass = "text-danger";

  return (
    <div className="card" style={{marginTop: "var(--space-6)"}}>
       <h3 style={{ marginBottom: "var(--space-4)", fontSize: "var(--text-lg)" }}>Portfolio Health</h3>
       
       <div style={{display: "flex", alignItems: "center", gap: "var(--space-6)"}}>
          <div style={{
              width: "100px", height: "100px", borderRadius: "50%", 
              display: "flex", justifyContent: "center", alignItems: "center",
              border: `6px solid var(--color-${health.score >= 80 ? 'success' : health.score >= 50 ? 'warning' : 'danger'})`,
              fontSize: "var(--text-2xl)", fontWeight: "var(--weight-bold)"
          }}>
             {health.score}
          </div>
          <div style={{flex: 1}}>
             {health.issues.length === 0 ? (
                 <p className="text-success">Your portfolio is well diversified and balanced!</p>
             ) : (
                 <ul style={{listStylePosition: "inside", color: "var(--color-text-muted)"}}>
                     {health.issues.map((issue, idx) => (
                         <li key={idx} style={{marginBottom: "var(--space-2)"}}>{issue}</li>
                     ))}
                 </ul>
             )}
          </div>
       </div>
    </div>
  );
}

export default PortfolioHealth;
