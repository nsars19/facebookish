import UserCard from "./userCard";

function ReceivedRequests({ currentUser, reqs, userData, getMutualCount }) {
  return (
    <>
      {reqs &&
        reqs.map((user) => (
          <li key={user._id}>
            <UserCard
              user={user}
              amtCommon={getMutualCount(userData, user)}
              currentUser={currentUser}
              requested
            />
          </li>
        ))}
    </>
  );
}
export default ReceivedRequests;
