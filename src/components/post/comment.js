import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import Settings from "./../modals/settingsModal";
import { useState } from "react";
import ProfilePicture from "./../userProfile/profilePicture";

const StyledComment = styled.div`
  padding: 5px;
  border-bottom: 1px solid gray;
  margin: 10px 0;
  position: relative;
  display: grid;
  grid-template-columns: 60px auto;
  grid-template-rows: 1fr auto;
  gap: 10px;
  column-gap: 0px;

  .pfp-link {
    height: 100%;
    grid-column: 1 / 2;
    grid-row: 1 / -1;
    justify-self: center;
  }

  & a,
  & p {
    grid-column: 2 / 3;
  }

  .comment-settings {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }

  &:hover .comment-settings {
    display: block;

    &:active {
      transition: transform 0.3s ease-in-out;
      transform: rotate(90deg);
    }
  }
`;

function Comment({ comment, currentUser, setFeed, homeFeed, postAuthor }) {
  const [modalVisible, setModalVisible] = useState(false);
  const commentAuthor =
    comment.author.firstName + " " + comment.author.lastName;
  const isAuthor = comment.author._id === currentUser;

  function toggleModalVisibility() {
    setModalVisible(!modalVisible);
  }

  return (
    <StyledComment className="comment">
      <div className="pfp-link">
        <Link to={`/user/${comment.author._id}`} className="user">
          <ProfilePicture userId={comment.author._id} size={"35px"} />
        </Link>
      </div>
      <Link to={`/user/${comment.author._id}`} className="user">
        {commentAuthor}
      </Link>
      <p>{comment.text}</p>
      {isAuthor ? (
        <AiFillSetting
          className="comment-settings"
          onClick={toggleModalVisibility}
        />
      ) : (
        <div />
      )}
      <Settings
        modalVisible={modalVisible}
        toggleModal={setModalVisible}
        commentItem={comment}
        setFeed={setFeed}
        homeFeed={homeFeed}
        user={currentUser}
        postAuthor={postAuthor}
      />
    </StyledComment>
  );
}

export default Comment;
