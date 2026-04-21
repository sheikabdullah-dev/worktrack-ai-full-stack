import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Meetings from "./pages/Meetings";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import MobileNav from "./components/layout/MobileNav";

export default function App() {
  return (
    <BrowserRouter>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>

      {/* Mobile Navigation (always visible) */}
      <MobileNav />

    </BrowserRouter>
  );
}