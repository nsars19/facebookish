import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import ProfilePicture from "./../userProfile/profilePicture";
import colors from "./../../colors";
import FriendshipButton from "./../friendshipButton/friendshipButton";
import { Link } from "react-router-dom";
import { useState } from "react";

const StyledCard = styled.div`
  display: flex;
  width: 350px;
  padding: 15px;
  border-radius: 8px;

  .user-data {
    display: flex;
    flex-direction: column;
    margin-left: 20px;

    & > * {
      margin: 3px 0;
    }

    h3 {
      font-size: 16px;
    }

    a {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    button {
      background: ${colors.blue};
      width: 100px;
      font-weight: bold;
      font-size: 14px;

      &:first-child {
        margin-right: 5px;
      }

      &:hover {
        opacity: 90%;
      }
    }

    .req-btns button {
      cursor: pointer;
    }

    .mutual-count {
      font-size: 14px;
    }

    .spacer {
      height: 16px;
    }

    #add-btn button {
      width: 205px;
      height: 32px;

      &.pending {
        cursor: auto;
      }
    }

    #not-responded {
      opacity: 100%;
    }

    #responded {
      opacity: 50%;
      cursor: auto;

      &:hover {
        color: white;
      }
    }
  }
`;

function UserCard({ user, amtCommon, currentUser, requested }) {
  const [responded, setResponse] = useState(false);
  const [resId, setResId] = useState("not-responded");
  const fullName = `${user.firstName} ${user.lastName}`;

  async function handleFriendAcceptance() {
    const senderId = user._id;
    const accepterId = currentUser;
    const body = JSON.stringify({ senderId, accepterId });

    await fetch("http://localhost:3000/friends/accept", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body,
    });

    setResId("responded");
    setResponse(true);
  }

  async function handleFriendDenial() {
    const senderId = user._id;
    const denierId = currentUser;
    const body = JSON.stringify({ senderId, denierId });

    await fetch("http://localhost:3000/friends/deny", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body,
    });

    setResId("responded");
    setResponse(true);
  }

  const reqButtons = () => (
    <div className="req-btns">
      <button id={resId} onClick={handleFriendAcceptance} disabled={responded}>
        Confirm
      </button>
      <button id={resId} onClick={handleFriendDenial} disabled={responded}>
        Deny
      </button>
    </div>
  );

  const friendButton = () => (
    <div id="add-btn">
      <FriendshipButton receiverId={user._id} currentUser={currentUser} />
    </div>
  );

  const common = (amt) => {
    return (
      <p className="mutual-count">{`${amt} mutual friend${
        amt > 1 ? "s" : ""
      }`}</p>
    );
  };

  return (
    <StyledCard id="prof-card">
      <div className="pfp">
        <Link to={`/users/${user._id}`}>
          <ProfilePicture userId={user._id} size={"70px"} />
        </Link>
      </div>
      <div className="user-data">
        <Link to={`/user/${user._id}`}>
          {<h3>{fullName}</h3> || <Skeleton />}
        </Link>
        {amtCommon ? common(amtCommon) : <div className="spacer" />}
        {requested ? reqButtons() : friendButton()}
      </div>
    </StyledCard>
  );
}

export default UserCard;
