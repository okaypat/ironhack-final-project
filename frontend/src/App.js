import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import AllUsers from "./components/AllUsers";
import UserProfile from "./components/UserProfile";
import AllPosts from "./components/AllPosts";
import UserCard from "./components/UserCard";
import SinglePost from "./components/SinglePost";
import NewPost from "./components/NewPost";
import Login from "./components/Login";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import EditProfile from "./components/EditProfile";
import Logout from "./components/Logout";

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={(props) => <Home {...props} />} />
        <Route
          exact
          path="/all-users"
          component={(props) => <AllUsers {...props} />}
        />
        <Route
          exact
          path="/users/:usersId"
          component={(props) => <UserProfile {...props} />}
        />
        <Route
          exact
          path="/all-posts"
          component={(props) => <AllPosts {...props} />}
        />
        <Route
          exact
          path="/posts/:postId"
          component={(props) => <SinglePost {...props} />}
        />
        <Route
          exact
          path="/new-post"
          component={(props) => <NewPost {...props} />}
        />
        <Route
          exact
          path="/edit-profile"
          component={(props) => <EditProfile {...props} />}
        />
        <Route
          exact
          path="/login"
          component={(props) => <Login {...props} />}
        />
        <Route
          exact
          path="/sign-up"
          component={(props) => <SignUp {...props} />}
        />
        <Route
          exact
          path="/logout"
          component={(props) => <Logout {...props} />}
        />
      </Switch>
    </div>
  );
}

export default App;
