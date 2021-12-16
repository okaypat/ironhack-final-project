import React, { useState } from "react";
import { post } from "../http/actions";
import { useHistory } from "react-router-dom";

const EditProfile = (props) => {
  const [hometown, setHometown] = useState("");
  const [preferredCamera, setPreferredCamera] = useState("");
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  const updateProfile = (e) => {
    e.preventDefault();
    post("/users/update-userId", {
      hometown,
      preferredCamera,
    })
      .then((results) => {
        console.log("results", results);
        setSuccess(true);
        history.push("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const deleteProfile = () => {
    post("/users/delete-user", {})
      .then((results) => {
        console.log("results", results);
        localStorage.clear();
        history.push("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <div>
        <form>
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
          <button type="submit" onClick={updateProfile}>
            Update
          </button>
        </form>
        {success && <p>Your changes were successful</p>}
      </div>
      <h1>Delete Profile</h1>
      <button type="submit" onClick={deleteProfile}>
        Delete
      </button>
    </div>
  );
};

export default EditProfile;
