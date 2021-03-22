import styled from "styled-components";
import Feed from "./../feed/feed";

const StyledProfile = styled.div`
  // color: black:
`;

function Profile({ user }) {
  return (
    <StyledProfile>
      <Feed user={user} />
    </StyledProfile>
  );
}

export default Profile;
