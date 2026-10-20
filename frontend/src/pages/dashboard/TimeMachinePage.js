import React, { useState, useMemo } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { formatINR } from "../../utils/formatINR";
import { LineChart } from "../../components/dashboard/LineChart";

function TimeMachinePage() {
  const { instruments, loading } = usePortfolio();
  
  const [selectedSymbol, setSelectedSymbol] = useState("RELIANCE");
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [monthsAgo, setMonthsAgo] = useState(12);

  const analysis = useMemo(() => {
     if (!instruments || instruments.length === 0) return null;
     
     const instrument = instruments.find(i => i.symbol === selectedSymbol) || instruments[0];
     if (!instrument) return null;

     const baseAnnualReturn = 0.15;
     const years = monthsAgo / 12;
     const estimatedReturn = Math.pow(1 + baseAnnualReturn, years) - 1;
     
     const pastPrice = instrument.ltp / (1 + estimatedReturn);
     const qty = investmentAmount / pastPrice;
     const currentVal = qty * instrument.ltp;
     const profit = currentVal - investmentAmount;
     const profitPct = (profit / investmentAmount) * 100;
     const cagr = (Math.pow(currentVal / investmentAmount, 1 / years) - 1) * 100;

     // Generate live chart data
     const chartData = [];
     const dataPoints = Math.min(monthsAgo, 36); // show up to 36 points
     const intervalMonths = monthsAgo / dataPoints;
     
     let simulatedValue = investmentAmount;
     let currentDate = new Date();
     currentDate.setMonth(currentDate.getMonth() - monthsAgo);

     for (let i = 0; i <= dataPoints; i++) {
        // Add some random walk volatility around the trend line
        const progress = i / dataPoints; // 0 to 1
        const expectedValueAtStep = investmentAmount * Math.pow(1 + baseAnnualReturn, years * progress);
        
        // Random volatility factor (-5% to +5% max variance from trend, scaling down at endpoints)
        const volatility = 1 + ((Math.random() - 0.5) * 0.1 * Math.sin(progress * Math.PI));
        
        // Force the last point to be exactly the current value
        const val = i === dataPoints ? currentVal : expectedValueAtStep * volatility;
        
        chartData.push({
           date: currentDate.toLocaleDateString('default', { month: 'short', year: '2-digit' }),
           value: val
        });
        
        currentDate.setMonth(currentDate.getMonth() + intervalMonths);
     }

     return {
        instrument,
        pastPrice,
        currentPrice: instrument.ltp,
        qty,
        currentVal,
        profit,
        profitPct,
        annualizedReturn: cagr,
        chartData
     };
  }, [instruments, selectedSymbol, investmentAmount, monthsAgo]);

  if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;

  return (
    <div>
      <div className="page-header">
        <h1>Time Machine</h1>
        <p>What if you had invested in the past? See the simulated returns.</p>
      </div>

      <div className="card mb-8">
         <div className="grid-3" style={{gap: "var(--space-6)"}}>
            <div>
               <label className="form-label">Instrument</label>
               <select 
                  className="form-control" 
                  value={selectedSymbol} 
                  onChange={(e) => setSelectedSymbol(e.target.value)}
               >
                  {instruments.map(i => <option key={i.symbol} value={i.symbol}>{i.symbol}</option>)}
               </select>
            </div>
            <div>
               <label className="form-label">Amount (₹)</label>
               <input 
                  type="number" 
                  className="form-control" 
                  value={investmentAmount} 
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
               />
            </div>
            <div>
               <label className="form-label">Timeframe</label>
               <select 
                  className="form-control" 
                  value={monthsAgo} 
                  onChange={(e) => setMonthsAgo(Number(e.target.value))}
               >
                  <option value={6}>6 Months Ago</option>
                  <option value={12}>1 Year Ago</option>
                  <option value={36}>3 Years Ago</option>
                  <option value={60}>5 Years Ago</option>
                  <option value={120}>10 Years Ago</option>
               </select>
            </div>
         </div>
      </div>

      {analysis && (
          <div className="grid-2">
             <div className="card" style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "var(--space-6)"}}>
                <h3 className="text-secondary" style={{marginBottom: "var(--space-2)", fontSize: "clamp(0.9rem, 2.5vw, 1.125rem)"}}>If you invested {formatINR(investmentAmount)} in {analysis.instrument.symbol} {monthsAgo / 12} years ago</h3>
                <p style={{marginBottom: "var(--space-4)", fontSize: "var(--text-sm)"}}>At a price of {formatINR(analysis.pastPrice)}</p>
                
                <h2 style={{fontSize: "clamp(1.4rem, 4vw, 2.25rem)", fontFamily: "var(--font-mono)", marginBottom: "var(--space-2)", lineHeight: 1.3}}>
                    It would be worth {formatINR(analysis.currentVal)}
                </h2>
                
                <div style={{fontSize: "clamp(1.1rem, 3vw, 1.25rem)", fontWeight: "500", marginTop: "var(--space-3)"}} className={`text-${analysis.profit >= 0 ? 'success' : 'danger'}`}>
                    {analysis.profit >= 0 ? '+' : ''}{formatINR(analysis.profit)} ({analysis.profitPct.toFixed(2)}%)
                </div>
                <div className="text-muted" style={{marginTop: "var(--space-2)", fontSize: "var(--text-sm)"}}>
                    {analysis.annualizedReturn.toFixed(2)}% CAGR
                </div>
             </div>
             
             <div className="card">
                <h3 style={{marginBottom: "var(--space-6)", fontSize: "var(--text-lg)"}}>Investment Growth</h3>
                <LineChart 
                   data={analysis.chartData} 
                   color={analysis.profit >= 0 ? "rgba(76, 175, 80, 1)" : "rgba(223, 81, 76, 1)"}
                   bgColor={analysis.profit >= 0 ? "rgba(76, 175, 80, 0.1)" : "rgba(223, 81, 76, 0.1)"}
                />
             </div>
          </div>
      )}
    </div>
  );
}

export default TimeMachinePage;
