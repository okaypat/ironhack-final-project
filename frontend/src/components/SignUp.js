import React, { useState } from "react";
import { post } from "../http/actions";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hometown, setHometown] = useState("");
  const [preferredCamera, setPreferredCamera] = useState("");

  const register = () => {
    post("/users/sign-up", {
      username,
      password,
      hometown,
      preferredCamera,
    })
      .then((results) => {
        console.log("results", results);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <form>
        <label for="username">Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label for="password">Password:</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label for="hometown">Hometown:</label>
        <input
          type="text"
          value={hometown}
          onChange={(e) => setHometown(e.target.value)}
        />
        <label for="preferredCamera">Preferred Camera:</label>
        <input
          type="text"
          value={preferredCamera}
          onChange={(e) => setPreferredCamera(e.target.value)}
        />
        <button type="submit" onClick={register}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
