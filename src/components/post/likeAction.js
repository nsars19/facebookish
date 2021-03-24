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

  return <button onClick={processLike}>Like</button>;
}

export default LikeAction;
