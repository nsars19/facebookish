import styled from "styled-components";
import ProfilePicture from "./profilePicture";
import FriendshipButton from "./../friendshipButton/friendshipButton";
import ImageHandlerModal from "./../imageHandler/imageHandlerModal";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useState } from "react";
import { MdPhotoCamera } from "react-icons/md";
import BannerModal from "./banner/bannerModal";
import colors from "./../../colors";
import { useCurrentUserContext } from "./../userContext/userContext";

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  min-height: 50vh;

  .pfp {
    position: relative;
  }

  .name-wrap {
    max-width: fit-content;
    font-size: 18px;
    margin-top: 22px;
    margin-bottom: 15px;
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

  .loader {
    background: #c0c0c0;
    height: 100%;
    width: 100%;
  }

  .banner {
    position: absolute;
    top: 0;
    max-height: 30vh;
    height: 100%;
    width: 100%;

    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }

    &-upload {
      position: absolute;
      top: 10px;
      right: 20px;
      font-size: 26px;
      cursor: pointer;
      text-shadow: 1px 1px 1px #222;

      &:hover,
      &:active {
        filter: brightness(1.2);
      }
    }
  }

  .pfp-edit-icon {
    display: ${({ sameUser }) => (sameUser ? "flex" : "none")};
    position: absolute;
    right: 15px;
    bottom: 10px;
    border-radius: 50%;
    background: ${({ lm }) => (lm ? colors.white : colors.gray)};
    height: 40px;
    width: 40px;
    padding: 6px;
    border: 1px solid ${colors.gray}33;

    &:hover,
    &:active {
      cursor: pointer;
      filter: brightness(${({ lm }) => (lm ? 1.05 : 1.2)});
    }
  }

  @media (min-width: 1024px) {
    & {
      min-height: 65vh;
    }

    .banner {
      min-height: 48vh;
    }
  }
`;

function ProfileHeader(props) {
  const {
    userId,
    pfpSrc,
    lightMode,
    needsUpdate,
    setUpdateStatus,
    userName,
    friendshipPending,
    alreadyFriends,
    bannerSrc,
    setBannerSrc,
  } = props;

  const [modalVis, setVis] = useState(false);
  const [bannerVis, setBannerVis] = useState(false);
  const currentUser = useCurrentUserContext();

  const toggleBannerModal = () => setBannerVis(!bannerVis);

  const loader = (
    <SkeletonTheme color={"#dadada"} highlightColor={"#e0e0e0"}>
      <Skeleton height={"30vh"} />
    </SkeletonTheme>
  );

  const banner = (
    <img
      src={"https://frozen-thicket-71687.herokuapp.com/images/" + bannerSrc}
      alt="profile banner"
    />
  );

  const bannerUploader = (
    <div className="banner-upload" onClick={toggleBannerModal}>
      <MdPhotoCamera />
    </div>
  );

  const noBanner = bannerSrc === null || bannerSrc === undefined;

  return (
    <StyledHeader
      lm={lightMode}
      sameUser={currentUser === userId}
      className="grid-prof-head"
    >
      <div className="banner">
        {userId === currentUser ? bannerUploader : <div />}
        {noBanner ? loader : banner}
      </div>
      <BannerModal
        vis={bannerVis}
        toggleOff={toggleBannerModal}
        user={currentUser}
        setBannerSrc={setBannerSrc}
      />
      <div className="pfp">
        <ProfilePicture
          size={"250px"}
          src={pfpSrc}
          userId={currentUser}
          lightMode={lightMode}
          needsUpdate={needsUpdate}
          setUpdateStatus={setUpdateStatus}
        />
        <MdPhotoCamera
          className="pfp-edit-icon"
          onClick={() => {
            if (currentUser === userId) setVis(!modalVis);
          }}
        />
      </div>
      <div className="name-wrap">
        <h2>{userName || <Skeleton width={150} />}</h2>
      </div>
      {alreadyFriends ? (
        <div />
      ) : (
        <FriendshipButton
          receiverId={userId}
          currentUser={currentUser}
          isPending={friendshipPending}
          sameUser={currentUser === userId}
          alreadyFriends={alreadyFriends}
        />
      )}
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
