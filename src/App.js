import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import colors from "./colors";
import Nav from "./components/nav/nav";
import Cookies from "universal-cookie";
import LoginPage from "./components/login/login";
import Spinner from "./components/spinner/spinner";
import ErrorBoundary from "./components/errorBoundary/errorBoundary";
import ThemeContext from "./components/themeContext/themeContext";

const UserProfile = lazy(() => import("./components/userProfile/UserProfile"));
const Profile = lazy(() => import("./components/profile/profile"));
const HomePage = lazy(() => import("./components/homepage/homepage"));
const Users = lazy(() => import("./components/users/Users"));

const cookies = new Cookies();

function App() {
  const userCookie = cookies.get("currentUser");
  const [currentUser, setCurrentUser] = useState(
    userCookie === "null" ? null : userCookie
  );
  const [pfp, setPfp] = useState(null);
  const [needsUpdate, setUpdateStatus] = useState(false);
  const [userName, setName] = useState("");
  const postRef = useRef(null);

  const focusRef = () => {
    if (postRef.current) postRef.current.focus();
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `https://frozen-thicket-71687.herokuapp.com/users/${currentUser}`
      );
      const data = await res.json();
      setPfp(data.profilePhotoSrc);
      setName(`${data.firstName} ${data.lastName}`);
    }

    if (currentUser) fetchData();
  }, [currentUser, needsUpdate]);

  if (!currentUser) return <LoginPage setCurrentUser={setCurrentUser} />;
  else
    return (
      <ThemeContext>
        <ErrorBoundary>
          <Router>
            <Nav
              currentUser={currentUser}
              focusRef={focusRef}
              userName={userName}
              pfp={pfp}
            />
            <Suspense
              fallback={
                <div className="load-spinner">
                  <Spinner size={150} vis={true} />
                </div>
              }
            >
              <Switch>
                <Route path="/users">
                  <Users currentUser={currentUser} />
                </Route>
                <Route path="/user/:userId">
                  <div className="grid-wrap">
                    <UserProfile
                      colors={colors}
                      currentUser={currentUser}
                      pfp={pfp}
                      postRef={postRef}
                      needsUpdate={needsUpdate}
                      setUpdateStatus={setUpdateStatus}
                    />
                  </div>
                </Route>
                <Route path="/profile">
                  <div className="grid-wrap">
                    <Profile
                      user={currentUser}
                      colors={colors}
                      pfp={pfp}
                      postRef={postRef}
                      needsUpdate={needsUpdate}
                      setUpdateStatus={setUpdateStatus}
                    />
                  </div>
                </Route>
                <Route path="/">
                  <HomePage
                    currentUser={currentUser}
                    postRef={postRef}
                    pfp={pfp}
                  />
                </Route>
              </Switch>
            </Suspense>
          </Router>
        </ErrorBoundary>
      </ThemeContext>
    );
}

export default App;
