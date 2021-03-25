import LikeDisplay from "./likeDisplay";
import styled from "styled-components";

const StyledCommentMetrics = styled.div`
  .cmt {
    font-size: 12px;
  }
`;

function CommentMetrics({ likeCount }) {
  return (
    <StyledCommentMetrics>
      <LikeDisplay likeCount={likeCount} isCmt={true} />
    </StyledCommentMetrics>
  );
}

export default CommentMetrics;
