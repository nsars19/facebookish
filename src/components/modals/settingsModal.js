import styled from "styled-components";
import { useState } from "react";

const StyledModal = styled.div`
  display: ${({ vis }) => (vis ? "flex" : "none")};
  color: ${({ vis }) => (vis ? "red" : "blue")};
  position: absolute;
  top: 0;
  right: 0;
  color: black;
  margin-right: 20px;
  animation: comeFromRight 0.3s ease;

  @keyframes comeFromRight {
    0% {
      opacity: 0;
      right: -20px;
    }
    75% {
      opacity: 90%;
    }
    100% {
      right: 0px;
    }
  }

  ul {
    list-style: none;
    border: 2px solid #393ac4;
    background: #393a64;
    z-index: 2;
  }
  li {
    padding: 8px;
    border-top: 1px solid gray;

    &:first-child {
      border-top: none;
    }

    &:hover {
      background: #393aff;
    }

    button {
      border-style: none;
      background: transparent;
      color: inherit;
    }
  }
`;

function SettingsModal(props) {
  const [deleted, setDeleteStatus] = useState(false);
  const { modalVisible, isPost, postItem, commentItem, toggleModal } = props;

  async function deleteComment(e) {
    const [post, author, commentId] = [
      commentItem.post,
      commentItem.author._id,
      commentItem._id,
    ];
    const reqBody = JSON.stringify({ post, author, commentId });

    await fetch("http://localhost:3000/comments/delete", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: reqBody,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    toggleModal();
  }

  return (
    <StyledModal vis={modalVisible}>
      <ul className="menu">
        <li
          onClick={(e) => {
            isPost ? toggleModal() : deleteComment(e);
          }}
        >
          <button disabled={deleted}>
            Delete {isPost ? "post" : "comment"}
          </button>
        </li>
        <li>
          <button>Edit {isPost ? "post" : "comment"}</button>
        </li>
      </ul>
    </StyledModal>
  );
}

export default SettingsModal;
