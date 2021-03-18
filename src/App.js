import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import colors from "./colors";
import styled from "styled-components";
import Nav from "./components/nav/nav";

const { black, gray, white, yellow } = colors;

const StyledApp = styled.div`
  background: ${({ light }) => (light ? white : black)};
  color: ${({ light }) => (light ? black : white)};
  height: 100vh;
`;

function App() {
  const [lightMode, setLightMode] = useState(false);

  return (
    <StyledApp light={lightMode}>
      <Router>
        <Nav setLightMode={setLightMode} lightMode={lightMode} />
        <Switch>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </Router>
    </StyledApp>
  );
}

export default App;

function Profile() {
  return (
    <div>
      <p>In profile</p>
    </div>
  );
}
