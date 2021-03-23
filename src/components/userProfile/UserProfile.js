import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Feed from "./../feed/feed";
import defaultPfp from "./static/default.jpg";

const StyledUserProfile = styled.div`
  .profile-desc {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 40vh;
  }
  img {
    max-height: 250px;
    border-radius: 50%;
  }
  .img-wrap {
    max-width: fit-content;
    max-height: 250px;
    border-radius: 50%;
    box-shadow: 0 0.4px 1.5px -3px ${({ lm, black }) => (lm ? black + "33" : "transparent")},
      0 0.9px 3.6px -3px ${({ lm, black }) => (lm ? black + "25" : "transparent")},
      0 1.8px 6.8px -3px ${({ lm, black }) => (lm ? black + "22" : "transparent")},
      0 3.1px 12.1px -3px ${({ lm, black }) => (lm ? black + "18" : "transparent")},
      0 5.8px 22.6px -3px ${({ lm, black }) => (lm ? black + "14" : "transparent")},
      0 14px 54px -3px ${({ lm, black }) => (lm ? black + "11" : "transparent")};
  }
  .name-wrap {
    // border: 4px solid green;
    max-width: fit-content;
    font-size: 18px;
  }
`;

function UserProfile({ colors, lightMode, user }) {
  const match = useRouteMatch();
  const userId = user || match.params.userId;
  const [userName, setUserName] = useState(null);
  const [photoSrc, setPhotoSrc] = useState(null);
  const { white, black, gray, blue } = colors;
  useEffect(() => {
    (async function fetchUserData() {
      const dataResponse = await fetch(`http://localhost:3000/users/${userId}`);
      const data = await dataResponse.json();

      setPhotoSrc(data.profilePhotoSrc);
      setUserName(data.firstName + " " + data.lastName);
    })();
  }, [userId]);

  return (
    <StyledUserProfile black={black} white={white} gray={gray} lm={lightMode}>
      <div className="profile-desc">
        <div className="img-wrap">
          <img src={defaultPfp} alt="Profile" />
        </div>
        <div className="name-wrap">
          <h3>{userName || <Skeleton width={150} />}</h3>
        </div>
        <button>Become Friends</button>
      </div>
      <Feed user={userId} />
    </StyledUserProfile>
  );
}

export default UserProfile;
