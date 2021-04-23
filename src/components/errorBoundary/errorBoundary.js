import React from "react";
import { AiOutlineFrown } from "react-icons/ai";
import styled from "styled-components";
import colors from "./../../colors";

const StyledErrorBoundary = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  .icon {
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 240px;
    color: ${colors.lightBlue};
  }

  h1 {
    color: ${colors.lightBlue};
    margin-bottom: 20px;
    text-align: center;
  }

  a {
    margin-top: 20px;
    font-size: 20px;
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: true,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: false };
  }

  render() {
    if (this.state.hasError) {
      return (
        <StyledErrorBoundary>
          <AiOutlineFrown className="icon" />
          <h1>Something went wrong!</h1>
          <a href="https://nsars19.github.io/facebookish/">Go Back</a>
        </StyledErrorBoundary>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
