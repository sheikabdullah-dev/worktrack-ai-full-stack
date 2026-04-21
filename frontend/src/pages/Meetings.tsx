import { useState } from "react"
import Sidebar from "../components/layout/Sidebar"
import Header from "../components/layout/Header"
import { useLogs } from "../hooks/useLogs"

export default function Meetings() {

  const [open, setOpen] = useState(false)

  const { logs } = useLogs()

  // Only meetings + support
  const meetingLogs = logs.filter(log =>
    log.tag.includes("meeting") ||
    log.tag.includes("support")
  )

  return (
    <div className="app-layout">

      <Sidebar open={open} />

      <main className="main-content">

        <Header />

        <div className="dashboard-container">

          <div className="section-title">
            Complete Meeting & Support Log
          </div>

          <div className="data-table-wrapper">

            <table className="data-table">

              <thead>
                <tr>
                  <th>Date</th>
                  <th>Subject / Task</th>
                  <th>Application</th>
                  <th>Type</th>
                  <th>Duration</th>
                </tr>
              </thead>

              <tbody>

                {meetingLogs.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      No meetings or support logged.
                    </td>
                  </tr>
                )}

                {meetingLogs.map((log) => (

                  <tr key={log.id}>

                    <td>
                      {new Date(log.date).toLocaleDateString()}
                    </td>

                    <td style={{ fontWeight: 500 }}>
                      {log.title}
                    </td>

                    <td style={{ color: "var(--status-info)" }}>
                      {log.app}
                    </td>

                    <td>
                      <span className={`badge ${log.tag}`}>
                        {formatTag(log.tag)}
                      </span>
                    </td>

                    <td>{log.duration}h</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>
  )
}

// Helper function for clean labels
function formatTag(tag: string) {

  const map: Record<string, string> = {
    meeting: "Meeting",
    meeting_support: "Meeting Support",
    junior_support: "Junior Support",
    query_prep: "Query Prep",
  }

  return map[tag] || tag
}