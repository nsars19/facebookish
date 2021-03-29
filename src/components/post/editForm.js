import styled from "styled-components";

const StyledEditForm = styled.form``;

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
      <input type="text" defaultValue={isPost ? postText : commentText} />
      <p>Hit enter to submit.</p>
    </StyledEditForm>
  );
}

export default EditForm;
