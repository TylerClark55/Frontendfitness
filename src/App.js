import "./App.css";
import { Route } from "react-router";
import Home from "./components/Home";
import Routines from "./components/Routines";
import MyRoutines from "./components/MyRoutines";
import Activities from "./components/Activities";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import BASE_URL from "./components/utils";

function App(props) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setToken(null);
        return;
      }
      const resp = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const info = await resp.json();
      console.log(info);
      setUser({ id: info.id, username: info.username, token });
    };
    fetchUser();
  }, [token]);
  console.log(user);
  // useEffect(() => {
  //   const tokenFromLocalStorage = localStorage.getItem("token");
  //   console.log(token);
  //   if (tokenFromLocalStorage) {
  //     setToken(tokenFromLocalStorage);
  //   }
  // }, [token]);
  return (
    <div>
      <Navbar user={user} setToken={setToken} setUser={setUser} />
      <Route exact path="/">
        <Home user={user} />
      </Route>
      <Route path="/routines">
        <Routines user={user} token={token} />
      </Route>

      <Route path="/my-routines">
        <MyRoutines user={user} token={token} />
      </Route>
      <Route path="/activities">
        <Activities user={user} token={token} />
      </Route>
      <Route exact path="/login">
        <Login setToken={setToken} />
      </Route>
      <Route exact path="/register">
        <Register setToken={setToken} />
      </Route>
    </div>
  );
}

export default App;
