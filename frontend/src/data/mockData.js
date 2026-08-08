export const watchlist = [
  { name: "AAPL", price: 189.84, percent: "+1.24%", isDown: false },
  { name: "MSFT", price: 417.52, percent: "+0.68%", isDown: false },
  { name: "GOOGL", price: 174.13, percent: "-0.42%", isDown: true },
  { name: "AMZN", price: 186.51, percent: "+1.87%", isDown: false },
  { name: "TSLA", price: 238.45, percent: "-2.15%", isDown: true },
  { name: "NVDA", price: 878.37, percent: "+3.24%", isDown: false },
  { name: "META", price: 505.76, percent: "+0.91%", isDown: false },
  { name: "JPM", price: 198.47, percent: "-0.33%", isDown: true },
  { name: "V", price: 282.61, percent: "+0.55%", isDown: false },
];

export const holdings = [
  { name: "AAPL", qty: 10, avg: 172.50, price: 189.84, net: "+10.05%", day: "+1.24%" },
  { name: "MSFT", qty: 5, avg: 380.20, price: 417.52, net: "+9.81%", day: "+0.68%" },
  { name: "GOOGL", qty: 8, avg: 165.80, price: 174.13, net: "+5.02%", day: "-0.42%", isLoss: true },
  { name: "AMZN", qty: 6, avg: 178.30, price: 186.51, net: "+4.60%", day: "+1.87%" },
  { name: "TSLA", qty: 4, avg: 255.10, price: 238.45, net: "-6.53%", day: "-2.15%", isLoss: true },
  { name: "NVDA", qty: 3, avg: 680.50, price: 878.37, net: "+29.08%", day: "+3.24%" },
  { name: "META", qty: 7, avg: 480.90, price: 505.76, net: "+5.17%", day: "+0.91%" },
  { name: "JPM", qty: 12, avg: 185.40, price: 198.47, net: "+7.05%", day: "-0.33%", isLoss: true },
  { name: "V", qty: 9, avg: 265.70, price: 282.61, net: "+6.36%", day: "+0.55%" },
];

export const positions = [
  { product: "MIS", name: "AAPL", qty: 5, avg: 188.20, price: 189.84, net: "+0.87%", day: "+1.24%", isLoss: false },
  { product: "MIS", name: "TSLA", qty: 3, avg: 242.50, price: 238.45, net: "-1.67%", day: "-2.15%", isLoss: true },
];
