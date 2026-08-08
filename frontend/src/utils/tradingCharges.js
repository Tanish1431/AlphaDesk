export function calculateCharges({ qty, price, mode, orderType, product }) {
  const orderValue = qty * price;
  if (orderValue === 0) {
    return {
      brokerage: 0,
      stt: 0,
      exchangeCharges: 0,
      gst: 0,
      sebiCharges: 0,
      stampDuty: 0,
      totalCharges: 0,
      totalAmount: 0
    };
  }

  // Simplified logic based on Zerodha charges
  // Equity Delivery (CNC)
  // Brokerage: Zero
  // STT: 0.1% on buy & sell
  // Exchange txn charge: 0.00345%
  // GST: 18% on (brokerage + exchange txn charge)
  // SEBI charges: ₹10 / crore
  // Stamp duty: 0.015% or ₹1500 / crore on buy side

  let brokerage = 0; // Assuming delivery is free, intraday would be Math.min(20, orderValue * 0.0003)
  
  let stt = 0;
  if (product === "CNC") {
      stt = orderValue * 0.001; // 0.1%
  } else {
      stt = mode === "SELL" ? orderValue * 0.00025 : 0;
  }

  const exchangeCharges = orderValue * 0.0000345;
  const gst = (brokerage + exchangeCharges) * 0.18;
  const sebiCharges = orderValue * 0.000001; // ₹10 per crore

  let stampDuty = 0;
  if (mode === "BUY") {
      stampDuty = orderValue * 0.00015;
  }

  const totalCharges = brokerage + stt + exchangeCharges + gst + sebiCharges + stampDuty;
  
  const totalAmount = mode === "BUY" 
    ? orderValue + totalCharges 
    : orderValue - totalCharges; // If selling, you receive less

  return {
    brokerage,
    stt,
    exchangeCharges,
    gst,
    sebiCharges,
    stampDuty,
    totalCharges,
    totalAmount
  };
}
