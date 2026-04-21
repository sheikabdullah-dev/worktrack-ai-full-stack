import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Tasks from "./pages/Tasks"
import Meetings from "./pages/Meetings"
import Reports from "./pages/Reports"
import Settings from "./pages/Settings"

import Login from "./pages/Login"
import Signup from "./pages/Signup"

import MobileNav from "./components/layout/MobileNav"
import ProtectedRoute from "./components/protector/ProtectedRoute"

// 🔥 ROUTES HANDLER
function AppRoutes() {

  const location = useLocation()

  // Hide mobile nav in login/signup
  const hideNav =
    location.pathname === "/login" ||
    location.pathname === "/signup"

  return (
    <>
      <Routes>

        {/* Default */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/meetings"
          element={
            <ProtectedRoute>
              <Meetings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

      </Routes>

      {/* ✅ Mobile nav only for logged-in pages */}
      {!hideNav && <MobileNav />}
    </>
  )
}

// 🔥 MAIN APP
export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}