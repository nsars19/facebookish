import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import Feed from "./../feed/feed";
import ProfileHeader from "./profileHeader";
import StatusForm from "./../homepage/statusForm/statusForm";
import FriendsList from "./../friends/friendsList";

function UserProfile({ colors, lightMode, user, currentUser, pfp, postRef }) {
  const match = useRouteMatch();
  const userId = user || match.params.userId;
  const [userName, setUserName] = useState(null);
  const [posts, setPosts] = useState([]);
  const [friendshipPending, setFriendStatus] = useState(null);
  const [needsUpdate, setUpdateStatus] = useState(false);
  const [pfpSrc, setPfpSrc] = useState(null);
  const [friends, setFriends] = useState([]);
  const [alreadyFriends, setAlreadyFriends] = useState(null);
  const [bannerSrc, setBannerSrc] = useState(null);

  useEffect(() => {
    (async function fetchUserData() {
      const dataResponse = await fetch(`http://localhost:3000/users/${userId}`);
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
        alreadyFriends={alreadyFriends}
        bannerSrc={bannerSrc}
        setBannerSrc={setBannerSrc}
      />
      <FriendsList friends={friends} lightMode={lightMode} />
      <StatusForm
        colors={colors}
        currentUser={currentUser}
        lightMode={lightMode}
        setFeed={setPosts}
        src={pfp}
        postRef={postRef}
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
