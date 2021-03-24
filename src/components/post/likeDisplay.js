import styled from "styled-components";
import { AiFillLike } from "react-icons/ai";

const StyledLike = styled.div`
  .like {
    margin: 1px;
    margin-right: 5px;
    margin-left: 9px;
  }
`;

function LikeDisplay({ likeCount }) {
  return (
    <StyledLike>
      <AiFillLike className="like" />
      {likeCount}
    </StyledLike>
  );
}

export default LikeDisplay;
