import Post from "./../post/post";
import { useState, useEffect } from "react";

function Feed({ user, homeFeed }) {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    (async function fetchPosts() {
      if (homeFeed) {
        await fetch(`http://localhost:3000/posts/feed/${user}`)
          .then((data) => data.json())
          .then((data) => setPosts(data));
      } else {
        await fetch(`http://localhost:3000/posts/byuser/${user}`)
          .then((data) => data.json())
          .then((data) => setPosts(data));
      }
    })();
  }, [user, homeFeed]);

  return (
    (posts && (
      <div>
        {posts.map((post) => (
          <div key={post._id}>
            <Post post={post} setFeed={setPosts} />
          </div>
        ))}
      </div>
    )) || <h1>Loading...</h1>
  );
}

export default Feed;
