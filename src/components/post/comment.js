import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import Settings from "./../modals/settingsModal";
import { useState } from "react";

const StyledComment = styled.div`
  padding-top: 5px;
  margin-left: 10px;
  position: relative;

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

function Comment({ comment, currentUser, setFeed, homeFeed }) {
  const [modalVisible, setModalVisible] = useState(false);
  const commentAuthor =
    comment.author.firstName + " " + comment.author.lastName;
  const isAuthor = comment.author._id === currentUser;

  function toggleModalVisibility() {
    setModalVisible(!modalVisible);
  }

  return (
    <StyledComment className="comment">
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
      />
    </StyledComment>
  );
}

export default Comment;
