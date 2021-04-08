import { BsPlusSquareFill } from "react-icons/bs";

function CreatePost({ focusRef }) {
  return (
    <button className="post-icon" onClick={focusRef}>
      <BsPlusSquareFill />
    </button>
  );
}

export default CreatePost;
