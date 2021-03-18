import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";

function UserProfile(props) {
  const [user, setUser] = useState(null);
  const match = useRouteMatch();
  const { userId } = match.params;

  useEffect(() => {
    (async function fetchUserInfo() {
      const response = await fetch(`http://localhost:3000/users/${userId}`);
      const userData = await response.json();

      setUser(userData);
    })();
  }, []);

  return (user && <div>{user.firstName}</div>) || <h1>Loading</h1>;
}

export default UserProfile;
