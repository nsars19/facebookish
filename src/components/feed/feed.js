import Post from "./../post/post";
import styled from "styled-components";
import PostLoader from "../loader/postLoader";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

const StyledFeed = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .wrap {
    width: 95%;
    max-width: 750px;
  }
`;
const loader = (
  <>
    <PostLoader />
    <PostLoader />
    <PostLoader />
  </>
);

function Feed({ homeFeed, posts, setPosts, src, pfp }) {
  const [visibilePosts, setVisiblePosts] = useState(5);

  const addPosts = () => setVisiblePosts(visibilePosts + 5);

  return (
    <div className="grid-feed">
      <InfiniteScroll
        dataLength={visibilePosts}
        next={addPosts}
        hasMore={posts?.length !== visibilePosts}
      >
        <StyledFeed className="grid-feed">
          {posts ? (
            <div className="wrap">
              {posts.slice(0, visibilePosts).map((post) => (
                <div key={post._id} className="post-wrap">
                  <Post
                    post={post}
                    setFeed={setPosts}
                    homeFeed={homeFeed}
                    src={src}
                    pfp={pfp}
                  />
                </div>
              ))}
            </div>
          ) : (
            loader
          )}
        </StyledFeed>
      </InfiniteScroll>
    </div>
  );
}

export default Feed;
