import UserProfile from "./../userProfile/UserProfile";

function Profile({ user, lightMode, colors, pfp, postRef }) {
  return (
    <UserProfile
      currentUser={user}
      user={user}
      colors={colors}
      lightMode={lightMode}
      pfp={pfp}
      postRef={postRef}
    />
  );
}

export default Profile;
