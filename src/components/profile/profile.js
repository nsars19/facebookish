import { useCurrentUserContext } from "../userContext/userContext";
import UserProfile from "./../userProfile/UserProfile";

function Profile({ colors, pfp, postRef, needsUpdate, setUpdateStatus }) {
  const user = useCurrentUserContext();

  return (
    <UserProfile
      user={user}
      colors={colors}
      pfp={pfp}
      postRef={postRef}
      needsUpdate={needsUpdate}
      setUpdateStatus={setUpdateStatus}
    />
  );
}

export default Profile;
