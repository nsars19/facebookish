import styled from "styled-components";
import { useState } from "react";
import CreateAccountForm from "./createAccount";
import colors from "./../../colors";
import Cookies from "universal-cookie";
const { white, gray, lightBlue, lightBlueHover, red } = colors;

const StlyedForm = styled.form`
  display: ${({ createVis }) => (createVis ? "none" : "grid")};
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

  input:valid:not(input[type="submit"]) {
    border: 1px solid #43df36;
    box-shadow: 0 0 2px #43df36;
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

const cookies = new Cookies();

function Form({ setActiveUser }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errorModalVis, setErrorVis] = useState(false);
  const [errorMsg, setMsg] = useState("");
  const [accountCreationVis, setAccCreationVis] = useState(false);

  const toggleAccountCreator = () => setAccCreationVis(!accountCreationVis);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "" || pass === "") return;

    await fetch("https://frozen-thicket-71687.herokuapp.com:3000/login", {
      method: "post",
      mode: "cors",
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
          setActiveUser(user);

          cookies.set("token", token);
          cookies.set("currentUser", user);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePassChange = (e) => setPass(e.target.value);

  return (
    <>
      <StlyedForm
        onSubmit={handleLogin}
        errVis={errorModalVis}
        createVis={accountCreationVis}
      >
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={handleEmailChange}
          required
        />
        <input
          type="password"
          value={pass}
          onChange={handlePassChange}
          placeholder="Password"
          minLength="8"
          maxLength="50"
          required
        />
        <p className="error">{errorMsg}</p>
        <div className="btns">
          <input type="submit" value="Log In" />
          <div className="spacer" />
          <button onClick={toggleAccountCreator}>Create New Account</button>
        </div>
      </StlyedForm>
      <CreateAccountForm
        vis={accountCreationVis}
        toggle={toggleAccountCreator}
        setActiveUser={setActiveUser}
      />
    </>
  );
}

export default Form;
