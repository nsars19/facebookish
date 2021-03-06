import LikeDisplay from "./likeDisplay";
import styled from "styled-components";

const StyledMetrics = styled.div`
  font-size: 15px;
  display: flex;
  padding: 0 10px;
  margin-top: 5px;

  .likes,
  .post-comments {
    margin-top: 5px;
    flex: 1;
    display: flex;
  }
  .likes {
    justify-content: start;
  }
  .post-comments {
    display: ${({ commentCount }) => (commentCount ? "flex" : "none")};
    justify-content: flex-end;
    -webkit-justify-content: flex-end;
    margin-right: 4px;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

function PostMetrics({ likeCount, commentCount, toggleComments }) {
  return (
    <StyledMetrics commentCount={commentCount}>
      <div className="likes">
        {likeCount > 0 ? <LikeDisplay likeCount={likeCount} /> : <div />}
      </div>
      <div className="post-comments" onClick={toggleComments}>
        {commentCount === 1 ? (
          commentCount + " Comment"
        ) : commentCount > 0 ? (
          commentCount + " Comments"
        ) : (
          <div />
        )}
      </div>
    </StyledMetrics>
  );
}

export default PostMetrics;
