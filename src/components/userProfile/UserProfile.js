import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import Feed from "./../feed/feed";
import ProfileHeader from "./profileHeader";

function UserProfile({ colors, lightMode, user, currentUser, pfp }) {
  const match = useRouteMatch();
  const userId = user || match.params.userId;
  const [userName, setUserName] = useState(null);
  const [posts, setPosts] = useState(null);
  const [friendshipPending, setFriendStatus] = useState(null);
  const [needsUpdate, setUpdateStatus] = useState(false);
  const [pfpSrc, setPfpSrc] = useState(null);

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
  }, [userId]);

  return (
    <>
      <ProfileHeader
        currentUser={currentUser}
        userId={userId}
        pfpSrc={pfpSrc}
        lightMode={lightMode}
        needsUpdate={needsUpdate}
        setUpdateStatus={setUpdateStatus}
        userName={userName}
        friendshipPending={friendshipPending}
      />
      <Feed
        user={userId}
        posts={posts}
        setPosts={setPosts}
        src={pfpSrc}
        currentUser={currentUser}
        pfp={pfp}
      />
    </>
  );
}

export default UserProfile;
