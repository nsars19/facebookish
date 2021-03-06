import { IoNotifications } from "react-icons/io5";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Notification from "./notification";
import colors from "./../../../colors";
import { useCurrentUserContext } from "./../../userContext/userContext";

const StyledNotifications = styled.button`
  font-size: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;

  &:hover,
  &:active {
    color: ${colors.black};
    transition: color 50ms ease;
  }

  &::after {
    content: "${({ notifLength }) =>
      notifLength > 9 ? "9+" : notifLength > 0 ? notifLength : ""}";
    display: ${({ notifLength }) => (notifLength > 0 ? "flex" : "none")};
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
    color: ${colors.white};
    text-shadow: 1px 1px 1px ${colors.black};
    position: absolute;
    top: 0px;
    right: 5px;
    border-radius: 50%;
    height: 15px;
    width: 15px;
    background: ${colors.red};
  }
`;

const StyledNotifs = styled.ul`
  display: ${({ vis }) => (vis ? "flex" : "none")};
  flex-direction: column;
  list-style: none;
  font-size: 14px;
  font-weight: 400;
  position: absolute;
  bottom: 55px;
  right: 15vw;
  width: 75vw;
  max-width: 360px;
  max-height: 40vh;
  overflow-y: scroll;
  padding: 6px;
  padding-bottom: 15px;
  border-radius: 8px;
  scrollbar-width: none;
  box-shadow: 0 0px 0.8px rgba(0, 0, 0, 0.013), 0 0px 1.9px rgba(0, 0, 0, 0.032),
    0 0px 3.9px rgba(0, 0, 0, 0.051), 0 0px 8px rgba(0, 0, 0, 0.066),
    0 0px 22px rgba(0, 0, 0, 0.07);

  &:hover,
  &:active {
    overflow: overlay;
    scrollbar-width: auto;

    #notif-item {
      padding-right: 17px;
    }
  }

  .notif-top {
    margin-top: 10px;
    margin-left: 8px;

    h1 {
      font-size: 1.7em;
    }

    p {
      font-size: 12px;
      margin-bottom: 18px;
    }
  }

  @media (max-width: 540px) {
    & {
      width: 90vw;
      right: 5vw;
    }
  }
`;

function Notifications() {
  const [notifsModal, setNotifsVis] = useState(false);
  const [notifs, setNotifs] = useState([]);
  const currentUser = useCurrentUserContext();

  const toggleOffNotifs = (e) => {
    if ([...e.target.classList].includes("modal-component")) return;
    if (notifsModal) setNotifsVis(false);
  };

  useEffect(() => {
    window.addEventListener("click", toggleOffNotifs);

    return () => {
      window.removeEventListener("click", toggleOffNotifs);
    };
  });

  useEffect(() => {
    async function fetchNotifications() {
      const res = await fetch(
        `https://frozen-thicket-71687.herokuapp.com/notifications/${currentUser}`
      );
      const data = await res.json();

      if (Array.isArray(data)) setNotifs(data);
      else setNotifs([]);
    }

    fetchNotifications();
  }, [currentUser]);

  const toggle = () => setNotifsVis(!notifsModal);

  const markRead = (notifId) => {
    return async () => {
      const body = JSON.stringify({ notifId, userId: currentUser });

      const res = await fetch(
        "https://frozen-thicket-71687.herokuapp.com/notifications/complete",
        {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body,
        }
      );

      const data = await res.json();
      setNotifs(data);
    };
  };

  const mapNotifs = notifs.map((notif) => (
    <li key={notif._id} className="modal-component">
      <Notification notif={notif} markRead={markRead} />
    </li>
  ));

  return (
    <>
      <StyledNotifications onClick={toggle} notifLength={notifs.length}>
        <IoNotifications />
      </StyledNotifications>
      <StyledNotifs
        vis={notifsModal}
        id="notif-modal"
        className="modal-component"
      >
        <div className="notif-top modal-component">
          <h1 className="modal-component">Notifications</h1>
          <p className="modal-component">click to mark as read</p>
        </div>
        {mapNotifs}
      </StyledNotifs>
    </>
  );
}

export default Notifications;
