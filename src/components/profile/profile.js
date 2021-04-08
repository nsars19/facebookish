import styled from "styled-components";
import UserProfile from "./../userProfile/UserProfile";

const StyledProfile = styled.div`
  // color: black:
`;

function Profile({ user, lightMode, colors, userData }) {
  return (
    <StyledProfile>
      <UserProfile
        currentUser={user}
        user={user}
        colors={colors}
        lightMode={lightMode}
        userData={userData}
      />
    </StyledProfile>
  );
}

export default Profile;
