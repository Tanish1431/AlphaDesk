const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const Fund = require("../models/Fund");
const Holding = require("../models/Holding");
const Order = require("../models/Order");
const Position = require("../models/Position");
const Instrument = require("../models/Instrument");

// List of top Indian stocks across diversified sectors
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
  { symbol: "MARUTI", sector: "Automobile", marketCap: "LARGE", ltp: 12450.00, prevClose: 12380.00 },
  { symbol: "ZOMATO", sector: "Consumer Services", marketCap: "LARGE", ltp: 185.50, prevClose: 180.00 },
  { symbol: "PAYTM", sector: "Financial Services", marketCap: "MID", ltp: 410.25, prevClose: 425.00 },
  { symbol: "DMART", sector: "Retail", marketCap: "LARGE", ltp: 4500.80, prevClose: 4450.00 },
  { symbol: "SUNPHARMA", sector: "Pharma", marketCap: "LARGE", ltp: 1520.10, prevClose: 1510.00 },
  { symbol: "CIPLA", sector: "Pharma", marketCap: "LARGE", ltp: 1420.00, prevClose: 1405.00 },
  { symbol: "WIPRO", sector: "IT", marketCap: "LARGE", ltp: 470.50, prevClose: 465.00 },
  { symbol: "ADANIENT", sector: "Metals", marketCap: "LARGE", ltp: 3100.20, prevClose: 3050.00 },
  { symbol: "TATASTEEL", sector: "Metals", marketCap: "LARGE", ltp: 156.40, prevClose: 154.20 },
  { symbol: "COALINDIA", sector: "Mining", marketCap: "LARGE", ltp: 445.80, prevClose: 442.00 },
  { symbol: "IRCTC", sector: "Consumer Services", marketCap: "MID", ltp: 950.40, prevClose: 940.00 },
  { symbol: "JIOFIN", sector: "Financial Services", marketCap: "LARGE", ltp: 355.20, prevClose: 348.00 }
];

async function seedDatabase() {
  try {
    const remoteURI = process.env.MONGO_URL;
    const localURI = "mongodb://127.0.0.1:27017/alphadesks";
    let connected = false;

    if (remoteURI) {
      try {
        console.log("Connecting to remote MongoDB...");
        await mongoose.connect(remoteURI, { serverSelectionTimeoutMS: 5000 });
        console.log("Connected successfully to remote MongoDB.");
        connected = true;
      } catch (err) {
        console.warn(`Remote MongoDB connection failed (${err.message}). Falling back to local MongoDB...`);
      }
    }

    if (!connected) {
      console.log(`Connecting to local MongoDB: ${localURI}`);
      await mongoose.connect(localURI);
      console.log("Connected successfully to local MongoDB.");
    }

    console.log("Clearing existing data...");
    await Fund.deleteMany({});
    await Holding.deleteMany({});
    await Order.deleteMany({});
    await Position.deleteMany({});
    await Instrument.deleteMany({});

    console.log("Seeding Instruments...");
    const instruments = topStocks.map(stock => {
      const dayChange = +(stock.ltp - stock.prevClose).toFixed(2);
      const dayChangePct = +((dayChange / stock.prevClose) * 100).toFixed(2);
      
      const candles = [];
      let currentPrice = stock.prevClose;
      for (let i = 30; i >= 0; i--) {
         const date = new Date();
         date.setDate(date.getDate() - i);
         const change = (Math.random() - 0.5) * (currentPrice * 0.02);
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
        open: +(stock.ltp - (Math.random() * 8)).toFixed(2),
        high: +(stock.ltp + (Math.random() * 12)).toFixed(2),
        low: +(stock.ltp - (Math.random() * 15)).toFixed(2),
        volume: Math.floor(Math.random() * 4000000 + 500000),
        candles
      };
    });
    await Instrument.insertMany(instruments);

    console.log("Seeding Funds...");
    const initialFunds = 750000;
    const fund = await Fund.create({
      availableBalance: initialFunds,
      openingBalance: initialFunds,
      transactions: [
        { type: "DEPOSIT", amount: initialFunds, description: "HDFC NetBanking Deposit", date: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000) }
      ]
    });

    console.log("Seeding Holdings & Orders...");
    const demoHoldings = [
      { symbol: "RELIANCE", qty: 15, buyPrice: 2450.00, daysAgo: 140 },
      { symbol: "TCS", qty: 8, buyPrice: 3200.00, daysAgo: 210 },
      { symbol: "HDFCBANK", qty: 60, buyPrice: 1420.00, daysAgo: 95 },
      { symbol: "INFY", qty: 35, buyPrice: 1380.00, daysAgo: 60 },
      { symbol: "TATAMOTORS", qty: 80, buyPrice: 620.00, daysAgo: 180 },
      { symbol: "ITC", qty: 150, buyPrice: 390.00, daysAgo: 45 },
      { symbol: "ZOMATO", qty: 300, buyPrice: 110.00, daysAgo: 120 },
      { symbol: "BAJFINANCE", qty: 10, buyPrice: 6800.00, daysAgo: 30 },
      { symbol: "SUNPHARMA", qty: 25, buyPrice: 1460.00, daysAgo: 25 },
      { symbol: "TATASTEEL", qty: 200, buyPrice: 140.00, daysAgo: 15 },
      { symbol: "JIOFIN", qty: 100, buyPrice: 330.00, daysAgo: 10 },
      { symbol: "IRCTC", qty: 40, buyPrice: 1010.00, daysAgo: 5 } // At slight loss for realism
    ];

    let usedMargin = 0;

    for (const h of demoHoldings) {
       const instrument = instruments.find(i => i.symbol === h.symbol);
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
          description: `Bought ${h.qty} ${h.symbol} (CNC)`,
          date: orderDate
       });

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

    console.log("Seeding Intraday Positions (F&O / MIS)...");
    const demoPositions = [
      {
        product: "MIS",
        name: "NIFTY 22500 CE",
        qty: 150,
        avg: 124.50,
        price: 148.20,
        net: "+19.03%",
        day: "+19.03%",
        isLoss: false
      },
      {
        product: "MIS",
        name: "BANKNIFTY 48000 PE",
        qty: 45,
        avg: 240.00,
        price: 215.50,
        net: "-10.20%",
        day: "-10.20%",
        isLoss: true
      },
      {
        product: "MIS",
        name: "TATASTEEL",
        qty: 500,
        avg: 154.50,
        price: 156.40,
        net: "+1.23%",
        day: "+1.23%",
        isLoss: false
      }
    ];

    await Position.insertMany(demoPositions);

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
