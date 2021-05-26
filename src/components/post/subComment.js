import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import Settings from "./../modals/settingsModal";
import { useState, useRef } from "react";
import ProfilePicture from "./../userProfile/profilePicture";
import CommentUtils from "./commentUtils";
import CommentMetrics from "./commentMetrics";
import SubCommentForm from "./../commentForm/subCommentForm";
import EditForm from "./editForm";
import { useCurrentUserContext } from "../userContext/userContext";

const StyledComment = styled.div`
  padding: 5px;
  padding-right: 15px;
  margin-left: 25px;
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

  .sub-comment-body {
    position: relative;
    min-width: 200px;
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
    font-size: 18px;

    &:hover {
      color: #777;
    }
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

function SubComment({
  comment,
  setFeed,
  homeFeed,
  postAuthor,
  setCommentCount,
  pfp,
}) {
  const currentUser = useCurrentUserContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes.length);
  const [subFormVis, setSubFormVis] = useState(false);
  const [editingComment, setCommentEditStatus] = useState(false);
  const [commentText, setCommentText] = useState(comment.text);
  const commentAuthor =
    comment.author.firstName + " " + comment.author.lastName;
  const isAuthor = comment.author._id === currentUser;
  const subCommentRef = useRef(null);

  function focusSubCommentForm() {
    subCommentRef.current.focus();
    setSubFormVis(!subFormVis);
  }

  function toggleModalVisibility() {
    setModalVisible(!modalVisible);
  }

  const toggleCommentEditStatus = () => setCommentEditStatus(!editingComment);

  const EditComponent = () => {
    return (
      <EditForm
        setCommentText={setCommentText}
        commentText={commentText}
        commentId={comment._id}
        toggleCommentEditStatus={toggleCommentEditStatus}
      />
    );
  };

  const postContent = () => <p className="content">{commentText}</p>;

  return (
    <StyledComment>
      <div className="pfp-link">
        <Link to={`/user/${comment.author._id}`} className="user">
          <ProfilePicture
            src={comment.author.profilePhotoSrc}
            userId={currentUser}
            size={"35px"}
          />
        </Link>
      </div>
      <div className="sub-comment-body">
        <Link to={`/user/${comment.author._id}`} className="user">
          {commentAuthor}
        </Link>
        {editingComment ? EditComponent() : postContent()}
        {isAuthor ? (
          <BsThreeDots
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
          postAuthor={postAuthor}
          setCommentCount={setCommentCount}
          toggleCommentEditStatus={toggleCommentEditStatus}
        />
        {likeCount > 0 ? <CommentMetrics likeCount={likeCount} /> : <div />}
      </div>
      <CommentUtils
        comment={comment._id}
        setLikeCount={setLikeCount}
        focusRef={focusSubCommentForm}
      />
      <SubCommentForm
        subFormVis={subFormVis}
        toggleVis={setSubFormVis}
        inputRef={subCommentRef}
        postId={comment.post}
        commentId={comment._id}
        parentId={comment.parentId}
        setFeed={setFeed}
        homeFeed={homeFeed}
        postAuthor={postAuthor}
        setCommentCount={setCommentCount}
        src={comment.author.profilePhotoSrc}
        pfp={pfp}
      />
    </StyledComment>
  );
}

export default SubComment;
