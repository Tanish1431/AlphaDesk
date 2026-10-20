require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const holdingsRoutes = require("./routes/holdings");
const ordersRoutes = require("./routes/orders");
const positionsRoutes = require("./routes/positions");
const fundsRoutes = require("./routes/funds");
const instrumentsRoutes = require("./routes/instruments");

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/holdings", holdingsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/positions", positionsRoutes);
app.use("/api/funds", fundsRoutes);
app.use("/api/instruments", instrumentsRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "AlphaDesks API" });
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`AlphaDesks API running on port ${PORT}`);
  });
};

startServer();
