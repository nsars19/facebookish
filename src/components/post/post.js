import styled from "styled-components";
import { Link } from "react-router-dom";
import Comment from "./comment";
import CommentForm from "./../commentForm/commentForm";

const StyledPost = styled.div`
  padding: 10px;
  border: 2px solid black;
  margin: 10px;

  p {
    padding-bottom: 5px;
    border-bottom: 2px solid black;
    margin-top: 5px;
    margin-bottom: 10px;
  }
`;

function Post({ post }) {
  return (
    <StyledPost>
      <div key={post._id}>
        <Link to={`/user/${post.author._id}`} className="user">
          {post.author.firstName} {post.author.lastName}
        </Link>
        <p>{post.text}</p>
      </div>
      {post.comments.map((comment) => (
        <div key={comment._id}>
          <Comment comment={comment} />
        </div>
      ))}
      <CommentForm postId={post._id} />
    </StyledPost>
  );
}

export default Post;
