import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import Settings from "./../modals/settingsModal";
import { useState } from "react";
import ProfilePicture from "./../userProfile/profilePicture";

const StyledComment = styled.div`
  padding: 5px;
  margin: 10px 0;
  position: relative;
  display: grid;
  grid-template-columns: 35px auto;
  grid-template-rows: 1fr auto;
  column-gap: 10px;

  .pfp-link {
    height: 100%;
    grid-column: 1 / 2;
    grid-row: 1 / -1;
  }

  .comment-body {
    position: relative;
    min-width: 250px;
    max-width: fit-content;
    padding: 8px 14px;
    border-radius: 20px;

    a.user {
      font-size: 14px;
    }
    p.content {
      font-size: 15px;
      padding-top: 2px;
    }
  }

  & a,
  & p {
    grid-column: 2 / 3;
  }

  .comment-settings {
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
  }

  &:hover .comment-settings {
    display: block;
  }

  @media (min-width: 1280px) {
    .comment-settings {
      display: none;
    }
  }
`;

function Comment({
  comment,
  currentUser,
  setFeed,
  homeFeed,
  postAuthor,
  setCommentCount,
}) {
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
      <div className="comment-body">
        <Link to={`/user/${comment.author._id}`} className="user">
          {commentAuthor}
        </Link>
        <p className="content">{comment.text}</p>

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
          setCommentCount={setCommentCount}
        />
      </div>
    </StyledComment>
  );
}

export default Comment;
