import styled from "styled-components";
import { useCurrentUserContext } from "../userContext/userContext";

const StyledAction = styled.button`
  font-weight: bold;
  font-size: 14px;
`;

function LikeAction({ post, comment, setLikeCount }) {
  const user = useCurrentUserContext();

  async function processLike() {
    const body = post
      ? JSON.stringify({ user, post })
      : JSON.stringify({ user, comment });

    const res = await fetch(
      `https://frozen-thicket-71687.herokuapp.com/likes/like-${
        post ? "post" : "comment"
      }`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body,
      }
    );

    const data = await res.json();
    const likeCount = data.likes.length;
    setLikeCount(likeCount);
  }

  return (
    <StyledAction onClick={processLike} com={comment} className="util">
      Like
    </StyledAction>
  );
}

export default LikeAction;
