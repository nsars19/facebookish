import styled from "styled-components";
import FriendCard from "./friendCard";
import colors from "./../../colors";
import { useRef } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

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
  scrollbar-width: none;
  background: ${({ lm }) => (lm ? "#eee" : colors.gray)};
  border: 1px solid ${({ lm }) => (lm ? colors.gray : colors.white)}11;
  padding: 18px;
  padding-right: 20px;
  padding-top: 45px;
  padding-bottom: 8px;
  border-radius: 8px;
  margin: 10px auto;
  margin-bottom: 20px;
  position: relative;
  filter: scale(1);
  box-shadow: 0 0.1px 0.8px rgba(0, 0, 0, 0.02),
    0 0.1px 1.9px rgba(0, 0, 0, 0.028), 0 0.3px 3.5px rgba(0, 0, 0, 0.035),
    0 0.4px 6.3px rgba(0, 0, 0, 0.042), 0 0.8px 11.7px rgba(0, 0, 0, 0.05);

  .count {
    position: absolute;
    top: 12px;
    left: 18px;
  }

  button {
    color: ${colors.black};
    font-size: 45px;
    position: sticky;
    width: 0;
    padding: 0;
    top: 0;
    right: 40px;
    cursor: pointer;

    &:first-child {
      left: 0;
    }

    svg:hover {
      filter: brightness(2);
    }
  }
`;

function FriendsList({ friends, lightMode }) {
  const listRef = useRef(null);

  const mapFriends = friends.map((friend) => {
    return (
      <li key={friend._id}>
        <FriendCard friend={friend} lightMode={lightMode} />
      </li>
    );
  });

  const shiftLeft = () =>
    (listRef.current.scrollLeft -= listRef.current.clientWidth);
  const shiftRight = (e) =>
    (listRef.current.scrollLeft += listRef.current.clientWidth);

  return (
    <>
      <StyledFriends ref={listRef} lm={lightMode} className="grid-friend-list">
        <button onClick={shiftLeft}>
          <BsChevronLeft />
        </button>
        <h4 className="count">Friends ( {friends.length} )</h4>
        {friends.length === 0 ? <div /> : mapFriends}
        <button onClick={shiftRight}>
          <BsChevronRight />
        </button>
      </StyledFriends>
    </>
  );
}

export default FriendsList;
