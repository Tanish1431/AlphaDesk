import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import TradeContext from "./TradeContext";

const API_BASE = "http://localhost:3002/api";

const PortfolioContext = createContext(null);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  const { closeTradeModal } = useContext(TradeContext);

  const [holdings, setHoldings] = useState([]);
  const [positions, setPositions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [funds, setFunds] = useState({ availableBalance: 0, transactions: [] });
  const [instruments, setInstruments] = useState([]);
  
  const [loading, setLoading] = useState(true);

  const fetchHoldings = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/holdings`);
      setHoldings(res.data);
    } catch (err) {
      console.error("Failed to fetch holdings", err);
    }
  }, []);

  const fetchPositions = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/positions`);
      setPositions(res.data);
    } catch (err) {
      console.error("Failed to fetch positions", err);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/orders`);
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  }, []);

  const fetchFunds = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/funds`);
      setFunds(res.data);
    } catch (err) {
      console.error("Failed to fetch funds", err);
    }
  }, []);

  const fetchInstruments = useCallback(async (isSilent = false) => {
    try {
      const res = await axios.get(`${API_BASE}/instruments`);
      setInstruments(res.data);
    } catch (err) {
      if (!isSilent) console.error("Failed to fetch instruments", err);
    }
  }, []);

  const refreshAll = useCallback(async () => {
    setLoading(true);
    await Promise.all([
      fetchHoldings(),
      fetchPositions(),
      fetchOrders(),
      fetchFunds(),
      fetchInstruments(false)
    ]);
    setLoading(false);
  }, [fetchHoldings, fetchPositions, fetchOrders, fetchFunds, fetchInstruments]);

  useEffect(() => {
    refreshAll();

    // Live Market Ticker: Refresh instrument ticks smoothly every 1.5 seconds
    const interval = setInterval(() => {
      fetchInstruments(true);
    }, 1500);

    return () => clearInterval(interval);
  }, [refreshAll, fetchInstruments]);

  const placeOrder = async (orderData) => {
    try {
      await axios.post(`${API_BASE}/orders`, orderData);
      closeTradeModal();
      await refreshAll(); // Invalidate and refetch immediately
      return { success: true };
    } catch (err) {
      console.error("Order failed", err);
      return { success: false, error: err.response?.data?.message || "Order failed" };
    }
  };

  return (
    <PortfolioContext.Provider value={{
      holdings, positions, orders, funds, instruments,
      loading,
      refreshAll, placeOrder
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioContext;
