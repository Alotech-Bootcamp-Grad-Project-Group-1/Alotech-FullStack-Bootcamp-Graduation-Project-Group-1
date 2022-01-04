import { useState, useEffect } from "react";
import axios from "axios";
import Error from "./components/Error";
import UserManager from "./components/UserManager";
import { getCookie, setCookie, deleteCookie } from "./utility";

const configData = require("./config.json");

function App() {
  // State for users
  const [users, setUsers] = useState([]);

  //State for if posted or not.
  const [posted, setPosted] = useState(false);

  //State for authStatus
  const [authStatus, setAuthStatus] = useState(false);

  //State for if it is admin or not
  const [isAdmin, setIsAdmin] = useState(false);

  // Redirects to sso auth server 
  const redirectLogin = () => {
    const currentURL = window.location.origin;
    console.log("current url", currentURL);
    window.location.href = `${configData.authUrl}/auth?redirectURL=${currentURL}`;
  };

  useEffect(() => {

    // Gets session id from cookie
    var session_id = getCookie("sessionID");

    // if the session id exists, then sends the session id to sso auth server to verify
    if (session_id) {
      axios
        .post(`${configData.authUrl}/`, {
          session: session_id,
        })
        .then((response) => {

          // if the session id is not valid, then deletes session-id and access token from the cookie
          if (response.data.auth === false) {
            deleteCookie("sessionID");
            deleteCookie("access_token");
            redirectLogin();
          } else {

            // if the session is valid, sets token in cookie and sets others
            setCookie("access_token", response.data.token);
            setIsAdmin(response.data.isAdmin);
            setAuthStatus(true);
          }
        });
    } else {
      // if session id is not exist, redirects to sso auth 
      redirectLogin();
    }
  }, []);

  // if authStatus is set, then invoked this useEffect
  useEffect(() => {

    // if authStatus is exist, then get all users
    if (authStatus) {
      var cookie_token = getCookie("access_token");
      axios
        .get(`${configData.apiUrl}/users/`, {
          headers: {
            access_token: cookie_token,
          },
        })
        .then((response) => {
          setUsers(response.data.users);
          console.log("USER ARRAY: ", response.data.users);
        });
    }
  }, [authStatus]);


  // if posted is set, then invoked this useEffect
  useEffect(() => {
    console.log("POSTED", posted);

    // if posted is exist, then get all users
    if (posted) {
      var cookie_token = getCookie("access_token");
      axios
        .get(`${configData.apiUrl}/users/`, {
          headers: {
            access_token: cookie_token,
          },
        })
        .then((response) => {
          setUsers(response.data.users);
          console.log("USER ARRAY ", response.data.users);
        });
    }
    setPosted(false);
  }, [posted]);

  return (
    <div className="App">

      {/* if isAdmin is false, then Error component is rendered */}
      {!isAdmin && <Error message="Need Admin Permission" />}

      {/* if isAdmin is true, then UserManager component is rendered */}
      {isAdmin && (
        <UserManager users={users} posted={posted} setPosted={setPosted} />
      )}
    </div>
  );
}

export default App;
