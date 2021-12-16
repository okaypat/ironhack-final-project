import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";

const UserProfile = (props) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/users/all-users/find-by-id/${props.match.params.usersId}`
      )
      .then((results) => {
        console.log("resuts:", results);
        setUser(results.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
    return () => {};
  }, []);
  console.log("All Props", props);

  return (
    <div>
      <h2>This is a unique user's profile page</h2>
      <UserCard attribute={user} />
    </div>
  );
};

export default UserProfile;
