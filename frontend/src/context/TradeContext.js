import React, { useState, createContext } from "react";

const TradeContext = createContext({
  openTradeModal: (uid, mode) => {},
  closeTradeModal: () => {},
  isTradeModalOpen: false,
  tradeStock: "",
  tradeMode: "BUY",
});

export const TradeProvider = ({ children }) => {
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [tradeStock, setTradeStock] = useState("");
  const [tradeMode, setTradeMode] = useState("BUY");

  const openTradeModal = (uid, mode = "BUY") => {
    setTradeStock(uid);
    setTradeMode(mode);
    setIsTradeModalOpen(true);
  };

  const closeTradeModal = () => {
    setIsTradeModalOpen(false);
    setTradeStock("");
  };

  return (
    <TradeContext.Provider
      value={{
        openTradeModal,
        closeTradeModal,
        isTradeModalOpen,
        tradeStock,
        tradeMode,
      }}
    >
      {children}
    </TradeContext.Provider>
  );
};

export default TradeContext;
