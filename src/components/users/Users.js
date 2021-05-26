import { useState, useEffect } from "react";
import styled from "styled-components";
import ReceivedRequests from "./receivedRequests";
import UnrequestedUsers from "./unrequestedUsers";
import SearchBar from "./searchBar";
import { useThemeColor } from "./../themeContext/themeContext";
import { useCurrentUserContext } from "./../userContext/userContext";

const StyledUsers = styled.ul`
  margin-top: 10px;
  margin-bottom: 80px;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 4px;

  li {
    list-style: none;
    width: fit-content;
    height: fit-content;
  }
`;

function Users() {
  const [users, setUsers] = useState(null);
  const [receivedReqs, setReceivedReqs] = useState(null);
  const [userObject, setUserObject] = useState(null);
  const lightMode = useThemeColor();
  const currentUser = useCurrentUserContext();

  useEffect(() => {
    (async function fetchUsers() {
      const url = "https://frozen-thicket-71687.herokuapp.com";
      const currentUserObj = await fetch(`${url}/users/${currentUser}`);
      const users = await fetch(`${url}/users/find-users/${currentUser}`);
      const received = await fetch(`${url}/friends/pending/${currentUser}`);

      const promiseArr = [currentUserObj.json(), users.json(), received.json()];

      Promise.all(promiseArr).then((data) => {
        const [currUser, users, recReqs] = data;

        setUserObject(currUser);
        setUsers(users);
        setReceivedReqs(recReqs);
      });
    })();
  }, [currentUser]);

  const getCommonFriendCount = (self, user) => {
    return self.friends.filter((friend) => user.friends.includes(friend._id))
      .length;
  };

  return (
    <>
      <SearchBar lightMode={lightMode} />
      <StyledUsers>
        <ReceivedRequests
          reqs={receivedReqs}
          userData={userObject}
          getMutualCount={getCommonFriendCount}
        />
        <UnrequestedUsers
          users={users}
          userData={userObject}
          getMutualCount={getCommonFriendCount}
        />
      </StyledUsers>
    </>
  );
}

export default Users;
