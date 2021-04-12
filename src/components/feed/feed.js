import Post from "./../post/post";
import styled from "styled-components";

const StyledFeed = styled.div`
  display: flex;
  justify-content: center;

  .wrap {
    width: 95%;
    max-width: 750px;
  }
`;

function Feed({ homeFeed, posts, setPosts, src, currentUser, pfp }) {
  return (
    <StyledFeed className="grid-feed">
      {(posts && (
        <div className="wrap">
          {posts.map((post) => (
            <div key={post._id} className="post-wrap">
              <Post
                post={post}
                setFeed={setPosts}
                homeFeed={homeFeed}
                src={src}
                currentUser={currentUser}
                pfp={pfp}
              />
            </div>
          ))}
        </div>
      )) || <h1>Loading...</h1>}
    </StyledFeed>
  );
}

export default Feed;
