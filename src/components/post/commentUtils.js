import LikeAction from "./likeAction";
import styled from "styled-components";

const StyledCommentUtils = styled.div`
  button {
    padding: 0;
    margin-left: 15px;
    margin-top: 3px;
    background: none;
    font-size: 12px;
    display: flex;
    align-items: center;

    &::after {
      content: "";
      display: inline-block;
      margin: 0 5px;
      height: 1px;
      width: 2px;
      background: #707070;
      border-radius: 50%;
    }
    &:hover,
    &:active {
      color: inherit;
      text-decoration: underline;
    }
  }
`;

function CommentUtils({ comment, user, setLikeCount }) {
  return (
    <StyledCommentUtils>
      <LikeAction user={user} setLikeCount={setLikeCount} comment={comment} />
    </StyledCommentUtils>
  );
}

export default CommentUtils;
