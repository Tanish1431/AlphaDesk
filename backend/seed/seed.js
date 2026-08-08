const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const Fund = require("../models/Fund");
const Holding = require("../models/Holding");
const Order = require("../models/Order");
const Position = require("../models/Position");
const Instrument = require("../models/Instrument");

// List of top Indian stocks
const topStocks = [
  { symbol: "RELIANCE", sector: "Energy", marketCap: "LARGE", ltp: 2850.50, prevClose: 2820.00 },
  { symbol: "TCS", sector: "IT", marketCap: "LARGE", ltp: 3950.25, prevClose: 3980.00 },
  { symbol: "HDFCBANK", sector: "Banking", marketCap: "LARGE", ltp: 1530.15, prevClose: 1500.50 },
  { symbol: "INFY", sector: "IT", marketCap: "LARGE", ltp: 1480.80, prevClose: 1450.00 },
  { symbol: "ICICIBANK", sector: "Banking", marketCap: "LARGE", ltp: 1080.45, prevClose: 1070.00 },
  { symbol: "SBIN", sector: "Banking", marketCap: "LARGE", ltp: 760.30, prevClose: 755.00 },
  { symbol: "BHARTIARTL", sector: "Telecom", marketCap: "LARGE", ltp: 1210.00, prevClose: 1195.50 },
  { symbol: "ITC", sector: "FMCG", marketCap: "LARGE", ltp: 420.75, prevClose: 425.00 },
  { symbol: "LT", sector: "Construction", marketCap: "LARGE", ltp: 3750.60, prevClose: 3710.00 },
  { symbol: "BAJFINANCE", sector: "Financial Services", marketCap: "LARGE", ltp: 7200.00, prevClose: 7150.00 },
  { symbol: "HINDUNILVR", sector: "FMCG", marketCap: "LARGE", ltp: 2240.25, prevClose: 2260.00 },
  { symbol: "AXISBANK", sector: "Banking", marketCap: "LARGE", ltp: 1050.50, prevClose: 1060.00 },
  { symbol: "TATAMOTORS", sector: "Automobile", marketCap: "LARGE", ltp: 980.40, prevClose: 960.00 },
  { symbol: "ZOMATO", sector: "Consumer Services", marketCap: "LARGE", ltp: 185.50, prevClose: 180.00 },
  { symbol: "PAYTM", sector: "Financial Services", marketCap: "MID", ltp: 410.25, prevClose: 425.00 },
  { symbol: "DMART", sector: "Retail", marketCap: "LARGE", ltp: 4500.80, prevClose: 4450.00 },
  { symbol: "SUNPHARMA", sector: "Pharma", marketCap: "LARGE", ltp: 1520.10, prevClose: 1510.00 },
  { symbol: "WIPRO", sector: "IT", marketCap: "LARGE", ltp: 470.50, prevClose: 465.00 },
  { symbol: "ADANIENT", sector: "Metals", marketCap: "LARGE", ltp: 3100.20, prevClose: 3050.00 },
  { symbol: "IRCTC", sector: "Consumer Services", marketCap: "MID", ltp: 950.40, prevClose: 940.00 }
];

async function seedDatabase() {
  try {
    const mongoURI = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/alphadesks";
    console.log("Connecting to MongoDB:", mongoURI);
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected successfully.");

    console.log("Clearing existing data...");
    await Fund.deleteMany({});
    await Holding.deleteMany({});
    await Order.deleteMany({});
    await Position.deleteMany({});
    await Instrument.deleteMany({});

    console.log("Seeding Instruments...");
    const instruments = topStocks.map(stock => {
      const dayChange = stock.ltp - stock.prevClose;
      const dayChangePct = (dayChange / stock.prevClose) * 100;
      
      // Generate some fake candles
      const candles = [];
      let currentPrice = stock.prevClose;
      for (let i = 30; i >= 0; i--) {
         const date = new Date();
         date.setDate(date.getDate() - i);
         const change = (Math.random() - 0.5) * (currentPrice * 0.02); // 2% daily volatility
         const open = currentPrice;
         const close = open + change;
         const high = Math.max(open, close) + (Math.random() * (open * 0.01));
         const low = Math.min(open, close) - (Math.random() * (open * 0.01));
         candles.push({ date, open, high, low, close, volume: Math.floor(Math.random() * 1000000) });
         currentPrice = close;
      }

      return {
        symbol: stock.symbol,
        exchange: "NSE",
        ltp: stock.ltp,
        prevClose: stock.prevClose,
        dayChange,
        dayChangePct,
        sector: stock.sector,
        marketCap: stock.marketCap,
        open: stock.ltp - (Math.random() * 10),
        high: stock.ltp + (Math.random() * 10),
        low: stock.ltp - (Math.random() * 20),
        volume: Math.floor(Math.random() * 5000000),
        candles
      };
    });
    await Instrument.insertMany(instruments);

    console.log("Seeding Funds...");
    const initialFunds = 500000;
    const fund = await Fund.create({
      availableBalance: initialFunds,
      openingBalance: initialFunds,
      transactions: [
        { type: "DEPOSIT", amount: initialFunds, description: "Initial UPI Deposit", date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
      ]
    });

    console.log("Seeding Holdings & Orders...");
    const demoHoldings = [
      { symbol: "RELIANCE", qty: 10, buyPrice: 2450.00, daysAgo: 45 },
      { symbol: "TCS", qty: 5, buyPrice: 3200.00, daysAgo: 60 },
      { symbol: "HDFCBANK", qty: 50, buyPrice: 1650.00, daysAgo: 20 },
      { symbol: "INFY", qty: 20, buyPrice: 1520.00, daysAgo: 15 },
      { symbol: "ZOMATO", qty: 200, buyPrice: 120.00, daysAgo: 90 },
      { symbol: "TATAMOTORS", qty: 40, buyPrice: 650.00, daysAgo: 120 },
      { symbol: "ITC", qty: 100, buyPrice: 410.00, daysAgo: 10 },
      { symbol: "IRCTC", qty: 30, buyPrice: 1050.00, daysAgo: 5 } // At a loss
    ];

    let usedMargin = 0;

    for (const h of demoHoldings) {
       const instrument = instruments.find(i => i.symbol === h.symbol);
       
       // Create order
       const orderValue = h.qty * h.buyPrice;
       usedMargin += orderValue;
       
       const orderDate = new Date();
       orderDate.setDate(orderDate.getDate() - h.daysAgo);

       await Order.create({
          name: h.symbol,
          qty: h.qty,
          price: h.buyPrice,
          mode: "BUY",
          status: "COMPLETE",
          orderType: "MARKET",
          createdAt: orderDate
       });

       fund.transactions.push({
          type: "TRADE",
          amount: -orderValue,
          description: `Bought ${h.qty} ${h.symbol}`,
          date: orderDate
       });

       // Create Holding
       await Holding.create({
          name: h.symbol,
          exchange: "NSE",
          qty: h.qty,
          avg: h.buyPrice,
          price: instrument.ltp,
          sector: instrument.sector,
          marketCap: instrument.marketCap,
          purchaseDate: orderDate
       });
    }

    fund.availableBalance -= usedMargin;
    await fund.save();

    console.log("Seeding Complete!");
    console.log(`Demo user has ${demoHoldings.length} holdings and ₹${fund.availableBalance} available cash.`);
    
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedDatabase();
