import styled from "styled-components";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const StyledForm = styled.form``;

function CommentForm({ postId }) {
  async function handleSubmit(e) {
    e.preventDefault();

    const text = e.target.firstElementChild.value;
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
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <input type="text" />
      <input type="submit" value="submit comment" />
    </StyledForm>
  );
}

export default CommentForm;
