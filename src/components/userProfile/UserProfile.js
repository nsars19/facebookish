import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Feed from "./../feed/feed";
import ProfilePicture from "./profilePicture";
import FriendshipButton from "./../friendshipButton/friendshipButton";
import ImageHandlerModal from "./../imageHandler/imageHandlerModal";

const StyledUserProfile = styled.div`
  .profile-desc {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    min-height: 50vh;
  }

  .tool-tip {
    display: none;
    width: max-content;
    position: absolute;
    bottom: -20px;
    left: 0;
    font-size: 12px;
    animation: comeFromBottom 0.2s ease-in-out;
  }

  .pfp {
    position: relative;
    cursor: ${({ sameUser }) => (sameUser ? "pointer" : "auto")};

    &:hover,
    &:active {
      opacity: ${({ sameUser }) => (sameUser ? "80%" : "100%")};
    }
  }

  .pfp:hover .tool-tip {
    display: ${({ sameUser }) => (sameUser ? "block" : "none")};
  }

  @keyframes comeFromBottom {
    from {
      bottom: 0;
      opacity: 0;
    }
  }

  .name-wrap {
    max-width: fit-content;
    font-size: 18px;
  }

  form {
    display: flex;
    flex-flow: column nowrap;
  }

  input[type="text"] {
    background: ${({ lm }) => (lm ? "#d8d8d8" : "#707070")};
    padding-left: 10px;
    border-style: none;
    border-radius: 18px;
    height: 37px;
    width: 100%;
    opacity: 60%;
    color: ${({ lm }) => (lm ? "#000" : "#fff")};

    &:focus {
      outline: none;
    }
  }
`;

function UserProfile({ colors, lightMode, user, currentUser }) {
  const match = useRouteMatch();
  const userId = user || match.params.userId;
  const [userName, setUserName] = useState(null);
  const [posts, setPosts] = useState(null);
  const [modalVis, setVis] = useState(false);
  const [friendshipPending, setFriendStatus] = useState(null);
  const [needsUpdate, setUpdateStatus] = useState(false);
  const [pfpSrc, setPfpSrc] = useState(null);
  const { white, black, gray } = colors;

  useEffect(() => {
    (async function fetchUserData() {
      const dataResponse = await fetch(`http://localhost:3000/users/${userId}`);
      const data = await dataResponse.json();

      setFriendStatus(data.pendingFriends.includes(currentUser));
      setUserName(data.firstName + " " + data.lastName);
      setPfpSrc(data.profilePhotoSrc);
    })();
  }, [userId, currentUser]);

  useEffect(() => {
    (async function fetchPosts() {
      const response = await fetch(
        `http://localhost:3000/posts/byuser/${userId}`
      );

      const data = await response.json();
      setPosts(data);
    })();
  }, [user, setPosts, userId]);

  return (
    <StyledUserProfile
      black={black}
      white={white}
      gray={gray}
      lm={lightMode}
      sameUser={currentUser === userId}
    >
      <div className="profile-desc">
        <div
          className="pfp"
          onClick={() => {
            if (currentUser === userId) setVis(!modalVis);
          }}
        >
          <ProfilePicture
            size={"250px"}
            src={pfpSrc}
            lightMode={lightMode}
            needsUpdate={needsUpdate}
            setUpdateStatus={setUpdateStatus}
          />
          <p className="tool-tip">
            Click the picture to upload a new profile picture
          </p>
        </div>
        <div className="name-wrap">
          <h2>{userName || <Skeleton width={150} />}</h2>
        </div>
        <FriendshipButton
          receiverId={userId}
          currentUser={currentUser}
          isPending={friendshipPending}
          sameUser={currentUser === userId}
        />
        <ImageHandlerModal
          vis={modalVis}
          user={currentUser}
          toggle={() => setVis(!modalVis)}
          setUpdateStatus={setUpdateStatus}
          profile
        />
      </div>
      <Feed user={userId} posts={posts} setPosts={setPosts} />
    </StyledUserProfile>
  );
}

export default UserProfile;
