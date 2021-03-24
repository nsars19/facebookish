import styled from "styled-components";

const StyledAction = styled.button`
  font-weight: bold;
  font-size: 14px;
`;

function LikeAction({ user, post, setLikeCount }) {
  async function processLike() {
    const body = JSON.stringify({ user, post });

    const res = await fetch("http://localhost:3000/like", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body,
    });

    const data = await res.json();
    const likeCount = data.likes.length;
    setLikeCount(likeCount);
  }

  return (
    <StyledAction onClick={processLike} className="util">
      Like
    </StyledAction>
  );
}

export default LikeAction;
