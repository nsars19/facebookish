import styled from "styled-components";
import { IoMdPersonAdd } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";

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
`;

function FriendshipButton({ receiverId, currentUser, isPending, sameUser }) {
  async function addPendingFriendship() {
    const body = JSON.stringify({ receiverId, senderId: currentUser });

    await fetch("http://localhost:3000/friends/add", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body,
    });
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
      disabled={isPending}
      sameUser={sameUser}
      id={isPending ? "pending" : ""}
    >
      {isPending ? reqPending() : addFriend()}
    </StyledFriendShip>
  );
}

export default FriendshipButton;
