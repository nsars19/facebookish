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
    margin-left: 10px;
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
  .comments {
    margin-top: 15px;
  }
  .comment {
    margin-top: 12px;
    display: grid;
    grid-auto-flow: column;
    justify-content: start;
    gap: 10px;
  }
`;

function PostLoader() {
  return (
    <StyledLoader className="loading" id="post-loader">
      <div className="post-detail">
        <Skeleton circle="true" height={40} width={40} className="pfp" />
        <div className="detail-right">
          <Skeleton className="author" />
          <Skeleton className="posted-at" />
        </div>
      </div>
      <Skeleton className="text" count={3} />
      <div className="comments">
        <div className="comment">
          <Skeleton circle={true} height={35} width={35} />
          <div className="cmts-right">
            <Skeleton height={55} width={200} />
          </div>
        </div>
        <div className="comment">
          <Skeleton circle={true} height={35} width={35} />
          <div className="cmts-right">
            <Skeleton height={55} width={260} />
          </div>
        </div>
        <div className="comment">
          <Skeleton circle={true} height={35} width={35} />
          <div className="cmts-right">
            <Skeleton height={55} width={150} />
          </div>
        </div>
      </div>
    </StyledLoader>
  );
}

export default PostLoader;
