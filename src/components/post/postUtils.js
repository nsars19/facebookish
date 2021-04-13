import styled from "styled-components";
import LikeAction from "./likeAction";

const StyledUtils = styled.div`
  display: grid;
  justify-items: stretch;
  grid-auto-flow: column;
  column-gap: 4px;
  border-bottom: 1px solid gray;
  border-top: 1px solid gray;
  padding: 4px 0;
  margin-left: 10px;
  margin-right: 10px;
  & button {
    font-weight: bold;
    font-size: 14px;
  }

  button.util {
    background: none;
    &:hover,
    &:active {
      background: #707070aa;
    }
  }
`;

function PostUtils({ user, post, setLikeCount, focusRef }) {
  return (
    <StyledUtils>
      <LikeAction user={user} post={post} setLikeCount={setLikeCount} />
      <button onClick={focusRef} className="util">
        Comment
      </button>
    </StyledUtils>
  );
}

export default PostUtils;
