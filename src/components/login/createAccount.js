import styled from "styled-components";
import { useState } from "react";
import emailRegex from "./../../utils/emailRegex";
import colors from "./../../colors";
import Cookies from "universal-cookie";
const { gray, lightBlue, lightBlueHover, white, red } = colors;

const StyledForm = styled.form`
  position: absolute;
  top: 0px;
  display: ${({ vis }) => (vis ? "grid" : "none")};
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
    &[type="password"],
    &[type="text"] {
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

  .err-empty {
    display: none;
  }
  .err-text {
    position: absolute;
    bottom: 240px;
    left: 27px;
    text-align: start;
    color: ${red};
    font-size: 12px;
    animation: appear 0.3s ease;
  }

  @keyframes appear {
    from {
      opacity: 0;
      left: 0;
    }
  }

  @media (min-width: 540px) {
    & {
      width: 400px;
    }
  }
`;

const cookies = new Cookies();

function CreateAccountForm({ vis, toggle, setActiveUser }) {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePassChange = (e) => setPass(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);

  const fieldsEmpty =
    email === "" || password === "" || firstName === "" || lastName === "";

  const handleAccountCreation = async (e) => {
    e.preventDefault();

    if (fieldsEmpty) return;
    if (!emailRegex.test(email)) return;

    const userData = { firstName, lastName, email, password };

    await fetch("https://frozen-thicket-71687.herokuapp.com/users/new", {
      method: "post",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then(async (res) => {
        const data = await res.json();
        const { token, user } = data;

        if (data.error) {
          setErrorMsg(data.message);
        } else {
          setActiveUser(user);
          cookies.set("token", token);
          cookies.set("currentUser", user);
        }
      })
      .catch((err) => console.error(err));
  };

  const clearFields = () => {
    setEmail("");
    setPass("");
    setFirstName("");
    setLastName("");
    setErrorMsg("");
  };

  const handleCancel = () => {
    clearFields();
    toggle();
  };

  return (
    <StyledForm vis={vis} onSubmit={handleAccountCreation}>
      <input
        type="text"
        placeholder="First Name"
        onChange={handleFirstNameChange}
        value={firstName}
        maxLength="50"
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        onChange={handleLastNameChange}
        value={lastName}
        maxLength="50"
        required
      />
      <input
        type="email"
        placeholder="Email"
        onChange={handleEmailChange}
        value={email}
        maxLength="100"
        required
      />
      <input
        type="password"
        onChange={handlePassChange}
        placeholder="Password"
        minLength="8"
        maxLength="50"
        value={password}
        required
      />
      {errorMsg ? (
        <p className="err-text">{errorMsg}</p>
      ) : (
        <div className="err-empty" />
      )}
      <div className="btns">
        <input type="submit" value="Create Your Account!" />
        <div className="spacer" />
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </StyledForm>
  );
}

export default CreateAccountForm;
