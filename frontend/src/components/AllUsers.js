import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";

// import AllPosts from "./components/AllPosts";

function AllUsers() {
  const [usersArray, setUsersArray] = useState([]);

  // doing this to get the data from the backend -- make sure cors is installed and using the same port as react
  useEffect(() => {
    axios
      .get("http://localhost:4000/users/all-users")
      .then((results) => {
        console.log("This is what we got", results.data); //.data here to get rid of some object things
        setUsersArray(results.data);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  }, []);

  console.log("These are the users", usersArray);

  return (
    <div>
      <h1>All the users</h1>
      {usersArray.map((users) => {
        return (
          <div>
            <Link to={`/users/${users._id}`}>{users.username}</Link>
          </div>
        );
      })}
    </div>
  );
}

export default AllUsers;
