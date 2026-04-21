import { Link, useLocation } from "react-router-dom"
import { Home, ClipboardList, Plus, BarChart3, Settings } from "lucide-react"
import { useEffect, useState } from "react"

export default function MobileNav() {
  const { pathname } = useLocation()
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!isMobile) return null

  const navItemStyle = (active: boolean) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    width: "56px",
    height: "56px",
    color: active ? "var(--text-primary)" : "var(--text-tertiary)",
    position: "relative",
    transition: "all 0.3s ease"
  } as const)

  const iconStyle = (active: boolean) => ({
    width: "22px",
    height: "22px",
    transform: active ? "translateY(-10px)" : "translateY(0)",
    color: active ? "var(--accent-primary)" : "var(--text-secondary)",
    filter: active ? "drop-shadow(0 0 6px var(--accent-glow))" : "none",
    transition: "all 0.3s ease"
  })

  const textStyle = (active: boolean) => ({
    fontSize: "10px",
    fontWeight: 600,
    marginTop: "4px",
    position: "absolute" as const,
    bottom: "6px",
    opacity: active ? 1 : 0,
    transform: active ? "translateY(0)" : "translateY(8px)",
    color: "var(--text-secondary)",
    transition: "all 0.3s ease"
  })

  return (
    <div style={wrapper}>
      <nav style={navStyle}>

        <Link to="/" style={navItemStyle(pathname === "/")}>
          <Home style={iconStyle(pathname === "/")} />
          <span style={textStyle(pathname === "/")}>Home</span>
        </Link>

        <Link to="/tasks" style={navItemStyle(pathname === "/tasks")}>
          <ClipboardList style={iconStyle(pathname === "/tasks")} />
          <span style={textStyle(pathname === "/tasks")}>Tasks</span>
        </Link>

        {/* FAB */}
        <div style={fabContainer}>
          <button style={fabStyle}>
            <Plus style={fabIcon} />
          </button>
        </div>

        <Link to="/reports" style={navItemStyle(pathname === "/reports")}>
          <BarChart3 style={iconStyle(pathname === "/reports")} />
          <span style={textStyle(pathname === "/reports")}>Reports</span>
        </Link>

        <Link to="/settings" style={navItemStyle(pathname === "/settings")}>
          <Settings style={iconStyle(pathname === "/settings")} />
          <span style={textStyle(pathname === "/settings")}>Settings</span>
        </Link>

      </nav>
    </div>
  )
}

/* ============================= */
/* 🎨 THEME-AWARE STYLES */
/* ============================= */

const wrapper = {
  position: "fixed" as const,
  bottom: 0,
  left: 0,
  width: "100%",
  padding: "0 16px calc(20px + env(safe-area-inset-bottom))",
  zIndex: 100
}

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  background: "var(--bg-surface)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",

  border: "1px solid var(--border-subtle)",
  borderRadius: "24px",

  padding: "8px 16px",

  boxShadow:
    "0 10px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
}

const fabContainer = {
  width: "64px",
  height: "64px",
  marginTop: "-40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10
}

const fabStyle = {
  width: "58px",
  height: "58px",
  borderRadius: "50%",
  border: "none",

  background: "linear-gradient(135deg, var(--accent-primary), var(--accent-hover))",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  color: "#fff",

  boxShadow:
    "0 10px 25px var(--accent-glow), 0 4px 10px rgba(0,0,0,0.4)",

  cursor: "pointer",
  transition: "all 0.25s ease"
}

const fabIcon = {
  width: "26px",
  height: "26px"
}