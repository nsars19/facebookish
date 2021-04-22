import { useEffect } from "react";
import styled from "styled-components";
import ImageHandler from "./imageHandler";

const StyledModal = styled.div`
  display: ${({ vis }) => (vis ? "flex" : "none")};
  justify-content: center;
  position: fixed;
  top: 20px;
  left: 0;
  width: 80%;
  margin: 0 10%;
  z-index: 3;
  animation: comeFromTop 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28);

  @keyframes comeFromTop {
    from {
      top: -50px;
    }
  }
`;

function ImageHandlerModal({
  toggle,
  user,
  vis,
  profile,
  setFeed,
  setUpdateStatus,
  postInput,
  fromProfile,
}) {
  const toggleModalOff = (e) => {
    if (e.target.tagName === "path") return;
    if ([...e.target.classList].includes("modal-component")) return;
    if (vis) toggle();
  };

  useEffect(() => {
    window.addEventListener("click", toggleModalOff);

    return () => {
      window.removeEventListener("click", toggleModalOff);
    };
  });

  return (
    <StyledModal vis={vis}>
      <ImageHandler
        user={user}
        toggleOff={toggle}
        profile={profile}
        setFeed={setFeed}
        setUpdateStatus={setUpdateStatus}
        postInput={postInput}
        fromProfile={fromProfile}
      />
    </StyledModal>
  );
}

export default ImageHandlerModal;
