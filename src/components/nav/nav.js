import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../../colors";
import AccountSettings from "./components/accountSettings";
import { AiFillHome } from "react-icons/ai";
import { ImUsers } from "react-icons/im";
import { IoNotifications } from "react-icons/io5";
import { BsPlusSquareFill, BsThreeDots } from "react-icons/bs";

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

  .settings {
    font-size: 28px;
    cursor: pointer;

    &:hover {
      color: ${black};
    }
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
  const [settingsModalVis, setSettingsVis] = useState(false);

  const toggleSettingsModal = () => setSettingsVis(!settingsModalVis);

  function changeColorMode() {
    setLightMode(!lightMode);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Tab") return;
    e.target.click();
  };

  return (
    <StyledNav light={lightMode}>
      <Link to="/">
        <AiFillHome />
      </Link>
      <Link to="/users">
        <ImUsers />
      </Link>
      <div className="post-icon" onClick={focusRef}>
        <BsPlusSquareFill />
      </div>
      <Link to="/home">
        <IoNotifications />
      </Link>
      <div
        onKeyDown={handleKeyDown}
        onClick={toggleSettingsModal}
        tabIndex="0"
        className="settings"
      >
        <BsThreeDots />
      </div>
      <AccountSettings
        modalVis={settingsModalVis}
        currentUser={currentUser}
        toggleVis={toggleSettingsModal}
        light={lightMode}
        changeColorMode={changeColorMode}
        setCurrentUser={setCurrentUser}
      ></AccountSettings>
    </StyledNav>
  );
}

export default Nav;
