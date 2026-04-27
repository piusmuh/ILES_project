import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../state/AuthContext";

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
    } catch {
      toast.error("Registration failed.");
    }
  };

  return (
    <div className="panel">
      <h2>Create Account</h2>
      <form className="form-grid" onSubmit={submit}>
        {Object.entries(form).map(([key, value]) => {
          if (key === "role") return null;
          return (
            <input
              key={key}
              value={value}
              onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
              placeholder={key.replace("_", " ")}
              type={key === "password" ? "password" : "text"}
              required={["username", "email", "password"].includes(key)}
            />
          );
        })}
        <select value={form.role} onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}>
          <option value="Student">Student</option>
          <option value="WorkplaceSupervisor">Workplace Supervisor</option>
          <option value="AcademicSupervisor">Academic Supervisor</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
      <p>
        Already registered? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
