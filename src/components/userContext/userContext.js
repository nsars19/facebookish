import { useState, useContext, createContext } from "react";
import Cookies from "universal-cookie";

const UserIdContext = createContext();
const UpdateUserContext = createContext();

export const useCurrentUserContext = () => useContext(UserIdContext);
export const useUpdateCurrentUser = () => useContext(UpdateUserContext);

const cookies = new Cookies();

export default function UserContext({ children }) {
  const userCookie = cookies.get("currentUser");
  const [currentUser, setCurrentUser] = useState(
    userCookie === "null" ? null : userCookie
  );
  return (
    <UpdateUserContext.Provider value={setCurrentUser}>
      <UserIdContext.Provider value={currentUser}>
        {children}
      </UserIdContext.Provider>
    </UpdateUserContext.Provider>
  );
}
