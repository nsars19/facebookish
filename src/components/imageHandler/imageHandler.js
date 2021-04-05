import { useState } from "react";
import styled from "styled-components";
import { AiFillPicture } from "react-icons/ai";
import colors from "./../../colors";

const StyledHandler = styled.form`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 500px;
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

  img {
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
    width: 75%;
    min-height: 35px;
    max-width: 400px;
    font-size: 14px;
    margin-bottom: 15px;

    &:hover {
      opacity: 70%;
    }
  }
`;

function ImageHandler({ user, toggleOff, profile, setFeed }) {
  const [imgFile, setImage] = useState(null);
  const [src, setSrc] = useState(null);
  const [text, setText] = useState("");

  const handleImgInput = (e) => {
    setImage(e.target.files[0]);
    setSrc(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imgFile) return;

    const formData = new FormData();
    formData.append("file", imgFile);
    formData.append("text", text);

    const url = `http://localhost:3000/upload/${
      profile ? "profile" : "posts"
    }/${user}`;

    const res = await fetch(url, {
      method: "post",
      body: formData,
    });

    const data = await res.json();

    if (!profile) setFeed(data);

    clearHandler();
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
    >
      <input
        type="file"
        name="file"
        id="file"
        accept=".png, .jpeg, .jpg"
        onChange={handleImgInput}
      />
      <label htmlFor="file">
        <AiFillPicture className="upload-icon icon" />
        <p className="upload-txt">Upload an image</p>
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
        />
      )}
      <img src={src} alt="" />
      <input
        type="submit"
        value={profile ? "Change profile picture" : "Post"}
      />
      <button id="esc" onClick={clearHandler}>
        <span />
        <span />
      </button>
    </StyledHandler>
  );
}

export default ImageHandler;
