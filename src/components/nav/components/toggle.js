import styled from "styled-components";

const StyledToggle = styled.div`
  .toggle {
    cursor: pointer;
    position: relative;
    height: 40px;
    display: flex;
    align-items: center;
  }
  .rail {
    background: ${({ light, gray, white }) => (light ? gray : white)};
    width: 35px;
    height: 14px;
    border-radius: 25px;
    transition: background 0.4s ease 0s;
    border: 1px solid ${({ white }) => white}22;
  }
  .ball {
    background: ${({ light, gray, white }) => (light ? white : gray)};
    height: 12px;
    width: 12px;
    border-radius: 50%;
    border: 1px solid ${({ white }) => white}22;
    // Box shadow prevents choppiness while transitioning
    box-shadow: 0px 0px 0px transparent;
    position: absolute;
    top: 14px;
    left: ${({ light }) => (light ? "22px" : "1px")};
    transition: left 0.1s cubic-bezier(0.08, 0.82, 0.66, 1.2),
      background 0.4s ease 0s;
  }
`;

function Toggle({ colors, light }) {
  const { gray, white } = colors;

  return (
    <StyledToggle gray={gray} white={white} light={light}>
      <div className="toggle modal-component">
        <div className="rail modal-component" />
        <div className="ball modal-component" />
      </div>
    </StyledToggle>
  );
}

export default Toggle;
