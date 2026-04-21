import Sidebar from "../components/layout/Sidebar"
import Header from "../components/layout/Header"
import { useEffect, useState } from "react"

export default function Settings() {

  const [name, setName] = useState("Software Dev")
  const [role, setRole] = useState("Software Developer")
  const [theme, setTheme] = useState("dark")

  // Load from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem("wt_name")
    const savedRole = localStorage.getItem("wt_role")
    const savedTheme = localStorage.getItem("wt_theme")

    if (savedName) setName(savedName)
    if (savedRole) setRole(savedRole)
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    }
  }, [])

  // Apply theme to body
  const applyTheme = (value: string) => {
    if (value === "light") {
      document.body.classList.add("light-mode")
    } else {
      document.body.classList.remove("light-mode")
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()

    localStorage.setItem("wt_name", name)
    localStorage.setItem("wt_role", role)
    localStorage.setItem("wt_theme", theme)

    applyTheme(theme)

    alert("Settings saved successfully ✅")
  }

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Header />

        <div className="dashboard-container">

          <div className="section-title">
            Application Settings
          </div>

          <div className="log-panel" style={{ maxWidth: 600 }}>

            <form onSubmit={handleSave}>

              {/* NAME */}
              <div className="form-group">
                <label>Your Name (Appears on Reports)</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              {/* ROLE */}
              <div className="form-group">
                <label>Your Role</label>
                <input
                  type="text"
                  className="form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Enter your role"
                />
              </div>

              {/* THEME */}
              <div className="form-group">
                <label>Theme Preference</label>
                <select
                  className="form-control"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="dark">Dark Mode</option>
                  <option value="light">Light Mode</option>
                </select>
              </div>

              {/* BUTTON */}
              <div style={{ marginTop: 32 }}>
                <button
                  type="submit"
                  className="btn-submit"
                  style={{ width: "auto", padding: "10px 24px" }}
                >
                  Save Profile
                </button>
              </div>

            </form>

          </div>

        </div>

      </main>

    </div>
  )
}