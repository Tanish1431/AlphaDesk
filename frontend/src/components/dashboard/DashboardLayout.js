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
            <div className="dashboard-content" style={{ overflowY: "auto", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <Outlet />
              </div>
              <div style={{ textAlign: "center", padding: "28px 0 16px 0", fontSize: "12px", fontStyle: "italic", fontWeight: "300", letterSpacing: "0.5px", color: "var(--color-text-muted)", borderTop: "1px solid var(--color-border-light)", marginTop: "32px" }}>
                Made by <span style={{ color: "var(--color-primary)", fontWeight: "400" }}>Tanish</span>
              </div>
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
