import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";
import "./Layout.css";

const Layout = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Leads", path: "/leads" },
  ];

  return (
    <div className="app-container">

      {/* Overlay (Mobile) */}
      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>LeadPro</h2>
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`nav-item ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Section */}
      <div className="main-section">

        {/* Header */}
        <header className="top-header">
          <button
            className="menu-btn"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>

          <h1>
            {location.pathname === "/" ? "Dashboard" : "Leads Management"}
          </h1>

          <DarkModeToggle />
        </header>

        {/* Content */}
        <main className="main-content">
          <div className="content-wrapper">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
};

export default Layout;
