import { useState, useEffect } from "react";
import styled from "styled-components";
import StatusForm from "./statusForm/statusForm";
import colors from "./../../colors";
import { Link } from "react-router-dom";

const StyledHomePage = styled.div`
  color: black;
`;

function HomePage(props) {
  const { currentUser } = props;
  const [feed, setFeed] = useState(null);

  useEffect(() => {
    (async function fetchFeed() {
      const response = await fetch(
        `http://localhost:3000/posts/feed/${currentUser}`
      );
      const data = await response.json();
      setFeed(data);
    })();
  }, [currentUser]);

  return (
    <StyledHomePage>
      <StatusForm colors={colors} currentUser={currentUser}></StatusForm>
      {(feed && (
        <div>
          {feed.map((post) => (
            <div key={post._id}>
              <Link to={`/user/${post.author._id}`} className="user">
                {post.author.firstName} {post.author.lastName}
              </Link>
              <p>{post.text}</p>
            </div>
          ))}
        </div>
      )) || <h2>Loading...</h2>}
    </StyledHomePage>
  );
}

export default HomePage;
