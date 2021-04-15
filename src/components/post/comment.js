import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import Settings from "./../modals/settingsModal";
import { useState, useRef } from "react";
import ProfilePicture from "./../userProfile/profilePicture";
import CommentUtils from "./commentUtils";
import CommentMetrics from "./commentMetrics";
import SubCommentForm from "./../commentForm/subCommentForm";
import SubComment from "./subComment";
import EditForm from "./editForm";

const StyledComment = styled.div`
  padding: 0 5px;
  margin-left: 10px;
  margin-right: 10px;
  position: relative;
  display: grid;
  grid-template-columns: 35px auto;
  grid-template-rows: 1fr auto;
  column-gap: 10px;

  &:first-child {
    margin-top: 10px;
  }

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

  .sub-comments {
    margin-top: ${({ subFormVis }) => (subFormVis ? "50px" : "0")};
    margin-left: -20px;
  }
`;

function Comment({
  comment,
  currentUser,
  setFeed,
  homeFeed,
  postAuthor,
  setCommentCount,
  pfp,
}) {
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
    <>
      <StyledComment className="comment" subFormVis={subFormVis}>
        <div className="pfp-link">
          <Link to={`/user/${comment.author._id}`} className="user">
            <ProfilePicture
              src={comment.author.profilePhotoSrc}
              userId={comment.author._id}
              size={"35px"}
            />
          </Link>
        </div>
        <div className="comment-body">
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
            user={currentUser}
            postAuthor={postAuthor}
            setCommentCount={setCommentCount}
            toggleCommentEditStatus={toggleCommentEditStatus}
          />
          {likeCount > 0 ? <CommentMetrics likeCount={likeCount} /> : <div />}
        </div>
        <CommentUtils
          comment={comment._id}
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
          parentId={comment._id}
          setFeed={setFeed}
          homeFeed={homeFeed}
          postAuthor={postAuthor}
          setCommentCount={setCommentCount}
          pfp={pfp}
        />
      </StyledComment>
      <div className="sub-comments">
        {comment.comments.map((subComment) => (
          <div key={subComment._id} className="sub-comment">
            <SubComment
              postAuthor={postAuthor}
              comment={subComment}
              parentId={subComment.parentId}
              currentUser={currentUser}
              setFeed={setFeed}
              homeFeed={homeFeed}
              setCommentCount={setCommentCount}
              pfp={pfp}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Comment;
