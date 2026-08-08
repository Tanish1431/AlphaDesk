// Indian digit grouping: ₹12,45,600.00
export function formatINR(amount, showSymbol = true) {
  const prefix = showSymbol ? '₹' : '';
  const num = Number(amount);
  if (isNaN(num)) return prefix + '0.00';
  const [intPart, decPart] = Math.abs(num).toFixed(2).split('.');
  // Indian grouping: last 3, then groups of 2
  let formatted = intPart.slice(-3);
  let remaining = intPart.slice(0, -3);
  while (remaining.length > 0) {
    formatted = remaining.slice(-2) + ',' + formatted;
    remaining = remaining.slice(0, -2);
  }
  return (num < 0 ? '-' : '') + prefix + formatted + '.' + decPart;
}
