import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../api/client";
import StatCard from "../components/StatCard";

export default function StudentDashboard() {
  const [stats, setStats] = useState({});
  const [logs, setLogs] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [form, setForm] = useState({
    placement: "",
    week_number: "",
    week_start_date: "",
    week_end_date: "",
    title: "",
    activities: "",
    skills_learned: "",
    challenges: "",
    due_date: "",
  });

  const loadData = async () => {
    const [statsRes, logsRes, placementsRes] = await Promise.all([
      api.get("/dashboard/stats/"),
      api.get("/weekly-logs/"),
      api.get("/placements/"),
    ]);
    setStats(statsRes.data);
    setLogs(logsRes.data);
    setPlacements(placementsRes.data);
  };

  useEffect(() => { loadData(); }, []);

  const createLog = async (e) => {
    e.preventDefault();
    try {
      await api.post("/weekly-logs/", form);
      toast.success("Weekly log saved as draft");
      setForm({
        placement: placements[0]?.id || "",
        week_number: "",
        week_start_date: "",
        week_end_date: "",
        title: "",
        activities: "",
        skills_learned: "",
        challenges: "",
        due_date: "",
      });
      loadData();
    } catch {
      toast.error("Failed to create weekly log");
    }
  };

  const submitLog = async (id) => {
    try {
      await api.patch(`/weekly-logs/${id}/transition/`, { status: "Submitted" });
      toast.success("Weekly log submitted");
      loadData();
    } catch {
      toast.error("Submission failed");
    }
  };

  return (
    <div className="stack">
      <div className="page-header">
        <h2>Student Dashboard</h2>
        <span className="muted">{new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <StatCard label="Total Logs" value={stats.total_logs ?? 0} />
        <StatCard label="Submitted" value={stats.submitted_logs ?? 0} />
        <StatCard label="Approved" value={stats.approved_logs ?? 0} />
        <StatCard label="Average Score" value={Number(stats.average_score || 0).toFixed(2)} />
      </div>

      {/* Create Log Form */}
      <div className="panel">
        <h3>New Weekly Log</h3>
        <form className="form-grid" onSubmit={createLog}>
          <div className="form-row">
            <select
              value={form.placement}
              onChange={(e) => setForm((p) => ({ ...p, placement: e.target.value }))}
              required
            >
              <option value="">Select placement</option>
              {placements.map((p) => (
                <option key={p.id} value={p.id}>{p.company_name}</option>
              ))}
            </select>
            <input
              placeholder="Week number"
              type="number"
              value={form.week_number}
              onChange={(e) => setForm((p) => ({ ...p, week_number: e.target.value }))}
              required
            />
          </div>

          <div className="form-row">
            <div>
              <label className="field-label">Week start</label>
              <input
                type="date"
                value={form.week_start_date}
                onChange={(e) => setForm((p) => ({ ...p, week_start_date: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="field-label">Week end</label>
              <input
                type="date"
                value={form.week_end_date}
                onChange={(e) => setForm((p) => ({ ...p, week_end_date: e.target.value }))}
                required
              />
            </div>
          </div>

          <input
            placeholder="Log title"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            required
          />

          <textarea
            placeholder="Describe your activities this week…"
            value={form.activities}
            onChange={(e) => setForm((p) => ({ ...p, activities: e.target.value }))}
            required
          />

          <div className="form-row">
            <textarea
              placeholder="Skills learned"
              value={form.skills_learned}
              onChange={(e) => setForm((p) => ({ ...p, skills_learned: e.target.value }))}
              style={{ minHeight: "70px" }}
            />
            <textarea
              placeholder="Challenges faced"
              value={form.challenges}
              onChange={(e) => setForm((p) => ({ ...p, challenges: e.target.value }))}
              style={{ minHeight: "70px" }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <div style={{ flex: 1 }}>
              <label className="field-label">Due date</label>
              <input
                type="date"
                value={form.due_date}
                onChange={(e) => setForm((p) => ({ ...p, due_date: e.target.value }))}
                required
              />
            </div>
            <div style={{ paddingTop: "1.5rem" }}>
              <button type="submit">Save as Draft</button>
            </div>
          </div>
        </form>
      </div>

      {/* Logs Table */}
      <div className="panel">
        <h3>My Weekly Logs</h3>
        {logs.length === 0 ? (
          <p className="muted" style={{ textAlign: "center", padding: "1.5rem 0" }}>No logs yet. Create your first weekly log above.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Week</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td style={{ color: "var(--text-muted)", fontWeight: 500 }}>#{log.week_number}</td>
                    <td style={{ color: "var(--text-primary)", fontWeight: 500 }}>{log.title}</td>
                    <td>
                      <span className={`badge ${log.status.toLowerCase()}`}>{log.status}</span>
                    </td>
                    <td>
                      {log.status === "Draft"
                        ? <button onClick={() => submitLog(log.id)}>Submit</button>
                        : <span className="muted">—</span>}
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
