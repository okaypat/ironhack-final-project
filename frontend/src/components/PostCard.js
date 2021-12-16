import React, { useState } from "react";
import { post, get } from "../http/actions";

const PostCard = (props) => {
  const [message, setMessage] = useState("");
  const [votes, setVotes] = useState(null);
  console.log("attribute", props.attribute);

  // // Get the img object using its Id
  // img = document.getElementById("img1");
  // // Function to increase image size
  // function enlargeImg() {
  //   // Set image size to 1.5 times original
  //   img.style.transform = "scale(1.5)";
  //   // Animation effect
  //   img.style.transition = "transform 0.25s ease";
  // }
  // // Function to reset image size
  // function resetImg() {
  //   // Set image size to original
  //   img.style.transform = "scale(1)";
  //   img.style.transition = "transform 0.25s ease";
  // }

  // ? after creator because creator is an object -- without it, it tries to pull informatio from undefinied
  return (
    <div>
      <h1>{props.attribute.title}</h1>
      <h2 style={{ color: "blue" }}>{props.attribute.creator?.username}</h2>
      <h2 style={{ color: "red" }}>{votes || props.attribute.votes?.length}</h2>
      <button
        type="submit"
        onClick={() => {
          get(`/posts/votes-up/${props.attribute._id}`).then((results) => {
            console.log("results", results);
            if (results.data.message) {
              setMessage(results.data.message);
            } else {
              setVotes(results.data.votes.length);
            }
          });
        }}
      >
        Vote
      </button>
      <p>{message}</p>
      <br></br>
      <img
        // id="img1"
        style={{ height: "500px", width: "500px" }}
        src={props.attribute.image}
        // onclick="enlargeImg()"
        alt=""
      />
    </div>
  );
};

export default PostCard;
