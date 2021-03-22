import styled from "styled-components";
import StatusForm from "./statusForm/statusForm";
import colors from "./../../colors";
import Feed from "./../feed/feed";

const StyledHomePage = styled.div`
  // color: black;
`;

function HomePage(props) {
  const { currentUser } = props;

  return (
    <StyledHomePage>
      <StatusForm colors={colors} currentUser={currentUser}></StatusForm>
      <Feed user={currentUser} homeFeed />
    </StyledHomePage>
  );
}

export default HomePage;
