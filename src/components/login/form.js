import styled from "styled-components";
import { useState } from "react";
import colors from "./../../colors";
const { white, gray, lightBlue, lightBlueHover, red } = colors;

const StlyedForm = styled.form`
  display: grid;
  gap: 20px;
  width: 300px;
  padding: 18px;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px;
  position: relative;
  box-shadow: 0 0px 1.1px rgba(0, 0, 0, 0.019),
    0 0.2px 3.5px rgba(0, 0, 0, 0.027), 0 1px 7.5px rgba(0, 0, 0, 0.033),
    0 3px 13.5px rgba(0, 0, 0, 0.041), 0 5px 20px rgba(0, 0, 0, 0.06);

  input {
    height: 50px;
    font-size: 16px;
    border-radius: 8px;

    &[type="email"],
    &[type="password"] {
      padding-left: 15px;
      padding-right: 7px;
      border: 1px solid ${gray}33;
      outline: none;

      &:focus,
      &:active {
        border: 2px solid ${lightBlue};
        box-shadow: 0 0 0 2px #e7f3ff;
      }
    }
  }

  .btns {
    width: 100%;

    & > * {
      width: 100%;
      flex: 1;
      padding: 12px;
      border-style: none;
      border-radius: 8px;
      font-size: 18px;
      font-weight: bold;
      background: ${lightBlue};
      color: ${white};

      &:hover:not(.spacer),
      &:active:not(.spacer) {
        background: ${lightBlueHover};
        cursor: pointer;
      }
    }

    button {
      height: 50px;
    }
  }

  .spacer {
    border-top: 1px solid ${gray}33;
    border-radius: 0;
    margin-top: 24px;
    width: 100%;
    background: none;
  }

  .error {
    display: ${({ errVis }) => (errVis ? "flex" : "none")};
    font-size: 14px;
    color: ${red};
  }

  @media (min-width: 540px) {
    & {
      width: 400px;
    }
  }
`;

function Form({ setActiveUser, setToken }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errorModalVis, setErrorVis] = useState(false);
  const [errorMsg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "" || pass === "") return;

    await fetch("http://localhost:3000/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, pass }),
    })
      .then(async (res) => {
        if (res.status === 401) {
          const data = await res.json();
          const msg = data.error;
          setMsg(msg);
          setErrorVis(true);
        } else {
          const { token, user } = await res.json();

          setErrorVis(false);
          setToken(token);
          setActiveUser(user);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleAccountCreation = () => {};

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePassChange = (e) => setPass(e.target.value);

  return (
    <StlyedForm onSubmit={handleLogin} errVis={errorModalVis}>
      <input type="email" placeholder="Email" onChange={handleEmailChange} />
      <input
        type="password"
        onChange={handlePassChange}
        placeholder="Password"
        minLength="8"
        maxLength="50"
      />
      <p className="error">{errorMsg}</p>
      <div className="btns">
        <input type="submit" value="Log In" />
        <div className="spacer" />
        <button onClick={handleAccountCreation}>Create New Account</button>
      </div>
    </StlyedForm>
  );
}

export default Form;