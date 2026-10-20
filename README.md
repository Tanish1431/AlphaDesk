# AlphaDesks 📈

A modern, high-performance fintech trading and investment platform built on the **MERN** stack (MongoDB, Express, React, Node.js), inspired by Zerodha Kite's clean, minimalist, and responsive design.

---

## ✨ Features

- **Live Market Watch**: Real-time quotes for NSE blue chips (Reliance, TCS, HDFC Bank, Infosys, etc.) with responsive candlestick/price tracking.
- **Order Execution & Holdings**: Place Market/Limit BUY & SELL orders with live portfolio margin and fee deduction.
- **Interactive Visualizations & Analytics**:
  - **Asset Allocation**: Dynamic Chart.js doughnut chart breaking down portfolio holdings.
  - **Time Machine (SIP / Lumpsum Simulator)**: Backtest historical performance and CAGR with interactive trend line charts.
  - **Tax Center**: Real-time STCG (15%) and LTCG (10%) capital gains tax breakdown with exemption tracking.
  - **Portfolio Health & Trade Copilot**: Diversification scoring and automated risk insights.
- **Full Authentication**: User signup, login, JWT token management, and secure password hashing with bcrypt.
- **Off-White Design Theme**: Clean aesthetic with carefully balanced typography (Inter & JetBrains Mono), off-white canvas (`#f8f9fa`), and accessible contrast.

---

## 🏛️ Architecture

| Component | Stack | Default Port |
| :--- | :--- | :--- |
| **Frontend** | React 18, React Router v6, Chart.js, React-ChartJS-2 | `3000` |
| **Backend** | Node.js, Express, Mongoose, JWT, bcryptjs | `3002` |
| **Database** | MongoDB (Local fallback or Atlas cluster) | `27017` |

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18+ recommended)
- **MongoDB** (Local instance on `mongodb://127.0.0.1:27017` or MongoDB Atlas URI)

### 2. Install Dependencies
From the repository root, install dependencies for root, backend, and frontend in one step:
```bash
npm run install:all
```

### 3. Configure Environment Variables
Inside `backend/.env`:
```env
MONGO_URL=mongodb://127.0.0.1:27017/alphadesks
PORT=3002
JWT_SECRET=your_jwt_secret_key
```
*(The backend automatically falls back to your local MongoDB server if remote Atlas DNS is unreachable).*

### 4. Seed Demo Data
Populate real-market instruments, mock holdings, and initial balances:
```bash
node backend/seed/seed.js
```

### 5. Launch the Application
Start both frontend and backend concurrently:
```bash
npm start
```
- Open [http://localhost:3000](http://localhost:3000) to view the client app.
- Backend API runs on [http://localhost:3002/api](http://localhost:3002/api).

---

## 📁 Project Structure

```
├── backend/
│   ├── config/          # DB connection & JWT verification
│   ├── models/          # User, Holding, Order, Position, Fund, Instrument
│   ├── routes/          # Auth, Holdings, Orders, Funds, Instruments
│   ├── seed/            # Database initialization script
│   └── server.js        # Express app entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Dashboard, Charts, Navbar, Footer, Modals
│   │   ├── context/     # PortfolioContext & TradeContext
│   │   ├── pages/       # Public landing, Auth (Login/Signup), Dashboard pages
│   │   └── styles/      # Design system (variables, components, landing, dashboard)
│   └── public/
└── package.json         # Workspace scripts & Concurrently setup
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
