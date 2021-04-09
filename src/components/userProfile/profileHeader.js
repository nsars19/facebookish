import styled from "styled-components";
import ProfilePicture from "./profilePicture";
import FriendshipButton from "./../friendshipButton/friendshipButton";
import ImageHandlerModal from "./../imageHandler/imageHandlerModal";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-height: 50vh;

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
    padding: 8px;
    padding-left: 10px;
    border-style: none;
    border-radius: 18px;
    height: 37px;
    opacity: 60%;
    color: ${({ lm }) => (lm ? "#000" : "#fff")};

    &:focus {
      outline: none;
    }
  }

  @keyframes comeFromBottom {
    from {
      bottom: 0;
      opacity: 0;
    }
  }
`;

function ProfileHeader(props) {
  const {
    currentUser,
    userId,
    pfpSrc,
    lightMode,
    needsUpdate,
    setUpdateStatus,
    userName,
    friendshipPending,
  } = props;

  const [modalVis, setVis] = useState(false);

  return (
    <StyledHeader lm={lightMode} sameUser={currentUser === userId}>
      <div
        className="pfp"
        onClick={() => {
          if (currentUser === userId) setVis(!modalVis);
        }}
      >
        <ProfilePicture
          size={"250px"}
          src={pfpSrc}
          userId={currentUser}
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
    </StyledHeader>
  );
}

export default ProfileHeader;
