import { useState, useEffect } from "react";

export default function useFetchUser(id) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:3000/users/${id}`);
      const data = await res.json();
      setUser(data);
    }

    fetchData();
  }, [id]);

  return user;
}
