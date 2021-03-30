import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProfilePicture from "./../../userProfile/profilePicture";
import Toggle from "./toggle";
import colors from "./../../../colors";
const { black, gray, white } = colors;

const StyledSettings = styled.div`
  display: ${({ vis }) => (vis ? "grid" : "none")};
  position: fixed;
  bottom: 55px;
  right: 0;
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

  .color-mode {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding: 0 8px;
    border-radius: 8px;
    margin-top: 5px;

    &:hover {
      background: ${({ light }) => (light ? gray : white)}33;
      cursor: pointer;
    }
  }
`;

function AccountSettings({
  modalVis,
  currentUser,
  toggleVis,
  light,
  changeColorMode,
  children,
}) {
  const [userData, setData] = useState(null);
  const [fullName, setFullName] = useState(null);

  useEffect(() => {
    (async function fetchUserData() {
      const res = await fetch(`http://localhost:3000/users/${currentUser}`);
      const data = await res.json();

      setData(data);
      setFullName(`${data.firstName} ${data.lastName}`);
    })();
  }, [currentUser]);

  return (
    <StyledSettings vis={modalVis} light={light} id="settings-modal">
      <Link to="/profile" className="name-container" onClick={toggleVis}>
        <div className="pfp">
          <ProfilePicture userId={currentUser} size={"60px"} />
        </div>
        <div className="name-container-right">
          <h3>{fullName}</h3>
          <p>See your profile</p>
        </div>
      </Link>
      <div className="spacer" />
      <div className="color-mode" onClick={changeColorMode}>
        <p>Toggle color mode:</p>
        <Toggle colors={colors} light={light} />
      </div>
    </StyledSettings>
  );
}

export default AccountSettings;