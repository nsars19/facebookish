import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import Settings from "./../modals/settingsModal";
import { useState, useRef, useEffect } from "react";
import ProfilePicture from "./../userProfile/profilePicture";
import CommentUtils from "./commentUtils";
import CommentMetrics from "./commentMetrics";
import SubCommentForm from "./../commentForm/subCommentForm";
import Skeleton from "react-loading-skeleton";

const StyledComment = styled.div`
  padding: 5px;
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
  currentUser,
  setFeed,
  homeFeed,
  postAuthor,
  setCommentCount,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [subFormVis, setSubFormVis] = useState(false);
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

  return (
    <StyledComment>
      <div className="pfp-link">
        <Link to={`/user/${comment.author._id}`} className="user">
          <ProfilePicture userId={comment.author._id} size={"35px"} />
        </Link>
      </div>
      <div className="sub-comment-body">
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
        {likeCount > 0 ? <CommentMetrics likeCount={likeCount} /> : <div />}
      </div>
      <CommentUtils
        comment={comment}
        user={currentUser}
        setLikeCount={setLikeCount}
        focusRef={focusSubCommentForm}
      />
      <SubCommentForm
        currentUser={currentUser}
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
      />
    </StyledComment>
  );
}

export default SubComment;
