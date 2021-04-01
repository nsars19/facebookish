import { useState, useEffect } from "react";
import styled from "styled-components";

const StyledStatusForm = styled.div`
  background: ${({ g }) => g}22;
  padding: 20px;
  margin: 20px;
  form {
    display: flex;
    flex-flow: column wrap;
  }

  input[type="text"] {
    border-style: none;
    transition: all 0.6s ease;
    border: 0px solid transparent;
    height: 50px;
    width: 100%;
    &:focus {
      // border: 20px solid transparent;
      height: 100px;
      width: 100%;
    }
  }
  input[type="submit"] {
    padding: 7px;
    border-style: none;
    border: 2px solid ${({ b }) => b};
    background: ${({ g }) => g}44;
  }
`;

function StatusForm({ colors, currentUser, setFeed, homeFeed }) {
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

    e.target.firstElementChild.value = "";
  }

  return (
    <StyledStatusForm r={red} y={yellow} b={black} g={gray}>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="What's on your mind, govnuh?" />
        <input type="submit" value="Submit post" />
      </form>
    </StyledStatusForm>
  );
}

export default StatusForm;
