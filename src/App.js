import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import colors from "./colors";
import styled from "styled-components";
import Nav from "./components/nav/nav";
import UserProfile from "./components/userProfile/UserProfile";
import Users from "./components/users/Users";
import Cookies from "universal-cookie";

const { black, gray, white, yellow } = colors;

const StyledApp = styled.div`
  background: ${({ light }) => (light ? white : black)};
  color: ${({ light }) => (light ? black : white)};
  height: 100vh;
`;

const cookies = new Cookies();

function App() {
  cookies.set("light", cookies.get("light"));
  const isLight = cookies.get("light") === "true" ? true : false;
  const [lightMode, setLightMode] = useState(isLight);

  useEffect(() => {
    cookies.set("light", lightMode);
  }, [lightMode]);

  return (
    <StyledApp light={lightMode}>
      <Router>
        <Nav setLightMode={setLightMode} lightMode={lightMode} />
        <Switch>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/user/:userId">
            <UserProfile />
          </Route>
          <Route path="/profile">
            <Profile user={currentUser} />
          </Route>
          <Route path="/">
            <HomePage currentUser={currentUser} />
          </Route>
        </Switch>
      </Router>
    </StyledApp>
  );
}

export default App;
