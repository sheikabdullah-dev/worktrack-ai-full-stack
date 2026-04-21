import { LogOut } from "lucide-react"

export default function Header() {

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  return (
    <header className="top-header">

      <div className="greeting">
        <h1>Overview</h1>
        <p>{today}</p>
      </div>

      {/* 🔥 USER PROFILE + LOGOUT */}
      <div className="user-profile">

        <div className="avatar">SD</div>

        <span>Software Dev</span>

        {/* LOGOUT BUTTON */}
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={16} />
        </button>

      </div>

    </header>
  )
}