import { AiFillPicture } from "react-icons/ai";
import { MdTextsms } from "react-icons/md";

function PostIcons({ toggleImgModal, focusRef }) {
  return (
    <div className="post-types">
      <div className="post-icon" onClick={toggleImgModal}>
        <AiFillPicture />
        <p id="post-icon-text">Photo</p>
      </div>
      <div className="post-icon" onClick={focusRef}>
        <MdTextsms />
        <p id="post-icon-text">Text</p>
      </div>
    </div>
  );
}

export default PostIcons;
