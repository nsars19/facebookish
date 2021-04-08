import { IoNotifications } from "react-icons/io5";
import { useState } from "react";

function Notifications() {
  const [notifsModal, setNotifsVis] = useState(false);
  const toggle = () => {
    setNotifsVis(!notifsModal);
    console.log(notifsModal);
  };

  return (
    <button onClick={toggle} className="notifs">
      <IoNotifications />
    </button>
  );
}

export default Notifications;
