import React from "react";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();
  const logoutNow = () => {
    //remove token
    //redirect user
    localStorage.clear();
    history.push("/");
  };

  return (
    <div>
      <h1>LogOut Page</h1>
      <button onClick={logoutNow}>Logout</button>
    </div>
  );
};

export default Logout;
