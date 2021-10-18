import { useState } from "react";
// import { useHistory } from "react-router";
import BASE_URL from "./utils";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  // const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const resp = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const info = await resp.json();
    if (info.error) {
      setErrorMessage(info.message);
      return;
    }
    localStorage.setItem("token", info.token);
    props.setToken(info.token);

    // history.push("/");
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <input
            minLength={4}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            value={username}
            placeholder="Username"
            required
          />
          <br></br>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            minLength={6}
            placeholder="Password"
            required
          />
          <br></br>

          <button type="submit">Login</button>
          <p>{errorMessage}</p>
        </form>
      </div>
    </>
  );
};

export default Login;
