import { useState, useEffect } from "react";
import styled from "styled-components";
import ProfilePicture from "./../../userProfile/profilePicture";

const StyledStatusForm = styled.div`
  background: ${({ lm, g }) => (lm ? "#d8d8d8" : g)};
  border: 1px solid ${({ lm, g, w }) => (lm ? g : w)}11;
  padding: 18px;
  padding-bottom: 8px;
  border-radius: 8px;
  margin: 10px auto;
  position: relative;
  transition: width 0.2s ease-in-out;
  width: 95%;
  max-width: 750px;

  form {
    display: flex;
    flex-flow: column wrap;
  }

  .wrap {
    display: flex;
  }

  .pfp {
    margin-right: 10px;
  }

  input[type="text"] {
    padding-left: 10px;
    border-style: none;
    border-radius: 18px;
    height: 37px;
    width: 100%;
    opacity: 60%;

    &:focus {
      outline: none;
    }
  }

  .placeholder {
    color: ${({ lm, g }) => (lm ? g + "aa" : g)};
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
`;

function StatusForm({ colors, currentUser, lightMode, setFeed, homeFeed }) {
  const [text, setText] = useState("");
  const { black, gray, white, red, yellow } = colors;
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
  }

  const textIsEmpty = () => text === "";

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  return (
    <StyledStatusForm
      r={red}
      y={yellow}
      b={black}
      g={gray}
      w={white}
      lm={lightMode}
      textIsEmpty={textIsEmpty()}
    >
      <form onSubmit={handleSubmit}>
        <div className="wrap">
          <div className="pfp">
            <ProfilePicture userId={currentUser} size={"37px"} />
          </div>
          <input type="text" onChange={handleInputChange} value={text} />
          <div className="placeholder" id={text ? "moved" : " "}>
            What's on your mind?
          </div>
        </div>
        <p>Hit enter to post</p>
      </form>
    </StyledStatusForm>
  );
}

export default StatusForm;
