import styled from "styled-components";
import getCommentCount from "./../../utils/getCommentCount";
import { AiFillEdit } from "react-icons/ai";
import { RiChatDeleteFill } from "react-icons/ri";
import Cookies from "universal-cookie";
import Spinner from "./../spinner/spinner";
import { useEffect, useState } from "react";

const StyledModal = styled.div`
  display: ${({ vis }) => (vis ? "flex" : "none")};
  color: ${({ vis }) => (vis ? "red" : "blue")};
  position: absolute;
  top: 0;
  right: 10px;
  color: black;
  margin-right: 20px;
  z-index: 3;

  ul {
    list-style: none;
    border-radius: 6px;
    z-index: 2;
    box-shadow: 0 0.3px 0.9px rgba(0, 0, 0, 0.073),
      0 0.9px 2.3px rgba(0, 0, 0, 0.106), 0 1.8px 4.8px rgba(0, 0, 0, 0.124),
      0 3.7px 9.9px rgba(0, 0, 0, 0.139), 0 10px 27px rgba(0, 0, 0, 0.19);
  }
  li {
    display: flex;
    align-items: center;
    padding: 5px;

    svg {
      font-size: 18px;
    }
    &:first-child {
      border-radius: 6px 6px 0 0;
    }

    &:last-child {
      border-radius: 0 0 6px 6px;
    }

    button {
      border-style: none;
      background: transparent;
      color: inherit;
      font-weight: bold;
      font-size: 14px;
    }
  }

  li.spacer {
    border-bottom: 1px solid gray;
    height: 0;
    padding: 0;
    margin: 0 5px;
  }

  li .content {
    display: flex;
    align-items: center;
    padding: 6px;
    width: 100%;
    border-radius: 6px;
  }

  li .content.del {
    margin-top: 0;
  }

  .icon {
    display: ${({ spinnerVis }) => (spinnerVis ? "none" : "flex")};
  }
`;

const cookies = new Cookies();

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
    togglePostEdit,
    toggleCommentEditStatus,
  } = props;

  const [spinnerVis, setSpinnerVis] = useState(false);
  const token = cookies.get("token");

  const toggleSettingsOff = () => {
    if (modalVisible) toggleModal();
  };

  useEffect(() => {
    window.addEventListener("click", toggleSettingsOff);

    return () => {
      window.removeEventListener("click", toggleSettingsOff);
    };
  });

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
    const reqBody = JSON.stringify({ postId: postItem._id });

    await fetch(`http://localhost:3000/posts/delete`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: reqBody,
    })
      .then(() => {
        setSpinnerVis(false);
        toggleModal();
      })
      .catch((err) => console.error(err));

    refreshFeed();
  }

  async function deleteComment(e) {
    const [post, commentId, parentId] = [
      commentItem.post,
      commentItem._id,
      commentItem.parentId,
    ];
    const reqBodyData = parentId
      ? { post, commentId, parentId }
      : { post, commentId };
    const reqBody = JSON.stringify(reqBodyData);
    const res = await fetch("http://localhost:3000/comments/delete", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: reqBody,
    }).catch((err) => console.error(err));

    const data = await res.json();

    setCommentCount(getCommentCount(data.comments));
    refreshFeed();
  }

  return (
    <StyledModal vis={modalVisible} spinnerVis={spinnerVis}>
      <ul className="menu">
        <li
          onClick={() => {
            isPost ? togglePostEdit() : toggleCommentEditStatus();
            toggleModal();
          }}
        >
          <div className="content">
            <AiFillEdit />
            <button>Edit {isPost ? "post" : "comment"}</button>
          </div>
        </li>
        <li className="spacer" />
        <li
          onClick={(e) => {
            setSpinnerVis(true);
            isPost ? deletePost() : deleteComment(e);
          }}
        >
          <div className="content del">
            <RiChatDeleteFill className="icon" />
            <Spinner className="spinner" vis={spinnerVis} />
            <button>Delete {isPost ? "post" : "comment"}</button>
          </div>
        </li>
      </ul>
    </StyledModal>
  );
}

export default SettingsModal;
