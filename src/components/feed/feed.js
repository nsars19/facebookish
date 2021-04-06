import Post from "./../post/post";
import { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styled from "styled-components";

const StyledFeed = styled.div`
  display: flex;
  justify-content: center;

  .wrap {
    width: 95%;
    max-width: 750px;
  }
`;

function Feed({ homeFeed, posts, setPosts, src }) {
  return (
    <StyledFeed>
      {(posts && (
        <div className="wrap">
          {posts.map((post) => (
            <div key={post._id} className="post-wrap">
              <Post
                post={post}
                setFeed={setPosts}
                homeFeed={homeFeed}
                src={src}
              />
            </div>
          ))}
        </div>
      )) || <h1>Loading...</h1>}
    </StyledFeed>
  );
}

export default Feed;
