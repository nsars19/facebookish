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
import LoginPage from "./components/login/login";

const { black, gray, white, yellow, blue, red } = colors;
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
      background: ${({ light }) => (light ? white : gray)};
      color: ${({ light }) => (light ? black : white)};
      border: 1px solid ${({ light }) => (light ? "#aaa" : "#444")};

      li .content:hover,
      li .content:active {
        background: ${({ light }) => (light ? gray : white)}33;
      }

      li .content.del:hover,
      li .content.del:active {
        background: ${red}${({ light }) => (light ? "cc" : "aa")};
      }
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

    #notif-modal {
      background: ${({ light }) => (light ? white : gray)};
      color: ${({ light }) => (light ? black : white)};
      border: 1px solid ${({ light }) => (light ? gray + "55" : white + "55")};
    }
    #notif-item:hover,
    #notif-item:active {
      background: ${({ light }) => (light ? "#d8d8d8" : "#707070")};
    }

    div.post-comments {
      color: ${({ light }) => (light ? black : white)}cc;
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

  @media (min-width: 1024px) {
    .grid-wrap {
      display: grid;
      grid-template-areas:
        "head head head head head head head head"
        "list form form form .... .... .... ...."
        "list feed feed feed .... .... .... ...."
        ".... feed feed feed .... .... .... ....";
    }

    .grid-prof-head {
      grid-area: head;
    }
    .grid-friend-list {
      grid-area: list;
      grid-auto-flow: row;
    }
    .grid-feed {
      grid-area: feed;
    }
    .grid-status-form {
      grid-area: form;
    }
  }
`;

const cookies = new Cookies();

function App() {
  cookies.set("light", cookies.get("light") || true);
  const userCookie = cookies.get("currentUser");
  const isLight = cookies.get("light") === "true" ? true : false;
  const [lightMode, setLightMode] = useState(isLight);
  const [currentUser, setCurrentUser] = useState(
    userCookie === "null" ? null : userCookie
  );
  const [pfp, setPfp] = useState(null);
  const postRef = useRef(null);

  const focusRef = () => {
    if (postRef.current) postRef.current.focus();
  };

  useEffect(() => {
    cookies.set("light", lightMode);
  }, [lightMode]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:3000/users/${currentUser}`);
      const data = await res.json();
      setPfp(data.profilePhotoSrc);
    }

    if (currentUser) fetchData();
  }, [currentUser]);

  if (!currentUser) return <LoginPage setCurrentUser={setCurrentUser} />;
  else
    return (
      <>
        <GlobalStyle light={lightMode} user={currentUser} />
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
              <div className="grid-wrap">
                <UserProfile
                  colors={colors}
                  lightMode={lightMode}
                  currentUser={currentUser}
                  pfp={pfp}
                  postRef={postRef}
                />
              </div>
            </Route>
            <Route path="/profile">
              <div className="grid-wrap">
                <Profile
                  user={currentUser}
                  colors={colors}
                  lightMode={lightMode}
                  pfp={pfp}
                  postRef={postRef}
                />
              </div>
            </Route>
            <Route path="/">
              <HomePage
                currentUser={currentUser}
                lightMode={lightMode}
                postRef={postRef}
                pfp={pfp}
              />
            </Route>
          </Switch>
        </Router>
      </>
    );
}

export default App;
