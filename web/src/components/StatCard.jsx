export default function StatCard({ label, value }) {
  return (
    <div className="stat-card">
      <p className="stat-label">{label}</p>
      <h3>{value}</h3>
    </div>
  );
}