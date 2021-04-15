import styled from "styled-components";
import { Link } from "react-router-dom";
import Comment from "./comment";
import CommentForm from "./../commentForm/commentForm";
import { BsThreeDots } from "react-icons/bs";
import Settings from "./../modals/settingsModal";
import { useState, useRef, useEffect } from "react";
import ProfilePicture from "./../userProfile/profilePicture";
import moment from "moment";
import PostUtils from "./postUtils";
import PostMetrics from "./postMetrics";
import getCommentCount from "./../../utils/getCommentCount";
import EditForm from "./editForm";

const StyledPost = styled.div`
  width: 100%;
  border-radius: 5px;
  margin: 20px 0px;
  box-shadow: 0 0.1px 0.8px rgba(0, 0, 0, 0.02),
    0 0.1px 1.9px rgba(0, 0, 0, 0.028), 0 0.3px 3.5px rgba(0, 0, 0, 0.035),
    0 0.4px 6.3px rgba(0, 0, 0, 0.042), 0 0.8px 11.7px rgba(0, 0, 0, 0.05);

  &:hover {
    transition: box-shadow 0.05s ease;
    box-shadow: 0 -0.4px 1.1px rgba(0, 0, 0, 0.047),
      0 -0.7px 2.5px rgba(0, 0, 0, 0.063), 0 -0.9px 4.5px rgba(0, 0, 0, 0.067),
      0 -0.8px 7.4px rgba(0, 0, 0, 0.067), 0 0.4px 12.2px rgba(0, 0, 0, 0.066);
  }

  .user-info {
    display: grid;
    grid-template-columns: 60px auto;
    grid-template-rows: 15px auto;
    row-gap: 10px;
    padding: 6px 5px 0px;
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
    // border-bottom: 1px solid gray;
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
    top: 6px;
    right: 10px;
    cursor: pointer;
    font-size: 24px;

    &:hover {
      color: #777;
    }
  }

  .post:hover .post-settings {
    display: block;
  }

  .comments {
    display: ${({ cmtsVis }) => (cmtsVis ? "block" : "none")};
  }

  .photo-wrap {
    width: 100%;
    margin-top: 5px;
    display: flex;
    justify-content: center;

    img {
      width: 100%;
      // max-width: 100%;
    }
  }

  @media (min-width: 300px) {
    .post-settings {
      display: block;
    }
  }

  @media (min-width: 1280px) {
    .post-settings {
      display: none;
    }
  }
`;

function Post({ post, setFeed, homeFeed, src, currentUser, pfp }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [commentCount, setCommentCount] = useState(
    getCommentCount(post.comments)
  );
  const [commentsVisible, setCommentsVisible] = useState(true);
  const [editingPost, setPostEditStatus] = useState(false);
  const [postText, setPostText] = useState(post.text);
  const [img, setImg] = useState(null);
  const isAuthor = post.author._id === currentUser;
  const inputRef = useRef(null);

  useEffect(() => {
    (async function getImg() {
      if (post.photo) {
        const path = post.photo.path;
        const res = await fetch(`http://localhost:3000/${path}`);
        setImg(res.url);
      } else {
        return;
      }
    })();
  }, [img, post.photo]);

  const toggleModalVisibility = () => setModalVisible(!modalVisible);
  const togglePostEdit = () => setPostEditStatus(!editingPost);

  const EditComponent = () => {
    return (
      <EditForm
        setPostText={setPostText}
        postText={postText}
        togglePostEdit={togglePostEdit}
        postId={post._id}
        isPost
      />
    );
  };

  const postContent = () => <p className="content">{postText}</p>;

  const postPhoto = () => (
    <div className="photo-wrap">
      <img src={img} alt="post" loading="lazy" />
    </div>
  );

  return (
    <StyledPost className="postItem" cmtsVis={commentsVisible}>
      <div className="post">
        <div className="user-info">
          <div className="pfp-link">
            <Link to={`/user/${post.author._id}`} className="user">
              <ProfilePicture src={post.author.profilePhotoSrc} size={"40px"} />
            </Link>
          </div>
          <Link to={`/user/${post.author._id}`} className="user">
            {post.author.firstName} {post.author.lastName}
          </Link>
          <p>{moment(post.createdAt).fromNow()}</p>
        </div>
        {editingPost ? EditComponent() : postContent()}
        {post.photo ? postPhoto() : <div />}
        <PostMetrics
          likeCount={likeCount}
          commentCount={commentCount}
          toggleComments={() => setCommentsVisible(!commentsVisible)}
        />
        {isAuthor ? (
          <BsThreeDots
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
          postAuthor={post.author._id}
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
              pfp={pfp}
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
        src={src}
        pfp={pfp}
      />
    </StyledPost>
  );
}

export default Post;
