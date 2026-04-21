import { useState } from "react"
import type { WorkLog } from "../../types/log"

export default function TaskForm({ onAdd }: { onAdd: (log: WorkLog) => void }) {

  const [form, setForm] = useState({
    title: "",
    app: "",
    status: "Completed",
    tag: "sd_ticket",
    duration: 0
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onAdd({
      ...form,
      date: new Date().toISOString().split("T")[0] // ✅ IMPORTANT
    })
    setForm({
      title: "",
      app: "",
      status: "Completed",
      tag: "sd_ticket",
      duration: 0
    })
  }

  return (
    <div className="log-panel">

      <div className="section-title">Quick Log</div>

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Task Description</label>
          <input
            className="form-control"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Application</label>
          <input
            className="form-control"
            value={form.app}
            onChange={e => setForm({ ...form, app: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            className="form-control"
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
          >
            <option>Completed</option>
            <option>WIP</option>
          </select>
        </div>

        <div className="grid-2">

          <div className="form-group">
            <label>Duration</label>
            <input
              type="number"
              className="form-control"
              value={form.duration}
              onChange={e => setForm({ ...form, duration: Number(e.target.value) })}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              className="form-control"
              value={form.tag}
              onChange={e => setForm({ ...form, tag: e.target.value })}
            >
              <option value="sd_ticket">SD Ticket</option>
              <option value="brd">BRD</option>
              <option value="meeting">Meeting</option>
              <option value="meeting_support">Meeting Support</option>
              <option value="junior_support">Junior Support</option>
              <option value="query_prep">Query Prep</option>
            </select>
          </div>

        </div>

        <button className="btn-submit">Log Activity</button>

      </form>

    </div>
  )
}