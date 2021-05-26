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
      background: none;
      color: inherit;
      text-decoration: underline;
    }
  }

  button.reply {
    margin: 0;
    margin-top: 3px;
    font-size: 12px;
    font-weight: bold;
    &::after {
      display: none;
    }
  }

  button.util:hover,
  button.reply:hover {
    cursor: pointer;
  }
`;

function CommentUtils({ comment, setLikeCount, focusRef }) {
  return (
    <StyledCommentUtils id="comment-util">
      <LikeAction setLikeCount={setLikeCount} comment={comment} />
      <button className="reply" onClick={focusRef}>
        Reply
      </button>
    </StyledCommentUtils>
  );
}

export default CommentUtils;
