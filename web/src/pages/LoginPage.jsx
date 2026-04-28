import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../state/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) navigate("/");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      toast.success("Welcome back!");
      navigate("/");
    } catch {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-panel">
        <h2>Welcome back</h2>
        <p className="auth-sub">Sign in to your ILES account</p>
        <form onSubmit={submit} className="form-grid">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />
          <button type="submit">Sign in</button>
        </form>
        <p>
          No account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}
