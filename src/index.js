import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {       
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }
    
  a.user {
    text-decoration: none;
    font-weight: 600;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
