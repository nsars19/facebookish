import styled from "styled-components";
import { Link } from "react-router-dom";
import colors from "./../../colors";

const StyledCard = styled.div`
  background: ${({ lightMode }) => (lightMode ? colors.white : colors.gray)};
  border-radius: 8px;
  border: 1px solid
    ${({ lightMode }) => (lightMode ? colors.gray : colors.white)}22;
  height: 100%;
  width: 160px;
  box-shadow: 0 2.6px 1.3px rgba(0, 0, 0, 0.07),
    0 3.7px 4.3px rgba(0, 0, 0, 0.036), 0 4px 15px rgba(0, 0, 0, 0.027);

  & .link {
    text-decoration: none;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  & .link:hover,
  & .link:active {
    text-decoration: underline;
  }

  .frame {
    width: 100%;
    max-height: 200px;

    img {
      height: 150px;
      width: 100%;
      object-fit: cover;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
  }

  .detail {
    height: 45px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: start;
  }

  h3 {
    font-size: 1em;
    margin-top: 8px;
  }

  @media (min-width: 1024px) {
    & {
      width: auto;
    }
  }
`;

function FriendCard({ friend, lightMode }) {
  const src =
    "https://frozen-thicket-71687.herokuapp.com/images/" +
    friend.profilePhotoSrc;

  return (
    <StyledCard lightMode={lightMode}>
      <Link to={`/user/${friend._id}`} className="link">
        <div className="frame">
          <img src={src} alt="friend" />
        </div>
        <div className="detail">
          <h3>{friend.firstName + " " + friend.lastName}</h3>
        </div>
      </Link>
    </StyledCard>
  );
}

export default FriendCard;
