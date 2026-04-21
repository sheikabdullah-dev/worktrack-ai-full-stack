import type { WorkLog } from "../../types/log"

type Props = {
  logs: WorkLog[]
}

export default function Timeline({ logs }: Props) {

  if (logs.length === 0) {
    return (
      <div>
        <div className="section-title">Activity Feed</div>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-icon">📂</div>
            <div className="timeline-content">
              <h4>No activity logged</h4>
              <div className="task-meta">Start adding tasks</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>

      <div className="section-title">Activity Feed</div>

      <div className="timeline">

        {logs.map((log) => (

          <div key={log.id} className="timeline-item">

            <div className="timeline-icon">📝</div>

            <div className="timeline-content">

              <div className="task-header">
                <h4>{log.title}</h4>
                <span className={`badge ${log.tag}`}>
                  {formatTag(log.tag)}
                </span>
              </div>

              <div className="task-meta">
                <span>{log.app}</span>
                <span>{log.status}</span>
                <span>{log.duration}h</span>
                <span>
                  {new Date(log.date).toLocaleDateString()}
                </span>
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

// helper
function formatTag(tag: string) {
  const map: Record<string, string> = {
    sd_ticket: "SD Ticket",
    brd: "BRD",
    meeting: "Meeting",
    meeting_support: "Meeting Support",
    junior_support: "Junior Support",
    query_prep: "Query Prep"
  }

  return map[tag] || tag
}