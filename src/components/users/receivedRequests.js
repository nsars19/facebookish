import UserCard from "./userCard";

function ReceivedRequests({ reqs, userData, getMutualCount }) {
  return (
    <>
      {reqs &&
        reqs.map((user) => (
          <li key={user._id}>
            <UserCard
              user={user}
              amtCommon={getMutualCount(userData, user)}
              requested
            />
          </li>
        ))}
    </>
  );
}
export default ReceivedRequests;
