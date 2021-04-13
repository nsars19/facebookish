import styled from "styled-components";
import UploadHandler from "./uploadHandler";

const StyledBanner = styled.div`
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
      opacity: 0;
      top: -50px;
    }
  }
`;

function BannerModal({ vis, toggleOff, user, setBannerSrc }) {
  return (
    <StyledBanner vis={vis}>
      <UploadHandler
        toggleOff={toggleOff}
        user={user}
        setBannerSrc={setBannerSrc}
      />
    </StyledBanner>
  );
}

export default BannerModal;
