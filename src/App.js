import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import colors from "./colors";
import Nav from "./components/nav/nav";
import UserProfile from "./components/userProfile/UserProfile";
import Users from "./components/users/Users";
import Cookies from "universal-cookie";
import HomePage from "./components/homepage/homepage";
import Profile from "./components/profile/profile";
import { createGlobalStyle } from "styled-components";

const { black, gray, white, yellow, blue } = colors;
const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ light }) => (light ? white : black)};
    color: ${({ light }) => (light ? black : white)};

    a,
    a:visited {
      color: ${({ light }) => (light ? black : white)};
    }
    div.postItem {
      background: ${({ light }) => (light ? white : gray)};
    }
    div.comment-body,
    div.sub-comment-body {
      background: ${({ light }) => (light ? "#d8d8d8" : "#707070")}
    }
    ul.menu {
      background: ${({ light }) => (light ? "#d8d8d8" : gray)};
      color: ${({ light }) => (light ? black : white)};
      border: 1px solid ${({ light }) => (light ? "#aaa" : "#444")};
    }
    #comment-input {
      background: ${({ light }) => (light ? "#d8d8d8" : "#707070")};
      color: ${({ light }) => (light ? black : white)};
    }
    #comment-submit {
      color: ${({ light }) => (light ? gray : white)};
      &:hover {
        background: ${({ light }) => (light ? "#d8d8d8" : "#707070")}
      }
    }
    #comment-util button{
      color: ${({ light }) => (light ? "#777" : "#aaa")};
    }
    #comment-likes {
      color: ${({ light }) => (light ? gray : white)};
      background: ${({ light }) => (light ? "#cacaca" : "#707070")}
    }
  }

  button,
  input[type="submit"] {
    padding: 8px;
    border-style: none;
    border-radius: 5px;
    background: ${({ light }) => (light ? blue : gray)};
    color: ${white};

    &:hover,
    &:active {
      background: ${({ light }) => (light ? blue : yellow)}cc;
      color: ${({ light }) => (light ? white : black)};
    }

    &:active {

    }
  }
`;

const cookies = new Cookies();

function App() {
  cookies.set("light", cookies.get("light"));
  const isLight = cookies.get("light") === "true" ? true : false;
  const [lightMode, setLightMode] = useState(isLight);
  const [currentUser, setCurrentUser] = useState("60524b11581676421e9c7302");

  useEffect(() => {
    cookies.set("light", lightMode);
  }, [lightMode]);

  return (
    <>
      <GlobalStyle light={lightMode} />
      <Router>
        <Nav setLightMode={setLightMode} lightMode={lightMode} />
        <Switch>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/user/:userId">
            <UserProfile colors={colors} lightMode={lightMode} />
          </Route>
          <Route path="/profile">
            <Profile user={currentUser} colors={colors} lightMode={lightMode} />
          </Route>
          <Route path="/">
            <HomePage currentUser={currentUser} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
