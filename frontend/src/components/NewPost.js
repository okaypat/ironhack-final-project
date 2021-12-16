import React, { useState } from "react";
import { post } from "../http/actions";
import axios from "axios";

const NewPost = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(" ");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image[0]);
    formData.append("upload_preset", "ml_default");
    //UIPLOAD_PRESET is found in your cloudinary account settings. Make sure it's 'unsigned'
    //CLOUD_NAME comes from youir cloudinary account
    axios
      .post(`https://api.cloudinary.com/v1_1/okaypat/upload`, formData)
      .then((results) => {
        console.log("This came back from cloud", results.data);
        setUrl(results.data.url);
        //results.data.url should be the url for the newly updated photo
        //Once the image has uploaded, add the url to the backen
        post("/posts/add-post", {
          title,
          image: results.data.url,
        })
          .then((results) => {
            console.log("results", results);
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  };

  return (
    <div>
      <h1>Create a New Post</h1>
      <form
        method="post"
        type="file"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        name="TESTING"
      >
        <label for="img">Select image:</label>
        {/* This is the input for uploading a file */}
        <input
          //This is a file upload
          type="file"
          name="test-image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files)}
          //don't set value of the hook
        />
        <label for="title">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Create Post</button>
      </form>
      {url && <h2>The Image:</h2>}
      {url && (
        <img style={{ height: "300px", width: "300px" }} src={url} alt="" />
      )}
    </div>
  );
};

export default NewPost;
