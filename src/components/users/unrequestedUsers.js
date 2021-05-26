import UserCard from "./userCard";

function UnrequestedUsers({ users, userData, getMutualCount }) {
  return (
    <>
      {users &&
        users.map((user) => (
          <li key={user._id}>
            <UserCard user={user} amtCommon={getMutualCount(userData, user)} />
          </li>
        ))}
    </>
  );
}

export default UnrequestedUsers;
