import styled from "styled-components";
import colors from "./../../colors";

const StyledEditForm = styled.form`
  width: 100%;
  margin-left: 10px;
  padding-right: 10px;
  input[type="text"] {
    width: 100%;
    flex: 1;
    height: 35px;
    padding-left: 10px;
    padding-right: 10px;
    border-style: none;
    border-radius: 18px;
    background: #707070;
    color: ${colors.white};
    font-size: 14px;
  }
  p {
    font-size: 12px;
    margin-top: 5px;
  }
  input.comment-input {
    margin-top: 5px;
    border: 1px solid #a0a0a0;
  }
`;

function EditForm(props) {
  const {
    setPostText,
    postText,
    togglePostEdit,
    postId,
    isPost,
    setCommentText,
    commentText,
    toggleCommentEditStatus,
    commentId,
  } = props;

  const setText = (text) => (isPost ? setPostText(text) : setCommentText(text));
  const toggleEditForm = () =>
    isPost ? togglePostEdit() : toggleCommentEditStatus();

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const newData = e.target.firstElementChild.value;
    const bodyData = isPost ? { postId, newData } : { commentId, newData };
    const body = JSON.stringify(bodyData);

    const res = await fetch(
      `http://localhost:3000/${isPost ? "posts" : "comments"}/update`,
      {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body,
      }
    );

    const data = await res.json();

    setText(data.text);
    toggleEditForm();
  };

  return (
    <StyledEditForm onSubmit={handleEditSubmit}>
      <input
        type="text"
        className={isPost ? "post-input" : "comment-input"}
        defaultValue={isPost ? postText : commentText}
        id="edit-form"
      />
      <p>Press enter to submit.</p>
    </StyledEditForm>
  );
}

export default EditForm;
