import Post from "./../post/post";
import { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styled from "styled-components";

const StyledFeed = styled.div`
  display: flex;
  justify-content: center;
`;

function Feed({ homeFeed, posts, setPosts }) {
  return (
    <StyledFeed>
      {(posts && (
        <div>
          {posts.map((post) => (
            <div key={post._id} className="post-wrap">
              <Post post={post} setFeed={setPosts} homeFeed={homeFeed} />
            </div>
          ))}
        </div>
      )) || <h1>Loading...</h1>}
    </StyledFeed>
  );
}

export default Feed;
