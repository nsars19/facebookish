import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Feed from "./../feed/feed";
import ProfilePicture from "./profilePicture";
import FriendshipButton from "./../friendshipButton/friendshipButton";

const StyledUserProfile = styled.div`
  .profile-desc {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    min-height: 50vh;
  }
  .name-wrap {
    // border: 4px solid green;
    max-width: fit-content;
    font-size: 18px;
  }
`;

function UserProfile({ colors, lightMode, user, currentUser }) {
  const match = useRouteMatch();
  const userId = user || match.params.userId;
  const [userName, setUserName] = useState(null);
  const [userData, setUserData] = useState(null);
  const { white, black, gray, blue } = colors;
  useEffect(() => {
    (async function fetchUserData() {
      const dataResponse = await fetch(`http://localhost:3000/users/${userId}`);
      const data = await dataResponse.json();
      setUserData(data);
      setUserName(data.firstName + " " + data.lastName);
    })();
  }, [userId]);

  const pendingFriendRequest = () =>
    userData?.pendingFriends.includes(currentUser);

  return (
    <StyledUserProfile black={black} white={white} gray={gray} lm={lightMode}>
      <div className="profile-desc">
        <ProfilePicture userId={userId} size={"250px"} />
        <div className="name-wrap">
          <h2>{userName || <Skeleton width={150} />}</h2>
        </div>
        <FriendshipButton />
      </div>
      <Feed user={userId} />
    </StyledUserProfile>
  );
}

export default UserProfile;
