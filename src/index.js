import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
       
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    transition: background 0.2s ease, color 0.2s ease;
    font-family: 'Poppins', Courier, Arial, sans-serif;
  }
    
  a.user {
    text-decoration: none;
    font-weight: 600;
    &:visited {
      color: black;
    }
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
