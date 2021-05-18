import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import Trie from "simple-trie-search";
import uniqid from "uniqid";
import ProfilePicture from "./../userProfile/profilePicture";
import colors from "./../../colors";
import { Link } from "react-router-dom";

const StyledSearchBar = styled.div`
  position: relative;
  // width: 100%;
  margin: 10px;
  margin-bottom: 20px;

  input[type="text"] {
    background: ${({ lightMode }) => (lightMode ? "#d8d8d8" : "#707070")};
    color: ${({ lightMode }) => (lightMode ? "black" : "white")};
    padding-left: 10px;
    border-style: none;
    border: 1px solid ${colors.gray};
    border-style: none;
    border-radius: 18px;
    outline: none;
    width: 100%;
    max-width: 350px;
    height: 37px;
    font-size: 15px;
  }

  .user-list {
    background: ${({ lightMode }) => (lightMode ? colors.white : colors.gray)};
    position: absolute;
    top: 40px;
    box-shadow: 0 0 1px
      ${({ lightMode }) => (lightMode ? colors.gray : colors.white)};
    border-radius: 8px;
    width: 100%;
    max-width: 400px;
  }

  .user-wrap {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 9px;
    padding-left: 12px;
    margin: 4px;
    cursor: pointer;
    border-radius: 6px;
    text-decoration: none;

    p {
      font-size: 18px;
      margin-left: 10px;
    }

    &:hover,
    &:active,
    &:focus-visible {
      outline: none;
      background: ${({ lightMode }) =>
        lightMode ? colors.gray : colors.white}33;
    }
  }

  @media (max-width: 540px) {
    & {
      max-width: 100%;
    }

    input[type="text"] {
      max-width: 100%;
      width: 100%;
    }
  }
`;

export default function SearchBar({ lightMode }) {
  const [results, setResults] = useState([]);
  const [inputText, setInputText] = useState("");
  const trie = useMemo(() => new Trie(), []);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch(
        "https://frozen-thicket-71687.herokuapp.com/users/"
      );
      const data = await res.json();
      data.forEach(({ firstName, lastName, ...user }) => {
        const fullName = `${firstName} ${lastName}`;
        for (const name of [firstName, lastName]) {
          trie.map(name, {
            fullName,
            id: user._id,
            pfp: user.profilePhotoSrc,
          });
        }
      });
    }

    fetchUsers();
  }, [trie]);

  const clearResults = (e) => {
    const nodeName = e.target.nodeName;
    const className = e.target.className;
    if (nodeName === "INPUT" || className === "user-list") {
      return;
    } else {
      setResults([]);
    }
  };

  useEffect(() => {
    window.addEventListener("click", clearResults);

    return () => {
      window.removeEventListener("click", clearResults);
    };
  }, []);

  const fetchUserNames = (e) => {
    const results = trie.search(e.target.value.toLowerCase());
    setResults(results);
    setInputText(e.target.value);
  };

  return (
    <StyledSearchBar lightMode={lightMode} resLen={results.length}>
      <input
        type="text"
        onChange={fetchUserNames}
        value={inputText}
        placeholder="Search for somebody"
      />
      <div className="user-list">
        {results.map((user) => (
          <Link to={`/user/${user.id}`} className="user-wrap" key={uniqid()}>
            <ProfilePicture size={"30px"} src={user.pfp} />
            <p>{user.fullName}</p>
          </Link>
        ))}
      </div>
    </StyledSearchBar>
  );
}
