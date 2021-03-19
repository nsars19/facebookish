import styled from "styled-components";

const StyledToggle = styled.div`
  .toggle {
    cursor: pointer;
    position: relative;
  }
  .rail {
    background: ${({ light, gray, white }) => (light ? gray : white)};
    width: 35px;
    height: 12px;
    border-radius: 25px;
    transition: background 0.4s ease 0s;
    border: 1px solid ${({ white }) => white}22;
  }
  .ball {
    background: ${({ light, gray, white }) => (light ? white : gray)};
    height: 18px;
    width: 18px;
    border-radius: 50%;
    border: 1px solid ${({ white }) => white}22;
    // Box shadow prevents choppiness while transitioning
    box-shadow: 0px 0px 0px transparent;
    position: absolute;
    top: -3px;
    left: ${({ light }) => (light ? "20px" : "-2px")};
    transition: left 0.1s cubic-bezier(0.08, 0.82, 0.66, 1.2),
      background 0.4s ease 0s;
  }
`;

function Toggle({ changeColorMode, colors, light }) {
  const { gray, white } = colors;

  return (
    <StyledToggle gray={gray} white={white} light={light}>
      <div className="toggle" onClick={changeColorMode}>
        <div className="rail" />
        <div className="ball" />
      </div>
    </StyledToggle>
  );
}

export default Toggle;
