import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Feed from "./../feed/feed";

function UserProfile(props) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const match = useRouteMatch();
  const { userId } = match.params;

  useEffect(() => {
    (async function fetchUserInfo() {
      const userResponse = await fetch(`http://localhost:3000/users/${userId}`);
      const userData = await userResponse.json();

      const postsResponse = await fetch(
        `http://localhost:3000/posts/byuser/${userId}`
      );
      const postsData = await postsResponse.json();

      setUser(userData);
      setPosts(postsData);
    })();
  }, [userId]);

  return (
    (posts && <Feed posts={posts} setFeed={setPosts} />) || <h1>Loading</h1>
  );
}

export default UserProfile;
