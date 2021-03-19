import styled from "styled-components";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const StyledForm = styled.form``;

function CommentForm({ postId, setFeed }) {
  async function handleSubmit(e) {
    e.preventDefault();

    const input = e.target.firstElementChild;
    const text = input.value;
    // Prevent sending empty comments
    if (!text) return;

    const currentUser = cookies.get("currentUser");
    const bodyData = {
      text,
      post: postId,
      author: currentUser,
    };
    const requestBody = JSON.stringify(bodyData);

    await fetch(`http://localhost:3000/comment/new`, {
      method: "POST",
      type: "cors",
      headers: { "Content-Type": "application/json" },
      body: requestBody,
    });

    const response = await fetch(
      `http://localhost:3000/posts/feed/${currentUser}`
    );
    const data = await response.json();
    setFeed(data);

    input.value = "";
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <input type="text" />
      <input type="submit" value="submit comment" />
    </StyledForm>
  );
}

export default CommentForm;
