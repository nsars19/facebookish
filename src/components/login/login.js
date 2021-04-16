import styled, { createGlobalStyle } from "styled-components";
import Form from "./form";
import colors from "./../../colors";
import { AiFillGithub } from "react-icons/ai";
import { useState } from "react";
const { white, black, lightBlue } = colors;

const LoginBody = createGlobalStyle`
  body {
    background: ${white};
  }
`;

const StyledLoginPage = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  align-items: start;
  justify-content: center;
  height: 100%;
  background: ${white};
  text-align: center;
  padding-top: 30px;
  position: relative;

  span {
    flex: 1;
    flex-basis: 768px;
    height: 200px;
    margin-top: 0;
  }

  .form {
    flex: 2;
    flex-basis: 400px;
  }

  h1 {
    font-family: "Ubuntu", sans-serif;
    color: ${lightBlue};
    font-size: 3em;
    padding-top: 30px;
  }

  h3 {
    font-family: "Ubuntu", sans-serif;
    font-weight: 400;
    color: ${black};
    font-size: 1.4em;
    line-height: 34px;
    padding-left: 40px;
    padding-right: 40px;
    margin-top: 20px;
  }

  .links {
    position: fixed;
    bottom: 4px;
    left: 12px;
    font-size: 32px;

    a {
      color: ${black};
    }
  }

  @media (min-width: 1167px) {
    & {
      padding-top: 150px;
    }

    span {
      margin-top: 40px;
    }
  }
`;

function LoginPage({ setCurrentUser }) {
  const [img, setImg] = useState(null);
  const [src, setSrc] = useState(null);

  const handleChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!img) return;

    const formData = new FormData();
    formData.append("file", img);

    const url = "http://localhost:3000/s3/upload/s3Test/123456";

    const res = await fetch(url, {
      mode: "cors",
      method: "post",
      body: formData,
      formData,
    });

    const data = await res.json();
    console.log(data);
    setSrc(`http://localhost:3000/images/${data.key}`);
  };

  return (
    <>
      <LoginBody />
      <StyledLoginPage>
        <img src={src} alt="" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="uploader">
            <input
              id="uploader"
              name="uploader"
              type="file"
              onChange={handleChange}
            />
            <input type="submit" value="Submit" />
          </label>
        </form>
        <span>
          <h1>facespace</h1>
          <h3>personalize your space and connect with others</h3>
        </span>
        <div className="form">
          <Form setActiveUser={setCurrentUser} />
        </div>
        <div className="links">
          <a
            href="https://github.com/nsars19/facebookish"
            target="_blank"
            rel="noreferrer"
          >
            <AiFillGithub />
          </a>
        </div>
      </StyledLoginPage>
    </>
  );
}

export default LoginPage;
