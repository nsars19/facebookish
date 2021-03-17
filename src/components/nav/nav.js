import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../../colors";
import Toggle from "./components/toggle";

const { black, gray, white, yellow, red } = colors;

const StyledNav = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  background: ${red};
  transition: background 0.4s ease, color 0.4s ease;
  color: ${white};
  font-weight: 500;
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
      background: ${white};
      color: ${black};
    }
  }

  .toggle {
    cursor: pointer;
    position: relative;
  }
  .rail {
    background: ${({ light }) => (light ? gray : white)};
    width: 35px;
    height: 12px;
    border-radius: 25px;
    transition: background 0.6s ease ${({ light }) => (light ? "0.5s" : "0.3s")};
  }
  .ball {
    background: ${({ light }) => (light ? white : gray)};
    height: 18px;
    width: 18px;
    border-radius: 50%;
    // Box shadow prevents choppiness while transitioning
    box-shadow: 0px 0px 0px transparent;
    position: absolute;
    top: -3px;
    left: ${({ light }) => (light ? "20px" : "-2px")};
    transition: left 0.6s cubic-bezier(1, -0.45, 0, 1),
      background 0.6s ease 0.5s, box-shadow 0.3s ease 0.3s;
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
