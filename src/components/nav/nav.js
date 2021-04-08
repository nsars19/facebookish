import React, { useState } from "react";
import styled from "styled-components";
import colors from "../../colors";
import MainAccountSettings from "./components/mainAccountSettings";
import CreatePost from "./components/createPost";
import Notifications from "./components/notifications";
import HomeLink from "./components/home";
import UsersLink from "./components/users";

const { black, white, blue } = colors;

const StyledNav = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  background: ${blue};
  transition: background 0.4s ease, color 0.4s ease;
  color: ${white};
  font-weight: 600;
  letter-spacing: 1.2px;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;

  .post-icon {
    display: flex;
    align-items: center;
    font-size: 24px;
    cursor: pointer;
    padding: 10px;

    &:hover:not(.name-container),
    &:active:not(.name-container) {
      color: ${black};
      transition: color 50ms ease;
      font-weight: 600;
    }
  }

  a,
  a:visited {
    display: flex;
    align-items: center;
    padding: 10px;
    text-decoration: none;
    font-size: 24px;
    color: inherit;

    &:hover:not(.name-container),
    &:active:not(.name-container) {
      color: ${black};
      transition: color 50ms ease;
      font-weight: 600;
    }
  }

  .notifs,
  .settings {
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover,
    &:active {
      color: ${black};
    }
  }
  .settings {
    font-size: 28px;
  }

  .notifs {
    font-size: 24px;
  }
`;

function Nav(props) {
  const {
    setLightMode,
    lightMode,
    currentUser,
    setCurrentUser,
    focusRef,
  } = props;

  function changeColorMode() {
    setLightMode(!lightMode);
  }

  return (
    <StyledNav light={lightMode}>
      <HomeLink />
      <UsersLink />
      <CreatePost focusRef={focusRef} />
      <Notifications currentUser={currentUser} />
      <MainAccountSettings
        currentUser={currentUser}
        lightMode={lightMode}
        changeColorMode={changeColorMode}
        setCurrentUser={setCurrentUser}
      />
    </StyledNav>
  );
}

export default Nav;
