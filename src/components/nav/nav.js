import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../../colors";
import Toggle from "./components/toggle";
import { AiFillHome } from "react-icons/ai";
import { ImUsers } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { IoNotifications } from "react-icons/io5";
import { BsPlusSquareFill } from "react-icons/bs";

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

  a {
    display: flex;
    align-items: center;
    color: ${white};
    padding: 10px;
    text-decoration: none;
    font-size: 24px;

    &:visited {
      color: inherit;
    }

    &:hover,
    &:active {
      color: ${black};
      transition: color 50ms ease;
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
      <Link to="/">
        <AiFillHome />
      </Link>
      <Link to="/users">
        <ImUsers />
      </Link>
      <Link to="/home">
        <BsPlusSquareFill />
      </Link>
      <Link to="/profile">
        <CgProfile />
      </Link>
      <Link to="/home">
        <IoNotifications />
      </Link>
      <Toggle
        colors={colors}
        light={lightMode}
        changeColorMode={changeColorMode}
      />
    </StyledNav>
  );
}

export default Nav;
