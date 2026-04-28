import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function NotificationsPage() {
  const [items, setItems] = useState([]);

  const load = async () => {
    const { data } = await api.get("/notifications/");
    setItems(data);
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    await api.patch(`/notifications/${id}/mark_read/`);
    load();
  };

  const unread = items.filter((i) => !i.is_read);
  const read = items.filter((i) => i.is_read);

  return (
    <div className="stack">
      <div className="page-header">
        <h2>Notifications</h2>
        {unread.length > 0 && (
          <span className="badge submitted">{unread.length} unread</span>
        )}
      </div>

      {items.length === 0 ? (
        <div className="panel">
          <p className="muted" style={{ textAlign: "center", padding: "2rem 0" }}>
            You're all caught up — no notifications.
          </p>
        </div>
      ) : (
        <div className="panel">
          <ul className="notification-list">
            {unread.map((item) => (
              <li key={item.id} className="unread">
                <strong>{item.title}</strong>
                <p>{item.message}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.5rem" }}>
                  <small>{new Date(item.created_at).toLocaleString()}</small>
                  <button
                    onClick={() => markRead(item.id)}
                    style={{ padding: "0.25rem 0.75rem", fontSize: "0.78rem" }}
                  >
                    Mark as read
                  </button>
                </div>
              </li>
            ))}

            {read.length > 0 && unread.length > 0 && (
              <li style={{ background: "transparent", border: "none", borderRadius: 0, borderLeft: "none", padding: "0.25rem 0" }}>
                <p className="muted" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.07em", margin: 0 }}>
                  Earlier
                </p>
              </li>
            )}

            {read.map((item) => (
              <li key={item.id} className="read">
                <strong>{item.title}</strong>
                <p>{item.message}</p>
                <small>{new Date(item.created_at).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
