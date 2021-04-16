import styled from "styled-components";
import { CgSpinner } from "react-icons/cg";

const StyledSpinner = styled.div`
  display: ${({ vis }) => (vis ? "flex" : "none")};

  .spinner {
    font-size: ${({ size }) => size || 20}px;
    animation: spin 1s cubic-bezier(0.18, 0.89, 0.32, 1.28) infinite;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

function Spinner({ size, vis }) {
  return (
    <StyledSpinner size={size} vis={vis}>
      <CgSpinner className="spinner" id="spinner" />
    </StyledSpinner>
  );
}

export default Spinner;
