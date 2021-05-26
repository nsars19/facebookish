import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import Feed from "./../feed/feed";
import ProfileHeader from "./profileHeader";
import StatusForm from "./../homepage/statusForm/statusForm";
import FriendsList from "./../friends/friendsList";
import { useThemeColor } from "./../themeContext/themeContext";
import { useCurrentUserContext } from "../userContext/userContext";

function UserProfile({
  colors,
  user,
  pfp,
  postRef,
  needsUpdate,
  setUpdateStatus,
}) {
  const match = useRouteMatch();
  const userId = user || match.params.userId;
  const [userName, setUserName] = useState(null);
  const [posts, setPosts] = useState([]);
  const [friendshipPending, setFriendStatus] = useState(null);
  const [pfpSrc, setPfpSrc] = useState(null);
  const [friends, setFriends] = useState([]);
  const [alreadyFriends, setAlreadyFriends] = useState(null);
  const [bannerSrc, setBannerSrc] = useState(null);
  const lightMode = useThemeColor();
  const currentUser = useCurrentUserContext();

  useEffect(() => {
    (async function fetchUserData() {
      const dataResponse = await fetch(
        `https://frozen-thicket-71687.herokuapp.com/users/${userId}`
      );
      const data = await dataResponse.json();

      setFriendStatus(data.pendingFriends.includes(currentUser));
      setUserName(data.firstName + " " + data.lastName);
      setPfpSrc(data.profilePhotoSrc);
      setBannerSrc(data.bannerSrc);
      setFriends(data.friends);
      setAlreadyFriends(data.friends.map((fr) => fr._id).includes(currentUser));
    })();
  }, [userId, currentUser]);

  useEffect(() => {
    (async function fetchPosts() {
      const response = await fetch(
        `https://frozen-thicket-71687.herokuapp.com/posts/byuser/${userId}`
      );

      const data = await response.json();
      setPosts(data);
    })();
  }, [userId]);

  return (
    <>
      <ProfileHeader
        userId={userId}
        pfpSrc={pfpSrc}
        lightMode={lightMode}
        needsUpdate={needsUpdate}
        setUpdateStatus={setUpdateStatus}
        userName={userName}
        friendshipPending={friendshipPending}
        alreadyFriends={alreadyFriends}
        bannerSrc={bannerSrc}
        setBannerSrc={setBannerSrc}
      />
      <div className="prof-content-wrap">
        <FriendsList friends={friends} lightMode={lightMode} />
        {currentUser === userId ? (
          <StatusForm
            colors={colors}
            lightMode={lightMode}
            setFeed={setPosts}
            src={pfp}
            postRef={postRef}
            fromProfile
          />
        ) : (
          <div />
        )}
        <Feed
          user={userId}
          posts={posts}
          setPosts={setPosts}
          src={pfpSrc}
          currentUser={currentUser}
          pfp={pfp}
        />
      </div>
    </>
  );
}

export default UserProfile;
