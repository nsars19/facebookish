import styled from "styled-components";
import { useState } from "react";

const StyledModal = styled.div`
  display: ${({ vis }) => (vis ? "flex" : "none")};
  color: ${({ vis }) => (vis ? "red" : "blue")};
  position: absolute;
  top: 0;
  right: 10px;
  color: black;
  margin-right: 20px;

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
  const {
    modalVisible,
    isPost,
    postItem,
    commentItem,
    toggleModal,
    setFeed,
    homeFeed,
    user,
    postAuthor,
  } = props;

  async function refreshFeed() {
    let response;
    if (homeFeed) {
      response = await fetch(`http://localhost:3000/posts/feed/${user}`);
    } else {
      response = await fetch(
        `http://localhost:3000/posts/byuser/${postAuthor}`
      );
    }
    const data = await response.json();
    toggleModal();
    setFeed(data);
  }

  async function deletePost() {
    const [postId, userId] = [postItem._id, user];
    const reqBody = JSON.stringify({ postId, userId });

    await fetch(`http://localhost:3000/posts/delete`, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: reqBody,
    });

    refreshFeed();
  }

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
    });

    refreshFeed();
  }

  return (
    <StyledModal vis={modalVisible}>
      <ul className="menu">
        <li
          onClick={(e) => {
            isPost ? deletePost() : deleteComment(e);
          }}
        >
          <button>Delete {isPost ? "post" : "comment"}</button>
        </li>
        <li>
          <button>Edit {isPost ? "post" : "comment"}</button>
        </li>
      </ul>
    </StyledModal>
  );
}

export default SettingsModal;
