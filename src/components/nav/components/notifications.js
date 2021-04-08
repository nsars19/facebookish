import { IoNotifications } from "react-icons/io5";
import { useState } from "react";
import styled from "styled-components";

const StyledNotifications = styled.button``;

function Notifications({ currentUser }) {
  const [notifsModal, setNotifsVis] = useState(false);
  const toggle = () => {
    setNotifsVis(!notifsModal);
    console.log(notifsModal);
  };

  return (
    <StyledNotifications onClick={toggle} className="notifs">
      <IoNotifications />
    </StyledNotifications>
  );
}

export default Notifications;
