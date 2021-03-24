import styled from "styled-components";
import colors from "./../../colors";
import ProfilePicture from "./../userProfile/profilePicture";
import { Link } from "react-router-dom";

const StyledForm = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-left: 12px;

  input[type="text"] {
    flex: 1;
    height: 35px;
    padding-left: 10px;
    border-style: none;
    border-radius: 18px;
    background: #707070;
    color: ${colors.white};
    font-size: 14px;
    margin: 0 7px;
  }

  input[type="submit"] {
    background: none;
    font-weight: bold;
  }
`;

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
      <Link to="/profile">
        <ProfilePicture userId={currentUser} size={"35px"} />
      </Link>
      <input
        type="text"
        ref={inputRef}
        id="comment-input"
        placeholder="Write a comment..."
      />
      <input type="submit" value="submit" id="comment-submit" />
    </StyledForm>
  );
}

export default CommentForm;
