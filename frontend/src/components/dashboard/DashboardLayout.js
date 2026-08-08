import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import WatchList from "./WatchList";
import TradeModal from "./TradeModal";
import CommandPalette from "./CommandPalette";
import { TradeProvider } from "../../context/TradeContext";
import { PortfolioProvider } from "../../context/PortfolioContext";

function DashboardLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <TradeProvider>
      <PortfolioProvider>
        <div className="dashboard-layout">
        <Sidebar isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />
        
        <div className="dashboard-main">
          <TopBar toggleSidebar={toggleSidebar} />
          
          <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
            <div className="dashboard-content" style={{ overflowY: "auto" }}>
              <Outlet />
            </div>
            <WatchList />
          </div>
        </div>
        
        <TradeModal />
        <CommandPalette />
      </div>
      </PortfolioProvider>
    </TradeProvider>
  );
}

export default DashboardLayout;
