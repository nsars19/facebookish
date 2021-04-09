import styled from "styled-components";
import UserProfile from "./../userProfile/UserProfile";

const StyledProfile = styled.div`
  // color: black:
`;

function Profile({ user, lightMode, colors, pfp, postRef }) {
  return (
    <StyledProfile>
      <UserProfile
        currentUser={user}
        user={user}
        colors={colors}
        lightMode={lightMode}
        pfp={pfp}
        postRef={postRef}
      />
    </StyledProfile>
  );
}

export default Profile;
