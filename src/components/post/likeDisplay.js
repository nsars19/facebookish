import styled from "styled-components";
import { AiFillLike } from "react-icons/ai";

const StyledLike = styled.div`
  position: ${({ isCmt }) => (isCmt ? "absolute" : "static")};
  bottom: -12px;
  right: 0;
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  background: ${({ isCmt }) => (isCmt ? "#393e46" : "none")};
  padding: ${({ isCmt }) => (isCmt ? "3px" : "")};
  padding-right: 5px;
  border-radius: 15px;
  box-shadow: ${({ isCmt }) =>
    isCmt
      ? "0 0.3px 1.3px rgba(0, 0, 0, 0.31), 0 0.8px 3.5px rgba(0, 0, 0, 0.202), 0 1.8px 8.4px rgba(0, 0, 0, 0.155),0 6px 28px rgba(0, 0, 0, 0.108)"
      : "none"};

  .like {
    path {
      color: #338ae7;
    }
    margin-bottom: 2px;
    margin-right: 5px;
    margin-left: 1px;
`;

function LikeDisplay({ likeCount, isCmt, id }) {
  return (
    <StyledLike isCmt={isCmt} className={isCmt ? "cmt" : ""} id={id}>
      <AiFillLike className="like" />
      {likeCount}
    </StyledLike>
  );
}

export default LikeDisplay;
