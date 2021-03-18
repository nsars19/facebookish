import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../../colors";
import Toggle from "./components/toggle";

const { black, white, red } = colors;

const StyledNav = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  background: ${red};
  transition: background 0.4s ease, color 0.4s ease;
  color: ${({ light }) => (light ? black : white)};
  font-weight: 600;
  letter-spacing: 1.2px;

  a {
    color: ${white};
    padding: 10px;
    text-decoration: none;

    &:visited {
      color: inherit;
    }

    &:hover,
    &:active {
      background: ${({ light }) => (light ? black : white)};
      color: ${({ light }) => (light ? white : black)};
      // box-shadow: -4px 4px 0 ${({ light }) => (light ? white : black)};
      transition: color 0.5s ease, box-shadow 0.2s ease;
      font-weight: 600;
    }
  }
`;

function Nav(props) {
  const { setLightMode, lightMode } = props;

  function changeColorMode() {
    setLightMode(!lightMode);
  }

  return (
    <StyledNav light={lightMode}>
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
      <Link to="/profile">My Profile</Link>
      <Toggle
        colors={colors}
        light={lightMode}
        changeColorMode={changeColorMode}
      />
    </StyledNav>
  );
}

export default Nav;
