import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledComment = styled.div`
  padding-top: 5px;
  margin-left: 10px;
`;

function Comment({ comment }) {
  const commentAuthor =
    comment.author.firstName + " " + comment.author.lastName;

  return (
    <StyledComment>
      <Link to={`/user/${comment.author._id}`} className="user">
        {commentAuthor}
      </Link>
      <p>{comment.text}</p>
    </StyledComment>
  );
}

export default Comment;
