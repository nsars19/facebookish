import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";

function HomeLink() {
  return (
    <Link to="/">
      <AiFillHome />
    </Link>
  );
}

export default HomeLink;
