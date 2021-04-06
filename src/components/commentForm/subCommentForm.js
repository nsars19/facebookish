import styled from "styled-components";
import colors from "./../../colors";
import ProfilePicture from "./../userProfile/profilePicture";
import { Link } from "react-router-dom";
import getCommentCount from "./../../utils/getCommentCount";

const StyledForm = styled.form`
  opacity: ${({ vis }) => (vis ? "100%" : "0")};
  height: ${({ vis }) => (vis ? "fit-content" : "0")};
  .wrap {
    margin-top: ${({ vis }) => (vis ? "10px" : "0px")};
    margin-left: 15px;
    display: flex;
    justify-content: space-between;
  }

  a {
    align-self: center;
  }
  input[type="text"] {
    flex: 1;
    height: 35px;
    width: 170px;
    padding-left: 10px;
    border-style: none;
    border-radius: 18px;
    background: #707070;
    color: ${colors.white};
    font-size: 14px;
    margin: 0 10px;
  }

  input[type="submit"] {
    background: none;
    font-weight: bold;
  }

  p {
    width: max-content;
    font-size: 12px;
    padding-top: 3px;
    padding-left: 55px;
  }
`;

function SubCommentForm({
  subFormVis,
  toggleVis,
  postId,
  commentId,
  setFeed,
  homeFeed,
  postAuthor,
  inputRef,
  currentUser,
  setCommentCount,
  parentId,
  src,
}) {
  async function handleSubmit(e) {
    e.preventDefault();

    const input = e.target[0];
    const text = input.value;
    // Prevent sending empty comments
    if (!text) return;

    const bodyData = {
      text,
      parentId,
      post: postId,
      comment: commentId,
      author: currentUser,
    };
    const requestBody = JSON.stringify(bodyData);

    const commentRes = await fetch(`http://localhost:3000/comments/child/new`, {
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
    setCommentCount(getCommentCount(commentData.comments));
    toggleVis();
    input.value = "";
  }

  return (
    <StyledForm onSubmit={handleSubmit} vis={subFormVis}>
      <div className="wrap">
        <Link to="/profile">
          <ProfilePicture src={src} size={"25px"} userId={currentUser} />
        </Link>
        <input
          type="text"
          ref={inputRef}
          id="comment-input"
          placeholder="Write a comment..."
        />
      </div>
      <p>Press enter to comment</p>
    </StyledForm>
  );
}

export default SubCommentForm;
