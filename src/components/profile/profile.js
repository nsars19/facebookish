import UserProfile from "./../userProfile/UserProfile";

function Profile({
  user,
  lightMode,
  colors,
  pfp,
  postRef,
  needsUpdate,
  setUpdateStatus,
}) {
  return (
    <UserProfile
      currentUser={user}
      user={user}
      colors={colors}
      lightMode={lightMode}
      pfp={pfp}
      postRef={postRef}
      needsUpdate={needsUpdate}
      setUpdateStatus={setUpdateStatus}
    />
  );
}

export default Profile;
