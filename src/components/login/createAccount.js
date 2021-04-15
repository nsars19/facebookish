import styled from "styled-components";
import { useState } from "react";
import emailRegex from "./../../utils/emailRegex";
import colors from "./../../colors";
const { gray, lightBlue, lightBlueHover, white } = colors;

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

  input:valid {
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

  @media (min-width: 540px) {
    & {
      width: 400px;
    }
  }
`;

function CreateAccountForm({ vis, toggle, setActiveUser, setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePassChange = (e) => setPass(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);

  const fieldsEmpty =
    email === "" || password === "" || firstName === "" || lastName === "";

  const handleAccountCreation = async (e) => {
    e.preventDefault();

    if (checkIfFieldsEmpty) return;
    if (!emailRegex.test(email)) return;

    const userData = { firstName, lastName, email, password };

    await fetch("http://localhost:3000/users/new", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then(async (res) => {
        const { token, user } = await res.json();

        setActiveUser(user);
        setToken(token);
      })
      .catch((err) => console.error(err));
  };

  const clearFields = () => {
    setEmail("");
    setPass("");
    setFirstName("");
    setLastName("");
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
      />
      <input
        type="text"
        placeholder="Last Name"
        onChange={handleLastNameChange}
        value={lastName}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={handleEmailChange}
        value={email}
      />
      <input
        type="password"
        onChange={handlePassChange}
        placeholder="Password"
        minLength="8"
        maxLength="50"
        value={password}
      />
        required
      <div className="btns">
        <input type="submit" value="Create Your Account!" />
        <div className="spacer" />
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </StyledForm>
  );
}

export default CreateAccountForm;
