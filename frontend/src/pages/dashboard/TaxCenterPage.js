import React, { useMemo } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { formatINR } from "../../utils/formatINR";

function TaxCenterPage() {
  const { holdings, loading } = usePortfolio();

  const taxSummary = useMemo(() => {
    let stcgAmount = 0;
    let ltcgAmount = 0;
    let stcgTax = 0;
    let ltcgTax = 0;

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const holdingsTax = holdings.map(h => {
        const curValue = h.price * h.qty;
        const invValue = h.avg * h.qty;
        const gain = curValue - invValue;
        
        const purchaseDate = new Date(h.purchaseDate || Date.now());
        const isLongTerm = purchaseDate < oneYearAgo;

        let taxRate = 0;
        let estimatedTax = 0;
        
        if (gain > 0) {
            if (isLongTerm) {
                taxRate = 10;
                // Simplified: assuming this asset's gain is above the 1 Lakh exemption for the portfolio
                // A real app would sum all LTCG first, subtract 1L, then apply 10%
                estimatedTax = gain * 0.10;
                ltcgAmount += gain;
                ltcgTax += estimatedTax;
            } else {
                taxRate = 15;
                estimatedTax = gain * 0.15;
                stcgAmount += gain;
                stcgTax += estimatedTax;
            }
        }

        return {
            ...h,
            gain,
            isLongTerm,
            taxRate,
            estimatedTax
        };
    });

    return {
        stcgAmount,
        ltcgAmount,
        stcgTax,
        ltcgTax,
        totalTax: stcgTax + ltcgTax,
        holdingsTax
    };
  }, [holdings]);

  if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;

  return (
    <div>
      <div className="page-header">
        <h1>Tax Center</h1>
        <p>Estimated tax liabilities based on current unrealized gains.</p>
      </div>

      <div className="grid-2">
         <div className="card">
            <h3 style={{fontSize: "var(--text-lg)", marginBottom: "var(--space-2)"}}>Short Term Capital Gains (STCG)</h3>
            <p className="text-secondary" style={{marginBottom: "var(--space-6)"}}>Assets held for less than 1 year. Taxed at 15%.</p>
            <div style={{fontSize: "var(--text-3xl)", fontWeight: "var(--weight-bold)", color: "var(--color-primary)", fontFamily: "var(--font-mono)"}}>
               {formatINR(taxSummary.stcgTax)}
            </div>
            <div className="text-muted" style={{marginTop: "var(--space-2)"}}>On estimated gains of {formatINR(taxSummary.stcgAmount)}</div>
         </div>
         <div className="card">
            <h3 style={{fontSize: "var(--text-lg)", marginBottom: "var(--space-2)"}}>Long Term Capital Gains (LTCG)</h3>
            <p className="text-secondary" style={{marginBottom: "var(--space-6)"}}>Assets held for more than 1 year. Taxed at 10% (over ₹1L).</p>
            <div style={{fontSize: "var(--text-3xl)", fontWeight: "var(--weight-bold)", color: "var(--color-primary)", fontFamily: "var(--font-mono)"}}>
               {formatINR(taxSummary.ltcgTax)}
            </div>
            <div className="text-muted" style={{marginTop: "var(--space-2)"}}>On estimated gains of {formatINR(taxSummary.ltcgAmount)}</div>
         </div>
      </div>

      <div className="card" style={{marginTop: "var(--space-6)"}}>
        <h3 style={{ marginBottom: "var(--space-4)", fontSize: "var(--text-lg)" }}>Unrealized Gains Breakdown</h3>
        <div className="table-scroll-hint">
          <span>⇄ Swipe horizontally to see all columns</span>
        </div>
        <div className="table-responsive">
          <table className="table table-sticky-first">
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Type</th>
                <th className="text-right">Unrealized Gain</th>
                <th className="text-right">Est. Tax Rate</th>
                <th className="text-right">Est. Tax Amount</th>
              </tr>
            </thead>
            <tbody>
              {taxSummary.holdingsTax.length === 0 ? (
                 <tr><td colSpan="5" className="text-center">No holdings available.</td></tr>
              ) : (
                taxSummary.holdingsTax.map((h, idx) => (
                  <tr key={idx}>
                    <td>{h.name}</td>
                    <td>
                        <span className={`badge ${h.isLongTerm ? 'badge-primary' : 'badge-secondary'}`}>
                           {h.isLongTerm ? 'LTCG' : 'STCG'}
                        </span>
                    </td>
                    <td className={`text-right ${h.gain > 0 ? 'text-success' : 'text-danger'}`}>
                        {h.gain > 0 ? '+' : ''}{formatINR(h.gain)}
                    </td>
                    <td className="text-right">{h.gain > 0 ? `${h.taxRate}%` : '-'}</td>
                    <td className="text-right">{h.gain > 0 ? formatINR(h.estimatedTax) : '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TaxCenterPage;
