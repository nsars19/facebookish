import styled from "styled-components";
import FriendCard from "./friendCard";
import colors from "./../../colors";

const StyledFriends = styled.ul`
  list-style: none;
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 30px 30px 30px repeat(auto-fit, 1fr);
  justify-content: start;
  gap: 8px;
  width: 95%;
  max-width: 750px;
  overflow-x: scroll;
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
      max-width: 300px;
      overflow-x: hidden;
      overflow-y: scroll;
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
      <h4 className="count">Friends ( {friends.length} )</h4>
      {friends.length === 0 ? <div /> : mapFriends}
    </StyledFriends>
  );
}

export default FriendsList;
