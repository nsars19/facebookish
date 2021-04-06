import styled from "styled-components";
import StatusForm from "./statusForm/statusForm";
import colors from "./../../colors";
import Feed from "./../feed/feed";
import { useEffect, useState } from "react";

const StyledHomePage = styled.div`
  // color: black;
`;

function HomePage({ currentUser, lightMode, postRef }) {
  const [posts, setPosts] = useState(null);
  const [userData, setUserData] = useState(null);
  const [pfpSrc, setSrc] = useState(null);

  useEffect(() => {
    (async function fetchPosts() {
      const response = await fetch(
        `http://localhost:3000/posts/feed/${currentUser}`
      );

      const data = await response.json();
      setPosts(data);
    })();
  }, [currentUser]);

  useEffect(() => {
    (async function fetchPosts() {
      const response = await fetch(
        `http://localhost:3000/users/${currentUser}`
      );

      const data = await response.json();
      setUserData(data);
      setSrc(data.profilePhotoSrc);
    })();
  }, [currentUser]);

  return (
    <StyledHomePage>
      <StatusForm
        colors={colors}
        postRef={postRef}
        lightMode={lightMode}
        currentUser={currentUser}
        setFeed={setPosts}
        src={pfpSrc}
        homeFeed
      ></StatusForm>
      <Feed user={currentUser} posts={posts} setPosts={setPosts} homeFeed />
    </StyledHomePage>
  );
}

export default HomePage;
