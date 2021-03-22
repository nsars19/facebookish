import { useState, useEffect } from "react";
import styled from "styled-components";

const StyledProfile = styled.div`
  // color: black:
`;

function Profile({ user }) {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    (async function fetchPosts() {
      const response = await fetch(
        `http://localhost:3000/posts/byuser/${user}`
      );
      const data = await response.json();

      setPosts(data);
    })();
  }, [user]);

  return (
    <StyledProfile>
      {(posts && <Feed posts={posts} setFeed={setPosts} />) || <h1>Loading</h1>}
    </StyledProfile>
  );
}

export default Profile;
