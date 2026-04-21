export default function Header() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="top-header">
      <div className="greeting">
        <h1>Overview</h1>
        <p>{today}</p>
      </div>

      <div className="user-profile">
        <div className="avatar">SD</div>
        <span>Software Dev</span>
      </div>
    </header>
  );
}