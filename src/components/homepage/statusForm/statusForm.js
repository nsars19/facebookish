import { useState } from "react";
import styled from "styled-components";
import PostIcons from "./postIcons";
import ImageHandlerModal from "./../../imageHandler/imageHandlerModal";
import Form from "./form";

const StyledStatusForm = styled.div`
  background: ${({ lm, g }) => (lm ? "#eee" : g)};
  border: 1px solid ${({ lm, g, w }) => (lm ? g : w)}11;
  padding: 18px;
  padding-bottom: 6px;
  border-radius: 8px;
  margin: 10px auto;
  margin-bottom: 0;
  position: relative;
  width: 95%;
  max-width: 750px;
  box-shadow: 0 0.1px 0.8px rgba(0, 0, 0, 0.02),
    0 0.1px 1.9px rgba(0, 0, 0, 0.028), 0 0.3px 3.5px rgba(0, 0, 0, 0.035),
    0 0.4px 6.3px rgba(0, 0, 0, 0.042), 0 0.8px 11.7px rgba(0, 0, 0, 0.05);

  form {
    display: flex;
    flex-flow: column nowrap;
  }

  .wrap {
    display: flex;
  }

  .pfp {
    margin-right: 10px;
  }

  input[type="text"] {
    background: ${({ lm }) => (lm ? "#d8d8d8" : "#707070")};
    padding-left: 10px;
    border-style: none;
    border-radius: 18px;
    height: 37px;
    width: 100%;
    opacity: 60%;
    color: ${({ lm }) => (lm ? "#000" : "#fff")};

    &:focus {
      outline: none;
    }
  }

  .txt-form {
    padding-bottom: 10px;
    border-bottom: 1px solid gray;
    border-bottom: 1px solid gray;
  }

  .placeholder {
    color: ${({ lm, g, w }) => (lm ? g : w)}aa;
    position: absolute;
    top: 28px;
    left: 75px;
    font-size: 15px;
    transition: top 0.2s ease, left 0.2s ease, font-size 0.2s ease;
    pointer-events: none;
  }

  input[type="text"]:focus + div.placeholder {
    color: ${({ lm, g, w }) => (lm ? g : w)};
    font-size: 12px;
    top: 2px;
    left: 70px;
    transition: top 0.2s ease, left 0.2s ease, font-size 0.2s ease;
  }

  #moved {
    top: 2px;
    left: 70px;
    color: ${({ lm, g, w }) => (lm ? g : w)};
    font-size: 12px;
    transition: top 0.2s ease, left 0.2s ease, font-size 0.2s ease;
  }

  p {
    font-size: 12px;
    padding-top: 3px;
    padding-left: 57px;
  }

  .post-types {
    display: grid;
    grid-auto-flow: column;
    margin-top: 7px;
  }

  .post-icon {
    display: grid;
    grid-auto-flow: column;
    justify-content: center;
    font-size: 28px;
    cursor: pointer;
    padding: 5px 0;
    border-radius: 8px;

    &:hover,
    &:active {
      background: #707070aa;
    }

    p {
      padding: 0;
      padding-left: 5px;
      width: fit-content;
      justify-self: start;
      align-self: center;
      font-size: 15px;
      font-weight: bold;
    }
  }
`;

function StatusForm({
  colors,
  postRef,
  currentUser,
  lightMode,
  setFeed,
  homeFeed,
  src,
  fromProfile,
}) {
  const [text, setText] = useState("");
  const [modalVis, setImgModalVis] = useState(false);
  const { black, gray, white, red, yellow } = colors;

  const focusRef = () => postRef.current.focus();

  const toggleImgModal = () => setImgModalVis(!modalVis);

  async function handleSubmit(e) {
    e.preventDefault();

    // Prevent posting empty content
    if (!text) return;

    const formData = { homeFeed, text, author: currentUser };
    const reqBody = JSON.stringify(formData);

    // Response returns the updated posts from the create method of the post controller.
    // This is to help minimize requests.
    const res = await fetch(`http://localhost:3000/posts/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: reqBody,
    });

    const data = await res.json();
    setFeed(data);

    setText("");
    postRef.current.blur();
  }

  const textIsEmpty = () => text === "";

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <StyledStatusForm
        r={red}
        y={yellow}
        b={black}
        g={gray}
        w={white}
        lm={lightMode}
        textIsEmpty={textIsEmpty()}
        className="grid-status-form"
      >
        <Form
          handleSubmit={handleSubmit}
          src={src}
          currentUser={currentUser}
          handleInputChange={handleInputChange}
          text={text}
          postRef={postRef}
        />
        <PostIcons toggleImgModal={toggleImgModal} focusRef={focusRef} />
        <ImageHandlerModal
          toggle={toggleImgModal}
          user={currentUser}
          vis={modalVis}
          setFeed={setFeed}
          postInput
        />
      </StyledStatusForm>
    </>
  );
}

export default StatusForm;
