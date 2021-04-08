import { useState, useEffect } from "react";

export default function useFetchNotifications(userId) {
  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    async function fetchNotifications() {
      const res = await fetch(`http://localhost:3000/notifications/${userId}`);
      const data = await res.json();

      setNotifications(data);
    }

    fetchNotifications();
  }, [userId]);

  return notifications;
}
