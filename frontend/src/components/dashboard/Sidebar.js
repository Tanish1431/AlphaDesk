import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import AlphaLogo from "../common/AlphaLogo";

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // In a real app, clear auth tokens here
    navigate("/login");
  };

  const navItems = [
    { to: "/dashboard", label: "Overview", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
    )},
    { to: "/dashboard/holdings", label: "Holdings", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
    )},
    { to: "/dashboard/positions", label: "Positions", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
    )},
    { to: "/dashboard/orders", label: "Orders", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
    )},
    { to: "/dashboard/funds", label: "Funds", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
    )},
    { to: "/dashboard/tax", label: "Tax Center", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
    )},
    { to: "/dashboard/time-machine", label: "Time Machine", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
    )},
  ];

  const bottomNavItems = [
    { to: "/dashboard/settings", label: "Settings", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
    )}
  ];

  return (
    <>
      <div 
        className={`sidebar-backdrop ${isOpen ? "open" : ""}`} 
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-logo" style={{ justifyContent: "space-between" }}>
          <Link to="/dashboard" onClick={onClose} style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <AlphaLogo size={32} />
            <span style={{ fontWeight: "700", fontSize: "18px", color: "var(--color-text)", letterSpacing: "-0.5px" }}>AlphaDesks</span>
          </Link>
          <button
            onClick={onClose}
            className="hide-desktop"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px",
              color: "var(--color-text-muted)",
              display: "flex",
              alignItems: "center"
            }}
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

      <div className="sidebar-nav">
        <div className="sidebar-section-label">Main</div>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="sidebar-link"
            end={item.to === "/dashboard"}
            onClick={onClose}
          >
            <React.Fragment>
              {item.icon}
              {item.label}
            </React.Fragment>
          </NavLink>
        ))}

        <div className="sidebar-section-label" style={{ marginTop: "16px" }}>Support</div>
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="sidebar-link"
            onClick={onClose}
          >
            <React.Fragment>
              {item.icon}
              {item.label}
            </React.Fragment>
          </NavLink>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-user" onClick={handleLogout}>
          <div className="avatar avatar-sm">JD</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">John Doe</div>
            <div className="sidebar-user-email">Log out</div>
          </div>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: "var(--color-text-muted)"}}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
        </div>

        <div style={{ textAlign: "center", padding: "12px 0 4px 0", fontSize: "11px", fontStyle: "italic", fontWeight: "300", letterSpacing: "0.5px", color: "var(--color-text-muted)" }}>
          Made by <span style={{ color: "var(--color-primary)", fontWeight: "400" }}>Tanish</span>
        </div>
      </div>
    </aside>
    </>
  );
}

export default Sidebar;
