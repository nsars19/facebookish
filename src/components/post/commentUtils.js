import LikeAction from "./likeAction";
import styled from "styled-components";

const StyledCommentUtils = styled.div`
  display: flex;

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

function CommentUtils({ comment, user, setLikeCount, focusRef }) {
  return (
    <StyledCommentUtils id="comment-util">
      <LikeAction user={user} setLikeCount={setLikeCount} comment={comment} />
      <button className="reply" onClick={focusRef}>
        Reply
      </button>
    </StyledCommentUtils>
  );
}

export default CommentUtils;
