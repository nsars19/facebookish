import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import Settings from "./../modals/settingsModal";
import { useState, useRef } from "react";
import ProfilePicture from "./../userProfile/profilePicture";
import CommentUtils from "./commentUtils";
import CommentMetrics from "./commentMetrics";
import SubCommentForm from "./../commentForm/subCommentForm";
import SubComment from "./subComment";

const StyledComment = styled.div`
  padding: 5px;
  margin: 5px 0;
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

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const commentId = comment._id;
    const newData = e.target.firstElementChild.value;
    const reqBody = JSON.stringify({ commentId, newData });

    const res = await fetch("http://localhost:3000/comments/update", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: reqBody,
    });
    const data = await res.json();

    setCommentText(data.text);
    toggleCommentEditStatus();
  };

  const editForm = () => {
    return (
      <form onSubmit={handleEditSubmit} className="edit-form-comment">
        <input type="text" defaultValue={commentText} />
        <p>Hit enter to submit.</p>
      </form>
    );
  };

  const postContent = () => <p className="content">{commentText}</p>;

  return (
    <>
      <StyledComment className="comment" subFormVis={subFormVis}>
        <div className="pfp-link">
          <Link to={`/user/${comment.author._id}`} className="user">
            <ProfilePicture userId={comment.author._id} size={"35px"} />
          </Link>
        </div>
        <div className="comment-body">
          <Link to={`/user/${comment.author._id}`} className="user">
            {commentAuthor}
          </Link>
          {editingComment ? editForm() : postContent()}
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
            toggleCommentEditStatus={toggleCommentEditStatus}
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
          parentId={comment._id}
          setFeed={setFeed}
          homeFeed={homeFeed}
          postAuthor={postAuthor}
          setCommentCount={setCommentCount}
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
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Comment;
