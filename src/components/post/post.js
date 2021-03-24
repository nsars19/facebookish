import styled from "styled-components";
import { Link } from "react-router-dom";
import Comment from "./comment";
import CommentForm from "./../commentForm/commentForm";
import Cookies from "universal-cookie";
import { AiFillSetting } from "react-icons/ai";
import Settings from "./../modals/settingsModal";
import { useState, useRef } from "react";
import ProfilePicture from "./../userProfile/profilePicture";
import moment from "moment";
import { AiFillLike } from "react-icons/ai";

const StyledPost = styled.div`
  min-width: 340px;
  max-width: 750px;
  padding: 10px;
  border-radius: 5px;
  margin: 20px 10px;
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

  .user-info {
    display: grid;
    grid-template-columns: 60px auto;
    grid-template-rows: 15px auto;
    row-gap: 10px;
    margin-bottom: 10px;

    p {
      font-size: 13px;
      font-weight: bold;
      color: #aaa;
    }
  }

  .post {
    padding: 5px 0;
    padding-bottom: 10px;
    border-bottom: 1px solid gray;
    position: relative;

    .pfp-link {
      grid-column: 1 / 2;
      grid-row: 1 / -1;
      justify-self: center;
      align-self: center;
    }

    p.content {
      margin-left: 10px;
      line-height: 23px;
      font-size: 15px;
    }
  }

  .metrics {
    font-size: 15px;
    color: #aaa;
    display: flex;
    margin-top: 5px;
  }

  .likes,
  .post-comments {
    margin-top: 5px;
    flex: 1;
    display: flex;
    justify-content: start;
  }
  .post-comments {
    justify-content: end;
    margin-right: 4px;
  }
  .like {
    margin: 1px;
    margin-right: 5px;
    margin-left: 9px;
  }

  .post-utils {
    display: grid;
    justify-items: stretch;
    grid-auto-flow: column;
    column-gap: 4px;
    border-bottom: 1px solid gray;
    padding: 4px 0;
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

  @media (min-width: 480px) {
    & {
      width: 420px;
    }
  }

  @media (min-width: 540px) {
    & {
      width: 480px;
    }
  }

  @media (min-width: 768px) {
    & {
      width: 600px;
    }
  }

  @media (min-width: 1080px) {
    & {
      width: 750px;
    }
  }
`;

const cookies = new Cookies();

function Post({ post, setFeed, homeFeed }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [commentCount, setCommentCount] = useState(post.comments.length);
  const currentUser = cookies.get("currentUser");
  const isAuthor = post.author._id === currentUser;
  const inputRef = useRef(null);

  function toggleModalVisibility() {
    setModalVisible(!modalVisible);
  }

  return (
    <StyledPost className="postItem">
      <div className="post">
        <div className="user-info">
          <div className="pfp-link">
            <Link to={`/user/${post.author._id}`} className="user">
              <ProfilePicture userId={post.author._id} size={"40px"} />
            </Link>
          </div>
          <Link to={`/user/${post.author._id}`} className="user">
            {post.author.firstName} {post.author.lastName}
          </Link>
          <p>{moment(post.createdAt).fromNow()}</p>
        </div>
        <p className="content">{post.text}</p>
        <div className="metrics">
          <div className="likes">
            {/* {post.likes.length > 0 ? post.likes.length + " Likes" : <div />} */}
            <AiFillLike className="like" />
            {post.likes.length}
          </div>
          <div className="post-comments">
            {post.comments.length > 0 ? (
              post.comments.length + " Comments"
            ) : (
              <div />
            )}
          </div>
        </div>
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
        inputRef={inputRef}
        setCommentCount={setCommentCount}
      />
    </StyledPost>
  );
}

export default Post;
