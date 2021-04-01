import UserCard from "./userCard";

function UnrequestedUsers({ currentUser, users, userData, getMutualCount }) {
  return (
    <>
      {users &&
        users.map((user) => (
          <li key={user._id}>
            <UserCard
              user={user}
              amtCommon={getMutualCount(userData, user)}
              currentUser={currentUser}
            />
          </li>
        ))}
    </>
  );
}

export default UnrequestedUsers;
