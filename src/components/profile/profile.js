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
      {(posts && posts.map((post) => <h2 key={post._id}>{post.text}</h2>)) || (
        <h2>Loading...</h2>
      )}
    </StyledProfile>
  );
}

export default Profile;
