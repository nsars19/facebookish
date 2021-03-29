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
import PostUtils from "./postUtils";
import PostMetrics from "./postMetrics";
import getCommentCount from "./../../utils/getCommentCount";

const StyledPost = styled.div`
  min-width: 340px;
  max-width: 750px;
  transition: width 0.2s ease-in-out;
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

    a,
    p {
      width: fit-content;
    }

    a:hover {
      text-decoration: underline;
    }
  }

  .post {
    position: relative;
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

  .post-settings {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }

  .post:hover .post-settings {
    display: block;
  }

  .comments {
    display: ${({ cmtsVis }) => (cmtsVis ? "block" : "none")};
  }

  @media (min-width: 300px) {
    & {
      width: 340px;
    }
    .post-settings {
      display: block;
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

  @media (min-width: 1280px) {
    .post-settings {
      display: none;
    }
  }
`;

const cookies = new Cookies();

function Post({ post, setFeed, homeFeed }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [commentCount, setCommentCount] = useState(
    getCommentCount(post.comments)
  );
  const [commentsVisible, setCommentsVisible] = useState(true);
  const [editingPost, setPostEditStatus] = useState(false);
  const [postText, setPostText] = useState(post.text);
  const currentUser = cookies.get("currentUser");
  const isAuthor = post.author._id === currentUser;
  const inputRef = useRef(null);

  const toggleModalVisibility = () => setModalVisible(!modalVisible);
  const togglePostEdit = () => setPostEditStatus(!editingPost);

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const postId = post._id;
    const newData = e.target.firstElementChild.value;
    const reqBody = JSON.stringify({ postId, newData });

    const res = await fetch("http://localhost:3000/posts/update", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: reqBody,
    });
    const data = await res.json();
    console.log(data);
    setPostText(data.text);
    togglePostEdit();
  };

  const editForm = () => {
    return (
      <form onSubmit={handleEditSubmit} className="edit-form-post">
        <input type="text" defaultValue={postText} />
        <p>Hit enter to submit.</p>
      </form>
    );
  };

  const postContent = () => <p className="content">{postText}</p>;

  return (
    <StyledPost className="postItem" cmtsVis={commentsVisible}>
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
        {editingPost ? editForm() : postContent()}
        <PostMetrics
          likeCount={likeCount}
          commentCount={commentCount}
          toggleComments={() => setCommentsVisible(!commentsVisible)}
        />
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
          setCommentCount={setCommentCount}
          togglePostEdit={togglePostEdit}
          isPost
        />
      </div>
      <PostUtils
        user={currentUser}
        post={post._id}
        setLikeCount={setLikeCount}
        focusRef={() => inputRef.current.focus()}
      />
      <div className="comments">
        {post.comments.map((comment) => (
          <div key={comment._id}>
            <Comment
              comment={comment}
              currentUser={currentUser}
              setFeed={setFeed}
              homeFeed={homeFeed}
              postAuthor={post.author._id}
              setCommentCount={setCommentCount}
            />
          </div>
        ))}
      </div>
      <CommentForm
        currentUser={currentUser}
        postId={post._id}
        postAuthor={post.author._id}
        setFeed={setFeed}
        homeFeed={homeFeed}
        inputRef={inputRef}
        setCommentCount={setCommentCount}
        setCommentsVisible={() => setCommentsVisible(true)}
      />
    </StyledPost>
  );
}

export default Post;
