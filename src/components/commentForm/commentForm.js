import styled from "styled-components";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const StyledForm = styled.form``;

function CommentForm({
  postId,
  setFeed,
  homeFeed,
  postAuthor,
  inputRef,
  currentUser,
  setCommentCount,
}) {
  async function handleSubmit(e) {
    e.preventDefault();

    const input = e.target.firstElementChild;
    const text = input.value;
    // Prevent sending empty comments
    if (!text) return;

    const bodyData = {
      text,
      post: postId,
      author: currentUser,
    };
    const requestBody = JSON.stringify(bodyData);

    const commentRes = await fetch(`http://localhost:3000/comments/new`, {
      method: "POST",
      type: "cors",
      headers: { "Content-Type": "application/json" },
      body: requestBody,
    });
    const commentData = await commentRes.json();

    let response;
    if (homeFeed) {
      response = await fetch(`http://localhost:3000/posts/feed/${currentUser}`);
    } else {
      response = await fetch(
        `http://localhost:3000/posts/byuser/${postAuthor}`
      );
    }
    const data = await response.json();
    setFeed(data);
    setCommentCount(commentData.comments.length);
    input.value = "";
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} />
      <input type="submit" value="submit comment" />
    </StyledForm>
  );
}

export default CommentForm;
