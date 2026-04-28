import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../api/client";

export default function AdminDashboard() {
  const [placements, setPlacements] = useState([]);
  const [form, setForm] = useState({
    student: "",
    workplace_supervisor: "",
    academic_supervisor: "",
    company_name: "",
    company_address: "",
    position_title: "",
    start_date: "",
    end_date: "",
    status: "Active",
  });

  const loadData = async () => {
    const placementsRes = await api.get("/placements/");
    setPlacements(placementsRes.data);
  };

  useEffect(() => { loadData(); }, []);

  const createPlacement = async (e) => {
    e.preventDefault();
    try {
      await api.post("/placements/", form);
      toast.success("Placement created");
      loadData();
    } catch {
      toast.error("Could not create placement. Ensure IDs are valid.");
    }
  };

  return (
    <div className="stack">
      <div className="page-header">
        <h2>Admin Dashboard</h2>
        <span className="muted">{placements.length} placement{placements.length !== 1 ? "s" : ""} total</span>
      </div>

      <div className="panel">
        <h3>Create Internship Placement</h3>
        <p className="muted" style={{ marginBottom: "1.1rem" }}>
          Use user IDs for students and supervisors to configure assignments.
        </p>
        <form onSubmit={createPlacement} className="form-grid">
          <div className="form-row">
            <input
              placeholder="Student ID"
              value={form.student}
              onChange={(e) => setForm((p) => ({ ...p, student: e.target.value }))}
              required
            />
            <input
              placeholder="Workplace Supervisor ID"
              value={form.workplace_supervisor}
              onChange={(e) => setForm((p) => ({ ...p, workplace_supervisor: e.target.value }))}
            />
          </div>

          <div className="form-row">
            <input
              placeholder="Academic Supervisor ID"
              value={form.academic_supervisor}
              onChange={(e) => setForm((p) => ({ ...p, academic_supervisor: e.target.value }))}
            />
            <input
              placeholder="Position title"
              value={form.position_title}
              onChange={(e) => setForm((p) => ({ ...p, position_title: e.target.value }))}
            />
          </div>

          <input
            placeholder="Company name"
            value={form.company_name}
            onChange={(e) => setForm((p) => ({ ...p, company_name: e.target.value }))}
            required
          />

          <input
            placeholder="Company address"
            value={form.company_address}
            onChange={(e) => setForm((p) => ({ ...p, company_address: e.target.value }))}
          />

          <div className="form-row">
            <div>
              <label className="field-label">Start date</label>
              <input
                type="date"
                value={form.start_date}
                onChange={(e) => setForm((p) => ({ ...p, start_date: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="field-label">End date</label>
              <input
                type="date"
                value={form.end_date}
                onChange={(e) => setForm((p) => ({ ...p, end_date: e.target.value }))}
                required
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit">Create Placement</button>
          </div>
        </form>
      </div>

      <div className="panel">
        <h3>Active Placements ({placements.length})</h3>
        {placements.length === 0 ? (
          <p className="muted" style={{ textAlign: "center", padding: "1.5rem 0" }}>
            No placements configured yet.
          </p>
        ) : (
          <ul className="placement-list">
            {placements.map((p) => (
              <li key={p.id}>
                <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>{p.company_name}</span>
                <span className="muted" style={{ marginLeft: "auto" }}>Student #{p.student}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
