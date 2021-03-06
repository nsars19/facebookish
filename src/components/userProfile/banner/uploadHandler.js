import styled from "styled-components";
import { AiFillPicture } from "react-icons/ai";
import colors from "./../../../colors";
import { useState } from "react";
import Cookies from "universal-cookie";
import Spinner from "./../../spinner/spinner";
import compressImage from "./../../../utils/compressImage";

const StyledHandler = styled.form`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 400px;
  max-height: 90vh;
  padding-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 0.1px 0.8px rgba(0, 0, 0, 0.02),
    0 0.1px 1.9px rgba(0, 0, 0, 0.028), 0 0.3px 3.5px rgba(0, 0, 0, 0.035),
    0 0.4px 6.3px rgba(0, 0, 0, 0.042), 0 0.8px 11.7px rgba(0, 0, 0, 0.05);

  input[type="file"] {
    display: none;
  }

  .banner-icon {
    font-size: 100px;
    cursor: pointer;
    color: ${colors.blue};
    justify-self: center;
  }

  label {
    height: fit-content;
    width: fit-content;
    display: grid;
    flex-direction: column;
    grid-auto-flow: row;
    justify-content: center;
    margin-bottom: 10px;

    p.banner-upload-txt {
      padding: 0;
      text-align: center;
      font-size: 14px;

      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }

  input[type="submit"] {
    margin-top: 20px;
    width: 95%;
    max-width: 400px;
    font-size: 18px;
    padding: 10px;

    &:hover,
    &:active {
      background: ${colors.blue};
      cursor: pointer;
    }
  }

  img {
    display: none;
    height: 0;
  }

  img[src] {
    display: block;
    height: auto;
    margin-top: 15px;
    max-width: 95%;
    max-height: 300px;
  }

  #esc {
    position: absolute;
    top: 10px;
    right: 10px;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover,
    &:active {
      opacity: 80%;
    }

    span {
      display: block;
      height: 2px;
      width: 25px;
      background: ${colors.gray};
      border-radius: 8px;

      &:first-child {
        transform: rotate(45deg);
        position: absolute;
        left: 8px;
      }

      &:last-child {
        transform: rotate(-45deg);
        position: absolute;
        left: 8px;
      }
    }
  }

  input#img-text-input {
    width: 95%;
    min-height: 35px;
    max-width: 400px;
    font-size: 14px;

    &:hover {
      opacity: 70%;
    }
  }

  .img-error {
    display: ${({ imgError }) => (imgError ? "flex" : "none")};
    padding: 5px;
    padding-top: 20px;
    font-size: 14px;
    text-align: center;
  }

  .spinner {
    position: absolute;
    bottom: 25px;
    left: 35px;
  }

  @media (min-width: 400px) {
    .spinner {
      left: 17%;
    }
  }
  @media (min-width: 450px) {
    .spinner {
      left: 20%;
    }
  }
`;

const cookies = new Cookies();

function UploadHandler({ user, toggleOff, setBannerSrc }) {
  const [imgFile, setImage] = useState(null);
  const [src, setSrc] = useState(null);
  const [spinnerVis, setSpinnerVis] = useState(false);
  const [imgError, setImgError] = useState(false);
  const token = cookies.get("token");

  const handleImgInput = (files) => {
    setImage(files[0]);
    setSrc(URL.createObjectURL(files[0]));

    if (imgError) {
      setImgError(false);
    }

    if (files[0].size > 6000000) {
      setImgError(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imgFile || imgError) return;

    setSpinnerVis(true);

    const compressedImg = await compressImage(imgFile);

    const formData = new FormData();
    formData.append("file", compressedImg);

    const url = `https://frozen-thicket-71687.herokuapp.com/upload/banner/no-feed/${user}`;

    await fetch(url, {
      method: "post",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();

        setBannerSrc(data.src);
        clearHandler();
        setSpinnerVis(false);
      })
      .catch((err) => console.error(err));
  };

  const clearHandler = () => {
    toggleOff();
    setImage(null);
    setSrc(null);
    setImgError(false);
    setSpinnerVis(false);
  };

  return (
    <StyledHandler
      id="img-form"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="modal-component"
      imgError={imgError}
    >
      <input
        type="file"
        name="banner-file"
        id="banner-file"
        accept=".png, .jpeg, .jpg"
        onChange={(e) => handleImgInput([...e.target.files])}
        className="modal-component"
      />
      <label htmlFor="banner-file" className="modal-component">
        <AiFillPicture className="banner-upload-icon banner-icon modal-component" />
        <p className="banner-upload-txt modal-component">Upload an image</p>
      </label>
      <img src={src} alt="preview" className="banner-preview modal-component" />
      <p className="img-error">
        This image is too large! If you really want to post it, please compress
        it.
      </p>
      <input
        type="submit"
        value="Change cover photo"
        className="modal-component"
        disabled={spinnerVis}
      />
      <Spinner className="spinner" vis={spinnerVis} />
      <button id="esc" onClick={clearHandler} className="modal-component">
        <span />
        <span />
      </button>
    </StyledHandler>
  );
}

export default UploadHandler;
