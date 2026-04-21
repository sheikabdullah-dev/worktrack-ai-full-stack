import { useState } from "react"
import Sidebar from "../components/layout/Sidebar"
import Header from "../components/layout/Header"
import { useLogs } from "../hooks/useLogs"
import { updateLog, deleteLog } from "../services/api"
import { Pencil, Trash2 } from "lucide-react"
import { X, Save } from "lucide-react"
export default function Meetings() {

  const { logs, refresh } = useLogs()

  const [editingLog, setEditingLog] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const meetingLogs = logs.filter(log =>
    (log.tag || "").includes("meeting") ||
    (log.tag || "").includes("support")
  )

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return

    try {
      setLoading(true)
      await deleteLog(id)
      await refresh()
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async () => {
    if (!editingLog) return

    try {
      setLoading(true)
      await updateLog(editingLog.id, editingLog)
      await refresh()
      setEditingLog(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-layout">
      <Sidebar open={false} />
      <main className="main-content">
        <Header />

        <div className="dashboard-container">

          <div className="section-title">
            Meetings & Support
          </div>

          <div className="data-table-wrapper">

            <table className="data-table">

              <thead>
                <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th>App</th>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {meetingLogs.map(log => (

                  <tr key={log.id}>

                    <td>
                      {log.date ? new Date(log.date).toLocaleDateString() : "-"}
                    </td>

                    <td>{log.title}</td>
                    <td>{log.app}</td>

                    <td>{log.tag}</td>

                    <td>{log.duration}h</td>

                    <td>
                      <td style={{ display: "flex", gap: "10px" }}>
                        <button className="icon-btn" onClick={() => setEditingLog(log)}>
                          <Pencil size={16} />
                        </button>

                        <button className="icon-btn danger" onClick={() => handleDelete(log.id)}>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* MODAL */}
      {editingLog && (
        <div className="modal-overlay">

          <div className="modal-box">

            {/* HEADER */}
            <div className="modal-header">
              <h3>Edit Task</h3>
              <button onClick={() => setEditingLog(null)}>
                <X size={18} />
              </button>
            </div>

            {/* BODY */}
            <div className="modal-body">

              <input
                className="form-control"
                placeholder="Task title"
                value={editingLog.title}
                onChange={(e) =>
                  setEditingLog({ ...editingLog, title: e.target.value })
                }
              />

              <input
                className="form-control"
                placeholder="Application"
                value={editingLog.app}
                onChange={(e) =>
                  setEditingLog({ ...editingLog, app: e.target.value })
                }
              />

              <select
                className="form-control"
                value={editingLog.status}
                onChange={(e) =>
                  setEditingLog({ ...editingLog, status: e.target.value })
                }
              >
                <option>Completed</option>
                <option>WIP</option>
                <option>Blocked</option>
              </select>

              <input
                type="number"
                className="form-control"
                placeholder="Duration"
                value={editingLog.duration}
                onChange={(e) =>
                  setEditingLog({
                    ...editingLog,
                    duration: Number(e.target.value),
                  })
                }
              />

            </div>

            {/* FOOTER */}
            <div className="modal-footer">

              <button className="btn-cancel" onClick={() => setEditingLog(null)}>
                Cancel
              </button>

              <button className="btn-save" onClick={handleUpdate}>
                <Save size={16} />
                {loading ? "Saving..." : "Save Changes"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  )
}