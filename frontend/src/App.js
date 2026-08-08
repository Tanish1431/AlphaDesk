import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

// Layouts
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import DashboardLayout from "./components/dashboard/DashboardLayout";

// Landing Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PricingPage from "./pages/PricingPage";
import ProductsPage from "./pages/ProductsPage";
import SupportPage from "./pages/SupportPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

// Dashboard Pages
import OverviewPage from "./pages/dashboard/OverviewPage";
import HoldingsPage from "./pages/dashboard/HoldingsPage";
import OrdersPage from "./pages/dashboard/OrdersPage";
import PositionsPage from "./pages/dashboard/PositionsPage";
import TaxCenterPage from "./pages/dashboard/TaxCenterPage";
import TimeMachinePage from "./pages/dashboard/TimeMachinePage";
import FundsPage from "./pages/dashboard/FundsPage";
import SettingsPage from "./pages/dashboard/SettingsPage";

// Public Layout Wrapper
const PublicLayout = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <Routes>
      {/* Public Routes with Navbar/Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Dashboard Routes with Sidebar/Topbar */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<OverviewPage />} />
        <Route path="holdings" element={<HoldingsPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="positions" element={<PositionsPage />} />
        <Route path="tax" element={<TaxCenterPage />} />
        <Route path="time-machine" element={<TimeMachinePage />} />
        <Route path="funds" element={<FundsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<PublicLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
