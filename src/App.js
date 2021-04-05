import React, { useState, useEffect, useRef } from "react";
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
    margin-bottom: 50px;
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
    button.util {
      color: ${({ light }) => (light ? black : white)}aa;
    }
    #comment-util button{
      color: ${({ light }) => (light ? "#777" : "#aaa")};
    }
    #comment-likes {
      color: ${({ light }) => (light ? gray : white)};
      background: ${({ light }) => (light ? "#cacaca" : "#707070")}
    }
    #edit-form {
      background: ${({ light }) => (light ? "#d8d8d8" : "#707070")};
      color: ${({ light }) => (light ? black : white)};
    }
    #pending:hover,
    #pending:active {
      color: ${white};
      background: ${({ light }) => (light ? blue : gray)};
      cursor: auto;
    }
    #prof-card {
      background: ${({ light }) => (light ? "#d8d8d8" : gray)};
      border: 1px solid ${({ light }) => (light ? gray : white)}33;
    }

    input[type="text"]:hover {
      opacity: 70%;
    }

    #esc {
      background: ${({ light }) => (light ? "#d8d8d8" : "#707070")};
    }
    #img-form {
      background: ${({ light }) => (light ? white : gray)};
      border: 1px solid ${({ light }) => (light ? gray + "33" : white + "22")};
      
      input:not(input[type="text"]) {
        background: ${blue};

        &:hover,
        &:active {
          background: ${blue}${({ light }) => (light ? "cc" : "88")};
          color: #eee;
        }
      }
    }

    #post-icon-text {
      color: ${({ light }) => (light ? black : white)}aa;
    }

    input#img-text-input {
      background: ${({ light }) => (light ? "#d8d8d8" : "#707070")};
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
  }
`;

const cookies = new Cookies();

function App() {
  cookies.set("light", cookies.get("light"));
  const isLight = cookies.get("light") === "true" ? true : false;
  const [lightMode, setLightMode] = useState(isLight);
  const [currentUser, setCurrentUser] = useState("60524b11581676421e9c7302");
  const postRef = useRef(null);
  const focusRef = () => postRef.current.focus();

  useEffect(() => {
    cookies.set("light", lightMode);
  }, [lightMode]);

  return (
    <>
      <GlobalStyle light={lightMode} />
      <Router>
        <Nav
          setLightMode={setLightMode}
          lightMode={lightMode}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          focusRef={focusRef}
        />
        <Switch>
          <Route path="/users">
            <Users currentUser={currentUser} />
          </Route>
          <Route path="/user/:userId">
            <UserProfile
              colors={colors}
              lightMode={lightMode}
              currentUser={currentUser}
            />
          </Route>
          <Route path="/profile">
            <Profile user={currentUser} colors={colors} lightMode={lightMode} />
          </Route>
          <Route path="/">
            <HomePage
              currentUser={currentUser}
              lightMode={lightMode}
              postRef={postRef}
            />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
