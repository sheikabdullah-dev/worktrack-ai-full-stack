import type { WorkLog } from "../../types/log"

type Props = {
  logs: WorkLog[]
}

export default function StatsGrid({ logs }: Props) {

  const totalHours = logs.reduce((sum, l) => sum + Number(l.duration), 0)

  const tasks = logs.filter(l =>
    !l.tag.includes("meeting")
  ).length

  const meetings = logs.filter(l =>
    l.tag.includes("meeting") || l.tag.includes("support")
  ).length

  return (
    <div className="stats-grid">

      <div className="stat-card">
        <div className="stat-header">
          <span>Tasks Completed</span>
        </div>
        <div className="stat-value">{tasks}</div>
        <div className="stat-desc">This Month</div>
      </div>

      <div className="stat-card">
        <div className="stat-header">
          <span>Hours Logged</span>
        </div>
        <div className="stat-value">{totalHours.toFixed(2)}</div>
        <div className="stat-desc">This Month</div>
      </div>

      <div className="stat-card">
        <div className="stat-header">
          <span>Meetings & Support</span>
        </div>
        <div className="stat-value">{meetings}</div>
        <div className="stat-desc">This Month</div>
      </div>

      <div className="stat-card">
        <div className="stat-header">
          <span>Focus Score</span>
        </div>
        <div className="stat-value">85%</div>
        <div className="stat-desc">Top 10%</div>
      </div>

    </div>
  )
}