import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Users() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    (async function fetchUsers() {
      const users = await fetch("http://localhost:3000/users");
      const userData = await users.json();

      setUsers(userData);
    })();
  }, []);

  return (
    (users && (
      <div>
        {users.map((user) => {
          return (
            <h2 key={user._id}>
              <Link to={`/user/${user._id}`}>
                {user.firstName + " " + user.lastName}
              </Link>
            </h2>
          );
        })}
      </div>
    )) || <h2>Loading...</h2>
  );
}

export default Users;
