import styled from "styled-components";
import { IoMdPersonAdd } from "react-icons/io";

const StyledFriendShip = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 40px;

  .icon {
    font-size: 18px;
    margin-right: 6px;
  }
  .txt {
    font-size: 15px;
    font-weight: bold;
  }
`;

function FriendshipButton(props) {
  return (
    <StyledFriendShip>
      <IoMdPersonAdd className="icon" />
      <p className="txt">Add Friend</p>
    </StyledFriendShip>
  );
}

export default FriendshipButton;
