import { createGlobalStyle } from "styled-components";
import colors from "./../../colors";

const { black, gray, white, yellow, blue, lightBlue, red } = colors;
export const GlobalStyle = createGlobalStyle`
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

    #post-loader {
      background: ${({ light }) => (light ? white : gray)};
    }

    #spinner {
      color: ${({ light }) => (light ? lightBlue : white)};
    }

  }

  ::placeholder {
    color: ${({ light }) => (light ? black : white)};
  }

  .load-spinner {
    height: 100vh;
    width: 100vw;
    display: grid;
    place-items: center;
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
      justify-content: center;
      grid-template-areas:
        "head head head head head head head head"
        "list form form form .... .... .... ...."
        "list feed feed feed .... .... .... ...."
        ".... feed feed feed .... .... .... ....";
    }

    .grid-prof-head {
      grid-area: head;
      margin-bottom: 30px;
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

    .prof-content-wrap {
      width: 99vw;
      display: grid;
      grid-template-areas:
        "list list list"
        "form form form"
        "feed feed feed"
        "feed feed feed";
    }
  }
`;
