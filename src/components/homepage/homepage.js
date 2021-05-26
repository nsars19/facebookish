import StatusForm from "./statusForm/statusForm";
import colors from "./../../colors";
import Feed from "./../feed/feed";
import { useEffect, useState } from "react";
import { useCurrentUserContext } from "../userContext/userContext";

function HomePage({ postRef, pfp }) {
  const [posts, setPosts] = useState(null);
  const [pfpSrc, setSrc] = useState(null);
  const currentUser = useCurrentUserContext();

  useEffect(() => {
    (async function fetchPosts() {
      const response = await fetch(
        `https://frozen-thicket-71687.herokuapp.com/posts/feed/${currentUser}`
      );

      const data = await response.json();
      setPosts(data);
    })();
  }, [currentUser]);

  useEffect(() => {
    (async function fetchPosts() {
      const response = await fetch(
        `https://frozen-thicket-71687.herokuapp.com/users/${currentUser}`
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
        setFeed={setPosts}
        src={pfpSrc}
        homeFeed
      ></StatusForm>
      <Feed src={pfpSrc} pfp={pfp} posts={posts} setPosts={setPosts} homeFeed />
    </>
  );
}

export default HomePage;
