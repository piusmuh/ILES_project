import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function NotificationsPage() {
  const [items, setItems] = useState([]);

  const load = async () => {
    const { data } = await api.get("/notifications/");
    setItems(data);
  };

  useEffect(() => {
    load();
  }, []);

  const markRead = async (id) => {
    await api.patch(`/notifications/${id}/mark_read/`);
    load();
  };

  return (
    <div className="panel">
      <h2>Notifications</h2>
      <ul className="notification-list">
        {items.map((item) => (
          <li key={item.id} className={item.is_read ? "read" : "unread"}>
            <strong>{item.title}</strong>
            <p>{item.message}</p>
            <small>{new Date(item.created_at).toLocaleString()}</small>
            {!item.is_read && <button onClick={() => markRead(item.id)}>Mark as read</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
