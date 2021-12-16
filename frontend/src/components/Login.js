import React, { useState } from "react";
import { get, post } from "../http/actions";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [usernameHook, setUsernameHook] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const login = () => {
    post("/users/login", {
      username: usernameHook,
      password: password,
    })
      .then((results) => {
        console.log("RESULTS", results.data);
        if (results.data.success) {
          console.log("NOW SETTING TOKEN", results.data.token);
          localStorage.setItem("token", results.data.token);
          history.push(`/users/${results.data.id}`);
        }
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  };

  const loginTest = () => {
    get("/users/login-test")
      .then((results) => {
        console.log("RESULTS", results.data);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  };

  return (
    <div>
      <label>Username</label>
      <input
        value={usernameHook}
        onChange={(e) => setUsernameHook(e.target.value)}
      ></input>
      <label>Password</label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={login}>Login</button>
      <button style={{ color: "blue" }} onClick={loginTest}>
        Test Login
      </button>
    </div>
  );
};

export default Login;
