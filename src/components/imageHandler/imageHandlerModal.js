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
  // animation: comeFromLeft 0.3s ease;

  #img-form {
    // align-items: center;
  }

  @keyframes comeFromLeft {
    from {
      left: -200px;
    }
  }
`;

function ImageHandlerModal({ toggle, user, vis }) {
  return (
    <StyledModal vis={vis}>
      <ImageHandler user={user} toggleOff={toggle} />
    </StyledModal>
  );
}

export default ImageHandlerModal;
