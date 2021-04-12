import styled from "styled-components";
import FriendCard from "./friendCard";
import colors from "./../../colors";

const StyledFriends = styled.ul`
  list-style: none;
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 30px 30px 30px repeat(auto-fit, 1fr);
  gap: 8px;
  width: 95%;
  max-width: 750px;
  overflow-x: scroll;
  scrollbar-width: none;
  background: ${({ lm }) => (lm ? "#eee" : colors.gray)};
  border: 1px solid ${({ lm }) => (lm ? colors.gray : colors.white)}11;
  padding: 18px;
  padding-top: 45px;
  padding-bottom: 8px;
  border-radius: 8px;
  margin: 10px auto;
  margin-bottom: 20px;
  position: relative;
  box-shadow: 0 0.1px 0.8px rgba(0, 0, 0, 0.02),
    0 0.1px 1.9px rgba(0, 0, 0, 0.028), 0 0.3px 3.5px rgba(0, 0, 0, 0.035),
    0 0.4px 6.3px rgba(0, 0, 0, 0.042), 0 0.8px 11.7px rgba(0, 0, 0, 0.05);

  &:hover,
  &:active {
    scrollbar-width: auto;
  }

  @media (min-width: 840px) {
    &:hover,
    &:active {
      margin-bottom: -5px;
    }
  }

  .count {
    position: absolute;
    top: 12px;
    left: 18px;
  }

  @media (min-width: 1024px) {
    & {
      align-content: start;
      grid-auto-flow: row;
      height: min-content;
      max-height: 100vh;
      overflow-x: hidden;
      overflow-y: scroll;

      &:hover,
      &:active {
        padding-right: 3px;
      }
    }
  }
`;

function FriendsList({ friends, lightMode }) {
  const mapFriends = friends.map((friend) => {
    return (
      <li key={friend._id}>
        <FriendCard friend={friend} lightMode={lightMode} />
      </li>
    );
  });

  return (
    <StyledFriends lm={lightMode} className="grid-friend-list">
      <h3 className="count">Friends ( {friends.length} )</h3>
      {mapFriends}
    </StyledFriends>
  );
}

export default FriendsList;
