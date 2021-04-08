import { IoNotifications } from "react-icons/io5";

function Notifications({ toggle }) {
  return (
    <button onClick={toggle} className="notifs">
      <IoNotifications />
    </button>
  );
}

export default Notifications;
