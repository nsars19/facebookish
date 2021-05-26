import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProfilePicture from "./../../userProfile/profilePicture";
import Toggle from "./toggle";
import { IoLogOutOutline } from "react-icons/io5";
import colors from "./../../../colors";
import Cookies from "universal-cookie";
import {
  useUpdateTheme,
  useThemeColor,
} from "./../../themeContext/themeContext";
import { useCurrentUserContext } from "./../../userContext/userContext";
const { black, gray, white } = colors;

const StyledSettings = styled.div`
  display: ${({ vis }) => (vis ? "grid" : "none")};
  position: fixed;
  bottom: 55px;
  right: 10px;
  width: 300px;
  background: ${({ light }) => (light ? white : gray)};
  padding: 8px;
  border: 1px solid ${({ light }) => (light ? black : white)}55;
  border-radius: 8px;
  color: ${({ light }) => (light ? black : white)};

  a {
    padding: 0;

    &:hover {
      color: ${({ light }) => (light ? black : white)};
    }
  }

  .name-container {
    display: flex;
    padding: 8px;
    border-radius: 8px;

    .pfp {
      margin-right: 10px;
    }

    h3 {
      font-size: 16px;
    }

    p {
      color: ${({ light }) => (light ? black : white + "aa")};
      font-size: 14px;
      font-weight: 400;
    }

    &-right {
      display: grid;
      gap: 5px;
      align-content: space between;
      align-self: center;
      word-break: break-word;
    }

    &:hover,
    &:active {
      background: ${({ light }) => (light ? gray : white)}33;
      color: ${({ light }) => (light ? black : white)};
    }
  }

  .spacer {
    height: 10px;
    margin: 0 10px;
    border-bottom: 1px solid ${({ light }) => (light ? black : white)}33;
  }

  ul li {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: start;
    font-size: 14px;
    padding 0 8px;
    border-radius: 8px;
    margin-top: 5px;

    .icon {
      width: 50px;
      display: flex;
      justify-content: start;
      font-size: 24px;
    }

    &:hover,
    &:active {
      background: ${({ light }) => (light ? gray : white)}33;
      cursor: pointer;
    }

    .logout-icon {
      font-size: 24px;
    }
  }
`;

const cookies = new Cookies();

function AccountSettings({ modalVis, toggleVis, userName, pfp }) {
  const toggleTheme = useUpdateTheme();
  const lightMode = useThemeColor();
  const currentUser = useCurrentUserContext();

  const toggleModalOff = (e) => {
    if ([...e.target.classList].includes("modal-component")) return;
    if (modalVis) toggleVis();
  };

  useEffect(() => {
    document.querySelector("body").addEventListener("click", toggleModalOff);

    return () => {
      document
        .querySelector("body")
        .removeEventListener("click", toggleModalOff);
    };
  });

  const handleLogout = () => {
    cookies.set("currentUser", null);
    cookies.set("token", null);
    window.location.href = window.location.origin + "/facebookish";
  };

  return (
    <StyledSettings
      vis={modalVis}
      light={lightMode}
      id="settings-modal"
      className="modal-component"
    >
      <Link
        to="/profile"
        className="name-container modal-component"
        onClick={toggleVis}
      >
        <div className="pfp">
          <ProfilePicture src={pfp} userId={currentUser} size={"60px"} />
        </div>
        <div className="name-container-right modal-component">
          <h3>{userName}</h3>
          <p>See your profile</p>
        </div>
      </Link>
      <div className="spacer modal-component" />
      <ul className="modal-component">
        <li onClick={toggleTheme} className="modal-component">
          <div className="icon">
            <Toggle colors={colors} light={lightMode} />
          </div>
          <p className="modal-component">Toggle color mode</p>
        </li>
        <li onClick={handleLogout} className="logout modal-component">
          <div className="icon">
            <IoLogOutOutline />
          </div>
          <p>Logout</p>
        </li>
      </ul>
    </StyledSettings>
  );
}

export default AccountSettings;
