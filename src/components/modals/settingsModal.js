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
    border: 1px solid #a0a0a0;
    border-radius: 6px;
    z-index: 2;
    box-shadow: 0 0.3px 0.9px rgba(0, 0, 0, 0.073),
      0 0.9px 2.3px rgba(0, 0, 0, 0.106), 0 1.8px 4.8px rgba(0, 0, 0, 0.124),
      0 3.7px 9.9px rgba(0, 0, 0, 0.139), 0 10px 27px rgba(0, 0, 0, 0.19);
  }
  li {
    padding: 8px;
    border-top: 1px solid gray;

    &:first-child {
      border-top: none;
      border-radius: 6px 6px 0 0;
    }

    &:last-child {
      border-radius: 0 0 6px 6px;
    }

    &:hover,
    &:active {
      background: ${colors.white};
      color: ${colors.black};
    }

    button {
      border-style: none;
      background: transparent;
      color: inherit;
      font-weight: bold;
      font-size: 14px;
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
    setCommentCount,
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

    const res = await fetch("http://localhost:3000/comments/delete", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: reqBody,
    });
    const data = await res.json();

    setCommentCount(data.comments.length);
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
