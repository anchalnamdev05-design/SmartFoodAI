
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AddItemInteractive from "./pages/AddItemInteractive";
import ItemsList from "./pages/ItemsList";
import Settings from "./pages/Settings";

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const getActivePage = () => {
    if (location.pathname === "/") return "dashboard";
    if (location.pathname === "/add") return "add";
    if (
      location.pathname === "/items" ||
      location.pathname === "/urgent"
    ) return "items";
    if (location.pathname === "/settings") return "settings";
    return "dashboard";
  };

  const [active, setActive] = useState(getActivePage);

  React.useEffect(() => {
    setActive(getActivePage());
  }, [location.pathname]);

  React.useEffect(() => {
    const handleAddItem = () => navigate("/add");
    const handleViewItems = () => navigate("/items");

    window.addEventListener("smartfoodai:add-item", handleAddItem);
    window.addEventListener("smartfoodai:view-items", handleViewItems);

    return () => {
      window.removeEventListener("smartfoodai:add-item", handleAddItem);
      window.removeEventListener("smartfoodai:view-items", handleViewItems);
    };
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f6f8f5",
      }}
    >
      <Sidebar active={active} setActive={setActive} />

      <main
        style={{
          flex: 1,
          minWidth: 0,
          minHeight: "100vh",
          overflowY: "auto",
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddItemInteractive />} />
          <Route path="/items" element={<ItemsList />} />
          <Route path="/urgent" element={<ItemsList urgent />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
