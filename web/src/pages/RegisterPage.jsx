import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../state/AuthContext";

const FIELD_LABELS = {
  username: "Username",
  first_name: "First name",
  last_name: "Last name",
  email: "Email address",
  password: "Password",
  department: "Department",
  student_number: "Student number",
  staff_number: "Staff number",
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "Student",
    department: "",
    student_number: "",
    staff_number: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      toast.success("Account created. Please login.");
      navigate("/login");
    } catch (error) {
      const data = error?.response?.data;
      const message =
        (typeof data === "string" && data) ||
        data?.detail ||
        Object.values(data || {}).flat().join(" ") ||
        "Registration failed.";
      toast.error(message);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-panel" style={{ width: "min(520px, 100%)" }}>
        <h2>Create account</h2>
        <p className="auth-sub">Fill in your details to get started</p>

        <form className="form-grid" onSubmit={submit}>
          <div className="form-row">
            <input
              value={form.first_name}
              onChange={(e) => setForm((p) => ({ ...p, first_name: e.target.value }))}
              placeholder="First name"
            />
            <input
              value={form.last_name}
              onChange={(e) => setForm((p) => ({ ...p, last_name: e.target.value }))}
              placeholder="Last name"
            />
          </div>

          <input
            value={form.username}
            onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
            placeholder="Username"
            required
          />

          <input
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            placeholder="Email address"
            type="email"
            required
          />

          <input
            value={form.password}
            onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
            placeholder="Password"
            type="password"
            required
          />

          <select
            value={form.role}
            onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
          >
            <option value="Student">Student</option>
            <option value="WorkplaceSupervisor">Workplace Supervisor</option>
            <option value="AcademicSupervisor">Academic Supervisor</option>
            <option value="Admin">Admin</option>
          </select>

          <div className="form-row">
            <input
              value={form.department}
              onChange={(e) => setForm((p) => ({ ...p, department: e.target.value }))}
              placeholder="Department"
            />
            <input
              value={form.student_number}
              onChange={(e) => setForm((p) => ({ ...p, student_number: e.target.value }))}
              placeholder="Student number"
            />
          </div>

          <input
            value={form.staff_number}
            onChange={(e) => setForm((p) => ({ ...p, staff_number: e.target.value }))}
            placeholder="Staff number"
          />

          <button type="submit">Create account</button>
        </form>

        <p>
          Already registered? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

