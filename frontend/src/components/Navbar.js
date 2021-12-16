import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { get, post } from "../http/actions";
import Login from "./Login";

const Navbar = (props) => {
  // const [loginMessage, setLoginMessage] = useState("Login");
  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log("updating");
  });

  return (
    <div className="navbar">
      <Link style={{ color: "white", textDecoration: "none" }} to="/">
        Home
      </Link>
      <Link style={{ color: "white", textDecoration: "none" }} to="/all-users">
        See all the Users
      </Link>
      <Link style={{ color: "white", textDecoration: "none" }} to="/all-posts">
        {" "}
        See all the Posts
      </Link>
      <Link style={{ color: "white", textDecoration: "none" }} to="/new-post">
        {" "}
        Create New Post
      </Link>
      <Link
        style={{ color: "white", textDecoration: "none" }}
        to="/edit-profile"
      >
        {" "}
        Edit Profile Info
      </Link>
      {!token ? (
        <>
          <Link style={{ color: "white", textDecoration: "none" }} to="/login">
            Login
          </Link>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to="/sign-up"
          >
            Sign Up
          </Link>
        </>
      ) : (
        <Link style={{ color: "white", textDecoration: "none" }} to="/logout">
          Logout
        </Link>
      )}
    </div>
  );
};

export default Navbar;
