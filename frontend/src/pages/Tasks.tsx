import Sidebar from "../components/layout/Sidebar"
import Header from "../components/layout/Header"
import { useLogs } from "../hooks/useLogs"

export default function Tasks() {

  const { logs } = useLogs()

  // Filter only task type (exclude meetings/support)
  const taskLogs = logs.filter(log =>
    !log.tag.includes("meeting")
  )

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Header />

        <div className="dashboard-container">

          <div className="section-title">
            Complete Task Log
          </div>

          <div className="data-table-wrapper">

            <table className="data-table">

              <thead>
                <tr>
                  <th>Date</th>
                  <th>Task Description</th>
                  <th>Application</th>
                  <th>Status</th>
                  <th>Duration</th>
                </tr>
              </thead>

              <tbody>

                {taskLogs.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      No tasks logged.
                    </td>
                  </tr>
                )}

                {taskLogs.map((log) => (

                  <tr key={log.id}>

                    <td>{new Date(log.date).toLocaleDateString()}</td>

                    <td style={{ fontWeight: 500 }}>
                      {log.title}
                    </td>

                    <td style={{ color: "var(--accent-primary)" }}>
                      {log.app}
                    </td>

                    <td>
                      <span className="badge other">
                        {log.status}
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