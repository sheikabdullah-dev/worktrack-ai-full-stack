import { useState } from "react"
import Sidebar from "../components/layout/Sidebar"
import Header from "../components/layout/Header"
import StatsGrid from "../components/dashboard/StatsGrid"
import Timeline from "../components/dashboard/Timeline"
import TaskForm from "../components/forms/TaskForm"
import { useLogs } from "../hooks/useLogs"

export default function Dashboard() {

  const { logs, addLog, loading } = useLogs()

  // 🔥 NEW: sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-layout">

      {/* ✅ Sidebar with toggle */}
      <Sidebar open={sidebarOpen} />

      {/* ✅ Backdrop (mobile only) */}
      {sidebarOpen && (
        <div
          className="backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="main-content">

        {/* ✅ Pass toggle function */}
        <Header  />

        <div className="dashboard-container">

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <StatsGrid logs={logs} />

              <div className="content-grid">
                <Timeline logs={logs} />
                <TaskForm onAdd={addLog} />
              </div>
            </>
          )}

        </div>

      </main>

    </div>
  )
}