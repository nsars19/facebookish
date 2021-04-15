import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

const StyledLoader = styled.div`
  background: #777;
  width: 95%;
  max-width: 750px;
  padding: 18px;
  border-radius: 8px;
  margin-bottom: 10px;

  .post-detail {
    display: flex;
    margin-bottom: 15px;
  }

  .detail-right {
    margin-left: 20px;
    width: 100%;
    display: grid;
    align-content: space-between;
  }
  .author {
    width: 200px;
  }
  .posted-at {
    width: 100px;
  }

  .text {
    margin-bottom: 8px;
  }
  .post-body {
    height: 200px;
  }
`;

function PostLoader() {
  return (
    <StyledLoader className="loading" id="post-loader">
      <div className="post-detail">
        <Skeleton circle="true" height={50} width={50} className="pfp" />
        <div className="detail-right">
          <Skeleton className="author" />
          <Skeleton className="posted-at" />
        </div>
      </div>
      <Skeleton className="text" count={4} />
    </StyledLoader>
  );
}

export default PostLoader;
