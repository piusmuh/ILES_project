import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../api/client";
import StatCard from "../components/StatCard";

export default function SupervisorDashboard() {
  const [stats, setStats] = useState({});
  const [logs, setLogs] = useState([]);

  const loadData = async () => {
    const [statsRes, logsRes] = await Promise.all([
      api.get("/dashboard/stats/"),
      api.get("/weekly-logs/"),
    ]);
    setStats(statsRes.data);
    setLogs(logsRes.data);
  };

  useEffect(() => { loadData(); }, []);

  const transition = async (id, status) => {
    try {
      await api.patch(`/weekly-logs/${id}/transition/`, { status });
      toast.success(`Log moved to ${status}`);
      loadData();
    } catch {
      toast.error("Could not update log");
    }
  };

  return (
    <div className="stack">
      <div className="page-header">
        <h2>Supervisor Dashboard</h2>
        <span className="muted">{new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span>
      </div>

      <div className="stats-grid">
        <StatCard label="Tracked Students" value={stats.students_tracked ?? 0} />
        <StatCard label="Submitted Logs" value={stats.submitted_logs ?? 0} />
        <StatCard label="Approved Logs" value={stats.approved_logs ?? 0} />
        <StatCard label="Average Score" value={Number(stats.average_score || 0).toFixed(2)} />
      </div>

      <div className="panel">
        <h3>Review Weekly Logs</h3>
        {logs.length === 0 ? (
          <p className="muted" style={{ textAlign: "center", padding: "1.5rem 0" }}>No logs pending review.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Week</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td style={{ fontWeight: 500, color: "var(--text-primary)" }}>
                      {log.student_name || `Student #${log.student}`}
                    </td>
                    <td style={{ color: "var(--text-muted)" }}>#{log.week_number}</td>
                    <td>{log.title}</td>
                    <td>
                      <span className={`badge ${log.status.toLowerCase()}`}>{log.status}</span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                        {log.status === "Submitted" && (
                          <button onClick={() => transition(log.id, "Reviewed")}>
                            Mark Reviewed
                          </button>
                        )}
                        {log.status === "Reviewed" && (
                          <button
                            onClick={() => transition(log.id, "Approved")}
                            style={{ background: "var(--success-light)", color: "var(--success)", border: "1px solid var(--success-light)" }}
                          >
                            Approve
                          </button>
                        )}
                        {(log.status === "Reviewed" || log.status === "Submitted") && (
                          <button
                            onClick={() => transition(log.id, "Rejected")}
                            style={{ background: "var(--danger-light)", color: "var(--danger)", border: "1px solid var(--danger-light)" }}
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
