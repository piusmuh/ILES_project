import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext";

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand">ILES</Link>
        <nav>
          {user && <NavLink to="/notifications">Notifications</NavLink>}
          {user && user.role === "Student" && <NavLink to="/student">Student Dashboard</NavLink>}
          {user && ["WorkplaceSupervisor", "AcademicSupervisor"].includes(user.role) && (
            <NavLink to="/supervisor">Supervisor Dashboard</NavLink>
          )}
          {user && user.role === "Admin" && <NavLink to="/admin">Admin Dashboard</NavLink>}
        </nav>
        <div>
          {user ? (
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="button-link">Login</Link>
          )}
        </div>
      </header>
      <main className="content">{children}</main>
    </div>
  );
}
