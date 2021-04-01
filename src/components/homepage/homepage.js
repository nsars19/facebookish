import styled from "styled-components";
import StatusForm from "./statusForm/statusForm";
import colors from "./../../colors";
import Feed from "./../feed/feed";
import { useEffect, useState } from "react";

const StyledHomePage = styled.div`
  // color: black;
`;

function HomePage({ currentUser }) {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    (async function fetchPosts() {
      const response = await fetch(
        `http://localhost:3000/posts/feed/${currentUser}`
      );

      const data = await response.json();
      setPosts(data);
    })();
  }, [currentUser]);

  return (
    <StyledHomePage>
      <StatusForm
        colors={colors}
        currentUser={currentUser}
        setFeed={setPosts}
        homeFeed
      ></StatusForm>
      <Feed user={currentUser} posts={posts} setPosts={setPosts} homeFeed />
    </StyledHomePage>
  );
}

export default HomePage;
