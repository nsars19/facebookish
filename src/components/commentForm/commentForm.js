import styled from "styled-components";
import colors from "./../../colors";
import ProfilePicture from "./../userProfile/profilePicture";
import { Link } from "react-router-dom";
import getCommentCount from "./../../utils/getCommentCount";

const StyledForm = styled.form`
  .wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    margin-left: 5px;
  }

  input[type="text"] {
    flex: 1;
    height: 35px;
    padding-left: 10px;
    padding-right: 10px;
    border-style: none;
    border-radius: 18px;
    background: #707070;
    color: ${colors.white};
    font-size: 14px;
    margin: 0 10px;
    z-index: 2;
  }

  input[type="submit"] {
    background: none;
    font-weight: bold;
  }

  p {
    font-size: 12px;
    padding-top: 3px;
    padding-left: 55px;
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
  setCommentsVisible,
  src,
  userData,
}) {
  async function handleSubmit(e) {
    e.preventDefault();

    const input = e.target[0];
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
    setCommentCount(getCommentCount(commentData.comments));
    setCommentsVisible();
    input.value = "";
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div className="wrap">
        <Link to="/profile">
          <ProfilePicture
            size={"35px"}
            src={userData && userData.profilePhotoSrc}
            userId={currentUser}
          />
        </Link>
        <input
          type="text"
          ref={inputRef}
          id="comment-input"
          placeholder="Write a comment..."
        />
      </div>
      {/* <input type="submit" value="submit" id="comment-submit" /> */}
      <p>Press enter to comment</p>
    </StyledForm>
  );
}

export default CommentForm;
