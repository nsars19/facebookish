import { useState } from "react";
import styled from "styled-components";
import { AiFillPicture } from "react-icons/ai";
import colors from "./../../colors";
import Cookies from "universal-cookie";
import Spinner from "./../spinner/spinner";

const StyledHandler = styled.form`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 400px;
  max-height: 90vh;
  padding-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 0.1px 0.8px rgba(0, 0, 0, 0.02),
    0 0.1px 1.9px rgba(0, 0, 0, 0.028), 0 0.3px 3.5px rgba(0, 0, 0, 0.035),
    0 0.4px 6.3px rgba(0, 0, 0, 0.042), 0 0.8px 11.7px rgba(0, 0, 0, 0.05);

  input[type="file"] {
    display: none;
  }

  .icon {
    font-size: 100px;
    cursor: pointer;
    color: ${colors.blue};
    justify-self: center;
  }

  label {
    height: fit-content;
    width: fit-content;
    display: grid;
    flex-direction: column;
    grid-auto-flow: row;
    justify-content: center;
    margin-bottom: 10px;

    p.upload-txt {
      padding: 0;
      text-align: center;
      font-size: 14px;

      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }

  input[type="submit"] {
    margin-top: 20px;
    width: 95%;
    max-width: 400px;
    font-size: 18px;
    padding: 10px;

    &:hover,
    &:active {
      background: ${colors.blue};
      cursor: pointer;
    }
  }

  img[src] {
    margin-top: 15px;
    max-width: 95%;
    max-height: 300px;
  }

  #esc {
    position: absolute;
    top: 10px;
    right: 10px;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover,
    &:active {
      opacity: 80%;
    }

    span {
      display: block;
      height: 2px;
      width: 25px;
      background: ${colors.gray};
      border-radius: 8px;

      &:first-child {
        transform: rotate(45deg);
        position: absolute;
        left: 8px;
      }

      &:last-child {
        transform: rotate(-45deg);
        position: absolute;
        left: 8px;
      }
    }
  }

  input#img-text-input {
    width: 95%;
    min-height: 35px;
    max-width: 400px;
    font-size: 14px;

    &:hover {
      opacity: 70%;
    }
  }

  .spinner {
    position: absolute;
    bottom: 26px;
    left: ${({ pfp }) => (pfp ? "10%" : "33%")};
  }

  @media (min-width: 420px) {
    .spinner {
      left: ${({ pfp }) => (pfp ? "16%" : "36%")};
    }
  }
  @media (min-width: 520px) {
    .spinner {
      left: ${({ pfp }) => (pfp ? "20%" : "150px")};
    }
  }
`;
const cookies = new Cookies();

function ImageHandler({
  user,
  toggleOff,
  profile,
  setFeed,
  setUpdateStatus,
  postInput,
}) {
  const [imgFile, setImage] = useState(null);
  const [src, setSrc] = useState(null);
  const [text, setText] = useState("");
  const [spinnerVis, setSpinnerVis] = useState(false);
  const token = cookies.get("token");

  const handleImgInput = (e) => {
    setImage(e.target.files[0]);
    setSrc(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imgFile) return;

    setSpinnerVis(true);

    const formData = new FormData();
    formData.append("file", imgFile);
    formData.append("text", text);

    const url = `https://frozen-thicket-71687.herokuapp.com/upload/${
      profile ? "profile" : "posts"
    }/${user}`;

    await fetch(url, {
      method: "post",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!profile) setFeed(data);
        if (profile) setUpdateStatus(true);

        clearHandler();
        setSpinnerVis(false);
      })
      .catch((err) => console.error(err));
  };

  const clearHandler = () => {
    toggleOff();
    setImage(null);
    setSrc(null);
    setText("");
  };

  const handleInputChange = (e) => setText(e.target.value);

  return (
    <StyledHandler
      id="img-form"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="modal-component"
      pfp={profile}
    >
      <input
        type="file"
        name={postInput ? "post-file" : "file"}
        id={postInput ? "post-file" : "file"}
        accept=".png, .jpeg, .jpg"
        onChange={handleImgInput}
        className="modal-component"
      />
      <label
        htmlFor={postInput ? "post-file" : "file"}
        className="modal-component"
      >
        <AiFillPicture className="upload-icon icon modal-component" />
        <p className="upload-txt modal-component">Upload an image</p>
      </label>
      {profile ? (
        <div />
      ) : (
        <input
          type="text"
          id="img-text-input"
          placeholder="What's on your mind?"
          onChange={handleInputChange}
          value={text}
          className="modal-component"
        />
      )}
      <img src={src} alt="" className="modal-component" />
      <input
        type="submit"
        value={profile ? "Change profile picture" : "Post"}
        className="modal-component"
        disabled={spinnerVis}
      />
      <Spinner className="spinner" vis={spinnerVis} />
      <button id="esc" onClick={clearHandler} className="modal-component">
        <span />
        <span />
      </button>
    </StyledHandler>
  );
}

export default ImageHandler;
