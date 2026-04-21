import Sidebar from "../components/layout/Sidebar"
import Header from "../components/layout/Header"
import { useLogs } from "../hooks/useLogs"
import { useState } from "react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import * as XLSX from "xlsx"

export default function Reports() {

  const { logs } = useLogs()

  const now = new Date()
  const [month, setMonth] = useState(now.getMonth())
  const [year, setYear] = useState(now.getFullYear())

  // Filter logs by month/year
  const filteredLogs = logs.filter(log => {
    const d = new Date(log.date)
    return d.getMonth() === month && d.getFullYear() === year
  })

  // Stats
  let totalHours = 0
  let devTasks = 0
  let meetingHours = 0

  const appMap: Record<string, number> = {}

  filteredLogs.forEach(log => {

    totalHours += log.duration

    if (!log.tag.includes("meeting")) {
      devTasks++
    }

    if (log.tag.includes("meeting") || log.tag.includes("support")) {
      meetingHours += log.duration
    }

    if (!appMap[log.app]) {
      appMap[log.app] = 0
    }

    appMap[log.app] += log.duration
  })

  const apps = Object.keys(appMap)

  // ---------------- PDF EXPORT ----------------
  const exportPDF = () => {

    if (filteredLogs.length === 0) {
      alert("No data to export")
      return
    }

    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.text("Monthly Report", 14, 20)

    doc.setFontSize(10)
    doc.text(`Month: ${months[month]} ${year}`, 14, 28)

    doc.text(`Total Hours: ${totalHours.toFixed(2)}`, 14, 36)
    doc.text(`Tasks: ${devTasks}`, 14, 42)
    doc.text(`Meetings: ${meetingHours.toFixed(2)}`, 14, 48)

    autoTable(doc, {
      startY: 60,
      head: [["Date", "Type", "Task", "App", "Hours"]],
      body: filteredLogs.map(l => [
        new Date(l.date).toLocaleDateString(),
        l.tag,
        l.title,
        l.app,
        l.duration + "h"
      ])
    })

    doc.save(`Report_${months[month]}_${year}.pdf`)
  }

  // ---------------- EXCEL EXPORT ----------------
  const exportExcel = () => {

    if (filteredLogs.length === 0) {
      alert("No data to export")
      return
    }

    const data = filteredLogs.map(l => ({
      Date: new Date(l.date).toLocaleDateString(),
      Type: l.tag,
      Task: l.title,
      Application: l.app,
      Hours: l.duration
    }))

    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(wb, ws, "Logs")

    XLSX.writeFile(wb, `Report_${months[month]}_${year}.xlsx`)
  }

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Header />

        <div className="dashboard-container">

          {/* FILTER + EXPORT */}
          <div className="header-controls" style={{ marginBottom: 20 }}>

            <select
              className="filter-select"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
            >
              {months.map((m, i) => (
                <option key={i} value={i}>{m}</option>
              ))}
            </select>

            <select
              className="filter-select"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            >
              {[2024, 2025, 2026].map(y => (
                <option key={y}>{y}</option>
              ))}
            </select>

            <button
              onClick={exportPDF}
              className="btn-submit btn-export btn-pdf"
            >
              PDF
            </button>

            <button
              onClick={exportExcel}
              className="btn-submit btn-export btn-excel"
            >
              Excel
            </button>

          </div>

          {/* SUMMARY */}
          <div className="stats-grid">

            <div className="stat-card">
              <div className="stat-header">
                <span>Total Impact Hours</span>
              </div>
              <div className="stat-value">{totalHours.toFixed(2)}</div>
              <div className="stat-desc">Total work done</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span>Core Deliverables</span>
              </div>
              <div className="stat-value">{devTasks}</div>
              <div className="stat-desc">Tasks completed</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span>Meetings & Support</span>
              </div>
              <div className="stat-value">{meetingHours.toFixed(2)}</div>
              <div className="stat-desc">Hours spent</div>
            </div>

          </div>

          {/* APP BREAKDOWN */}
          <div className="section-title">Time by Application</div>

          <div className="data-table-wrapper">

            <table className="data-table">

              <thead>
                <tr>
                  <th>Application</th>
                  <th>Hours</th>
                  <th>%</th>
                </tr>
              </thead>

              <tbody>

                {apps.length === 0 && (
                  <tr>
                    <td colSpan={3} style={{ textAlign: "center" }}>
                      No data
                    </td>
                  </tr>
                )}

                {apps.map(app => {

                  const hrs = appMap[app]
                  const percent = totalHours > 0
                    ? ((hrs / totalHours) * 100).toFixed(1)
                    : 0

                  return (
                    <tr key={app}>
                      <td>{app}</td>
                      <td>{hrs.toFixed(2)} hrs</td>
                      <td>{percent}%</td>
                    </tr>
                  )
                })}

              </tbody>

            </table>

          </div>

          {/* DETAILED LOG */}
          <div className="section-title">Detailed Monthly Log</div>

          <div className="data-table-wrapper">

            <table className="data-table">

              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Task</th>
                  <th>App</th>
                  <th>Hours</th>
                </tr>
              </thead>

              <tbody>

                {filteredLogs.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      No logs
                    </td>
                  </tr>
                )}

                {filteredLogs.map(log => (

                  <tr key={log.id}>

                    <td>
                      {new Date(log.date).toLocaleDateString()}
                    </td>

                    <td>
                      <span className={`badge ${log.tag}`}>
                        {log.tag}
                      </span>
                    </td>

                    <td>{log.title}</td>

                    <td>{log.app}</td>

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

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
]