import { ImUsers } from "react-icons/im";
import { Link } from "react-router-dom";

function UsersLink() {
  return (
    <Link to="/users">
      <ImUsers />
    </Link>
  );
}

export default UsersLink;
