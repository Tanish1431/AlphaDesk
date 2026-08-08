import React, { useMemo } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { formatINR } from "../../utils/formatINR";

function TradeCopilot() {
  const { holdings, instruments } = usePortfolio();
  
  const analysis = useMemo(() => {
     if (holdings.length === 0) {
         return ["You have no holdings. Start by adding funds and exploring the market.", "Consider blue-chip stocks like RELIANCE, TCS, or HDFCBANK for a solid foundation."];
     }
     
     const insights = [];
     
     // 1. Top Gainer / Loser
     const sortedHoldings = [...holdings].sort((a, b) => {
         const pnlA = (a.price - a.avg) / a.avg;
         const pnlB = (b.price - b.avg) / b.avg;
         return pnlB - pnlA;
     });
     
     const top = sortedHoldings[0];
     const bottom = sortedHoldings[sortedHoldings.length - 1];
     
     const topReturn = ((top.price - top.avg) / top.avg) * 100;
     const bottomReturn = ((bottom.price - bottom.avg) / bottom.avg) * 100;

     if (topReturn > 5) {
         insights.push(`Your top performer is ${top.name}, up ${topReturn.toFixed(1)}%. Consider taking partial profits if it hits your target.`);
     }
     if (bottomReturn < -10) {
         insights.push(`${bottom.name} is down ${Math.abs(bottomReturn).toFixed(1)}%. Review the company's fundamentals to decide whether to average down or cut losses.`);
     }

     // 2. Sector concentration
     const totalValue = holdings.reduce((sum, h) => sum + (h.price * h.qty), 0);
     const sectorMap = {};
     holdings.forEach(h => {
         const s = h.sector || 'Other';
         sectorMap[s] = (sectorMap[s] || 0) + (h.price * h.qty);
     });
     
     let highestSector = "";
     let highestSectorPct = 0;
     for (const [sector, val] of Object.entries(sectorMap)) {
         const pct = val / totalValue;
         if (pct > highestSectorPct) {
             highestSectorPct = pct;
             highestSector = sector;
         }
     }
     
     if (highestSectorPct > 0.4) {
         insights.push(`You are heavily concentrated in the ${highestSector} sector (${(highestSectorPct * 100).toFixed(0)}%). Diversification could lower your portfolio risk.`);
     }
     
     // 3. Look for earnings dates
     let upcomingEarnings = 0;
     holdings.forEach(h => {
         const inst = instruments.find(i => i.symbol === h.name);
         if (inst && inst.upcomingEarningsDate) {
             const daysToEarnings = (new Date(inst.upcomingEarningsDate) - new Date()) / (1000 * 60 * 60 * 24);
             if (daysToEarnings > 0 && daysToEarnings < 15) {
                 upcomingEarnings++;
             }
         }
     });
     
     if (upcomingEarnings > 0) {
         insights.push(`Watch out! ${upcomingEarnings} of your holdings have quarterly earnings reports coming up in the next 15 days.`);
     }

     if (insights.length < 3) {
         insights.push("The market is currently experiencing average volatility. Stay focused on your long term strategy.");
     }
     
     return insights;
  }, [holdings, instruments]);

  return (
    <div className="card" style={{marginTop: "var(--space-6)", background: "linear-gradient(to right, rgba(88, 166, 255, 0.1), transparent)", border: "1px solid rgba(88, 166, 255, 0.2)"}}>
       <div style={{display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-4)"}}>
           <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
           </svg>
           <h3 style={{fontSize: "var(--text-lg)", color: "var(--color-primary)"}}>AI Trade Copilot</h3>
           <span className="badge badge-secondary" style={{marginLeft: "auto", fontSize: "0.7rem"}}>BETA</span>
       </div>
       
       <p className="text-secondary" style={{marginBottom: "var(--space-4)", fontSize: "var(--text-sm)"}}>
           Analysis is generated automatically based on your current portfolio structure. This is not investment advice.
       </p>
       
       <div style={{display: "flex", flexDirection: "column", gap: "var(--space-3)"}}>
           {analysis.map((insight, idx) => (
               <div key={idx} style={{display: "flex", gap: "var(--space-3)", alignItems: "flex-start", background: "var(--color-bg)", padding: "var(--space-3)", borderRadius: "var(--radius-md)"}}>
                  <div style={{color: "var(--color-primary)", marginTop: "2px"}}>✨</div>
                  <div style={{lineHeight: 1.5}}>{insight}</div>
               </div>
           ))}
       </div>
    </div>
  );
}

export default TradeCopilot;
