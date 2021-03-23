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

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ light }) => (light ? white : black)};
    color: ${({ light }) => (light ? black : white)};
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
