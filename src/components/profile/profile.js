import styled from "styled-components";
import UserProfile from "./../userProfile/UserProfile";

const StyledProfile = styled.div`
  // color: black:
`;

function Profile({ user, lightMode, colors }) {
  return (
    <StyledProfile>
      <UserProfile user={user} colors={colors} lightMode={lightMode} />
    </StyledProfile>
  );
}

export default Profile;
