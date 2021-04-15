import Post from "./../post/post";
import styled from "styled-components";
import PostLoader from "../loader/postLoader";

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

function Feed({ homeFeed, posts, setPosts, src, currentUser, pfp }) {
  return (
    <StyledFeed className="grid-feed">
      {posts ? (
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
      ) : (
        loader
      )}
    </StyledFeed>
  );
}

export default Feed;
