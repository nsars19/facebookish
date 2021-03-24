import styled from "styled-components";
import LikeAction from "./likeAction";

const StyledUtils = styled.div`
  display: grid;
  justify-items: stretch;
  grid-auto-flow: column;
  column-gap: 4px;
  border-bottom: 1px solid gray;
  padding: 4px 0;

  & button {
    font-weight: bold;
    font-size: 14px;
  }

  button.util {
    background: none;
    color: #aaa;
    &:hover {
      background: #707070aa;
      color: #ccc;
    }
  }
`;

function PostUtils({ currentUser, post, setLikeCount, focusRef }) {
  return (
    <StyledUtils>
      <LikeAction user={currentUser} post={post} setLikeCount={setLikeCount} />
      <button onClick={focusRef} className="util">
        Comment
      </button>
    </StyledUtils>
  );
}

export default PostUtils;
