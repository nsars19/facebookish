import styled from "styled-components";
import { IoMdPersonAdd } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { useState } from "react";

const StyledFriendShip = styled.button`
  display: ${({ sameUser }) => (sameUser ? "none" : "flex")};
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 40px;
  cursor: pointer;

  .icon {
    font-size: 18px;
    margin-right: 6px;
  }
  .txt {
    font-size: 15px;
    font-weight: bold;
  }

  &.pending:hover p,
  &.pending path,
  &:hover {
    color: #eee;
    cursor: auto;
  }
`;

function FriendshipButton({ receiverId, currentUser, isPending, sameUser }) {
  const [pending, setPending] = useState(false);

  async function addPendingFriendship() {
    const body = JSON.stringify({ receiverId, senderId: currentUser });

    await fetch("http://localhost:3000/friends/add", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body,
    });

    setPending(true);
  }

  const addFriend = () => {
    return (
      <>
        <IoMdPersonAdd className="icon" />
        <p className="txt">Add Friend</p>
      </>
    );
  };

  const reqPending = () => {
    return (
      <>
        <FaUserFriends className="icon" />
        <p className="txt">Request Pending...</p>
      </>
    );
  };

  return (
    <StyledFriendShip
      onClick={addPendingFriendship}
      disabled={pending}
      sameUser={sameUser}
      className={pending ? "pending" : ""}
      id={isPending ? "pending" : ""}
    >
      {pending ? reqPending() : addFriend()}
    </StyledFriendShip>
  );
}

export default FriendshipButton;
