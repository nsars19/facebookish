import StatusForm from "./statusForm/statusForm";
import colors from "./../../colors";
import Feed from "./../feed/feed";
import { useEffect, useState } from "react";

function HomePage({ currentUser, lightMode, postRef, pfp }) {
  const [posts, setPosts] = useState(null);
  const [pfpSrc, setSrc] = useState(null);

  useEffect(() => {
    (async function fetchPosts() {
      const response = await fetch(
        `https://frozen-thicket-71687.herokuapp.com:3000/posts/feed/${currentUser}`
      );

      const data = await response.json();
      setPosts(data);
    })();
  }, [currentUser]);

  useEffect(() => {
    (async function fetchPosts() {
      const response = await fetch(
        `https://frozen-thicket-71687.herokuapp.com:3000/users/${currentUser}`
      );

      const data = await response.json();
      setSrc(data.profilePhotoSrc);
    })();
  }, [currentUser]);

  return (
    <>
      <StatusForm
        colors={colors}
        postRef={postRef}
        lightMode={lightMode}
        currentUser={currentUser}
        setFeed={setPosts}
        src={pfpSrc}
        homeFeed
      ></StatusForm>
      <Feed
        currentUser={currentUser}
        src={pfpSrc}
        pfp={pfp}
        posts={posts}
        setPosts={setPosts}
        homeFeed
      />
    </>
  );
}

export default HomePage;
