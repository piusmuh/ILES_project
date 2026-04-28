import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext";

const NAV_ICONS = {
  notifications: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  student: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  ),
  supervisor: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  admin: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  logout: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
};

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-name">ILES</span>
          <span className="brand-sub">Internship Log System</span>
        </div>

        <nav className="sidebar-nav">
          {user && (
            <NavLink to="/notifications">
              {NAV_ICONS.notifications}
              Notifications
            </NavLink>
          )}
          {user && user.role === "Student" && (
            <NavLink to="/student">
              {NAV_ICONS.student}
              My Dashboard
            </NavLink>
          )}
          {user && ["WorkplaceSupervisor", "AcademicSupervisor"].includes(user.role) && (
            <NavLink to="/supervisor">
              {NAV_ICONS.supervisor}
              Supervisor Panel
            </NavLink>
          )}
          {user && user.role === "Admin" && (
            <NavLink to="/admin">
              {NAV_ICONS.admin}
              Admin Panel
            </NavLink>
          )}
        </nav>

        <div className="sidebar-footer">
          {user && (
            <div className="sidebar-user">
              Signed in as <strong style={{ color: "rgba(255,255,255,0.85)" }}>{user.username || user.email}</strong>
            </div>
          )}
          {user ? (
            <button className="sidebar-logout" onClick={handleLogout}>
              {NAV_ICONS.logout}
              Sign out
            </button>
          ) : (
            <NavLink to="/login" style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.55rem 0.8rem", borderRadius: "6px", color: "rgba(255,255,255,0.7)", fontSize: "0.85rem" }}>
              Sign in
            </NavLink>
          )}
        </div>
      </aside>

      <div className="main-area">
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
