import styled from "styled-components";
import { Link } from "react-router-dom";
import Comment from "./comment";
import CommentForm from "./../commentForm/commentForm";
import Cookies from "universal-cookie";
import { AiFillSetting } from "react-icons/ai";
import Settings from "./../modals/settingsModal";
import { useState } from "react";

const StyledPost = styled.div`
  padding: 10px;
  border: 2px solid black;
  margin: 10px;

  p {
    padding-bottom: 5px;
    border-bottom: 2px solid black;
    margin-top: 5px;
    margin-bottom: 10px;
  }

  .post {
    position: relative;
  }
  .post-settings {
    display: none;
  }
  .post:hover .post-settings {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;

    &:active {
      transition: transform 0.3s ease-in-out;
      transform: rotate(90deg);
    }
  }
`;

const cookies = new Cookies();

function Post({ post, setFeed }) {
  const [modalVisible, setModalVisible] = useState(false);
  const currentUser = cookies.get("currentUser");
  const isAuthor = post.author._id === currentUser;

  function toggleModalVisibility() {
    setModalVisible(!modalVisible);
  }

  return (
    <StyledPost>
      <div className="post">
        <Link to={`/user/${post.author._id}`} className="user">
          {post.author.firstName} {post.author.lastName}
        </Link>
        <p>{post.text}</p>
        {isAuthor ? (
          <AiFillSetting
            className="post-settings"
            onClick={toggleModalVisibility}
          />
        ) : (
          <div />
        )}
        <Settings
          modalVisible={modalVisible}
          toggleModal={setModalVisible}
          postItem={post}
          isPost
        />
      </div>
      {post.comments.map((comment) => (
        <div key={comment._id}>
          <Comment comment={comment} />
        </div>
      ))}
      <CommentForm postId={post._id} setFeed={setFeed} />
    </StyledPost>
  );
}

export default Post;
