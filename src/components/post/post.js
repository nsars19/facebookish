import styled from "styled-components";
import { Link } from "react-router-dom";
import Comment from "./comment";
import CommentForm from "./../commentForm/commentForm";
import Cookies from "universal-cookie";
import { AiFillSetting } from "react-icons/ai";
import Settings from "./../modals/settingsModal";
import { useState } from "react";
import ProfilePicture from "./../userProfile/profilePicture";

const StyledPost = styled.div`
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
  box-shadow: 0 0.1px 0.8px rgba(0, 0, 0, 0.02),
    0 0.1px 1.9px rgba(0, 0, 0, 0.028), 0 0.3px 3.5px rgba(0, 0, 0, 0.035),
    0 0.4px 6.3px rgba(0, 0, 0, 0.042), 0 0.8px 11.7px rgba(0, 0, 0, 0.05),
    0 2px 28px rgba(0, 0, 0, 0.07);

  &:hover {
    transition: box-shadow 0.05s ease;
    box-shadow: 0 -0.4px 1.1px rgba(0, 0, 0, 0.047),
      0 -0.7px 2.5px rgba(0, 0, 0, 0.063), 0 -0.9px 4.5px rgba(0, 0, 0, 0.067),
      0 -0.8px 7.4px rgba(0, 0, 0, 0.067), 0 0.4px 12.2px rgba(0, 0, 0, 0.066),
      0 4.9px 21.3px rgba(0, 0, 0, 0.066), 0 21px 46px rgba(0, 0, 0, 0.07);
  }
  .post {
    padding: 5px;
    border-bottom: 1px solid gray;
    margin: 10px 0;
    position: relative;
    display: grid;
    grid-template-columns: 60px auto;
    grid-template-rows: 1fr auto 1px;
    gap: 10px;

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

function Post({ post, setFeed, homeFeed }) {
  const [modalVisible, setModalVisible] = useState(false);
  const currentUser = cookies.get("currentUser");
  const isAuthor = post.author._id === currentUser;

  function toggleModalVisibility() {
    setModalVisible(!modalVisible);
  }

  return (
    <StyledPost className="postItem">
      <div className="post">
        <div className="pfp-link">
          <Link to={`/user/${post.author._id}`} className="user">
            <ProfilePicture userId={post.author._id} size={"50px"} />
          </Link>
        </div>
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
          user={currentUser}
          setFeed={setFeed}
          homeFeed={homeFeed}
          isPost
        />
      </div>
      {post.comments.map((comment) => (
        <div key={comment._id}>
          <Comment
            comment={comment}
            currentUser={currentUser}
            setFeed={setFeed}
            homeFeed={homeFeed}
            postAuthor={post.author._id}
          />
        </div>
      ))}
      <CommentForm
        postId={post._id}
        postAuthor={post.author._id}
        setFeed={setFeed}
        homeFeed={homeFeed}
      />
    </StyledPost>
  );
}

export default Post;
