import { Link } from "react-router-dom";

export default function Sidebar({ open }: { open: boolean }) {
  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="brand">WorkTrack</div>

      <ul className="nav-menu">
        <li className="nav-item">
          <Link to="/">Dashboard</Link>
        </li>

        <li className="nav-item">
          <Link to="/tasks">Tasks</Link>
        </li>

        <li className="nav-item">
          <Link to="/meetings">Meetings</Link>
        </li>

        <li className="nav-item">
          <Link to="/reports">Reports</Link>
        </li>
      </ul>

      <ul className="nav-menu" style={{ marginTop: "auto", flex: "none" }}>
        <li className="nav-item">
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </aside>
  );
}