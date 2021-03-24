import Post from "./../post/post";
import { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styled from "styled-components";

const StyledFeed = styled.div`
  display: flex;
  justify-content: center;
`;

function Feed({ user, homeFeed }) {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    (async function fetchPosts() {
      let response;
      if (homeFeed) {
        response = await fetch(`http://localhost:3000/posts/feed/${user}`);
      } else {
        response = await fetch(`http://localhost:3000/posts/byuser/${user}`);
      }

      const data = await response.json();
      setPosts(data);
    })();
  }, [user, homeFeed]);

  return (
    (posts && (
      <div>
        {posts.map((post) => (
          <div key={post._id}>
            <Post post={post} setFeed={setPosts} homeFeed={homeFeed} />
          </div>
        ))}
      </div>
    )) || <h1>Loading...</h1>
  );
}

export default Feed;
