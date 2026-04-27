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

  useEffect(() => {
    loadData();
  }, []);

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
      <h2>Admin Dashboard</h2>
      <div className="panel">
        <h3>Create Internship Placement</h3>
        <p className="muted">Use user IDs for now (student and supervisors) to configure assignments.</p>
        <form onSubmit={createPlacement} className="form-grid">
          <input placeholder="Student ID" value={form.student} onChange={(e) => setForm((p) => ({ ...p, student: e.target.value }))} required />
          <input
            placeholder="Workplace Supervisor ID"
            value={form.workplace_supervisor}
            onChange={(e) => setForm((p) => ({ ...p, workplace_supervisor: e.target.value }))}
          />
          <input
            placeholder="Academic Supervisor ID"
            value={form.academic_supervisor}
            onChange={(e) => setForm((p) => ({ ...p, academic_supervisor: e.target.value }))}
          />
          <input placeholder="Company name" value={form.company_name} onChange={(e) => setForm((p) => ({ ...p, company_name: e.target.value }))} required />
          <input placeholder="Company address" value={form.company_address} onChange={(e) => setForm((p) => ({ ...p, company_address: e.target.value }))} />
          <input placeholder="Position title" value={form.position_title} onChange={(e) => setForm((p) => ({ ...p, position_title: e.target.value }))} />
          <input type="date" value={form.start_date} onChange={(e) => setForm((p) => ({ ...p, start_date: e.target.value }))} required />
          <input type="date" value={form.end_date} onChange={(e) => setForm((p) => ({ ...p, end_date: e.target.value }))} required />
          <button type="submit">Create Placement</button>
        </form>
      </div>
      <div className="panel">
        <h3>Placements ({placements.length})</h3>
        <ul>
          {placements.map((p) => (
            <li key={p.id}>{p.company_name} - Student #{p.student}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
