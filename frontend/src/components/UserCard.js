import React, { useEffect, useState } from "react";
import { get } from "../http/actions";

const UserCard = (props) => {
  console.log("these are the props", props);
  const [postsArr, setPostsArr] = useState([]);

  useEffect(() => {
    // get request using the id to pull up all posts with the id
    //needed the if statmeent because the very first time it does the get request it receives an undefinened value
    if (props.attribute._id) {
      get(`/posts/all-posts-by-user/${props.attribute._id}`)
        .then((results) => {
          console.log("USER POST results", results);
          setPostsArr(results.data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [props]); //when the value inside the array change it retriggers useeffect

  return (
    <div>
      <h2 style={{ color: "blue" }}>{props.attribute.username}</h2>
      <p>Hometown:</p>
      <p>{props.attribute.hometown}</p>
      <p>Preferred Camera:</p>
      <p>{props.attribute.preferredCamera}</p>
      {postsArr.map((post) => {
        return (
          <div className="userPostsBox">
            <p>{post.title}</p>
            <img
              style={{ height: "300px", width: "300px" }}
              src={post.image}
              alt=""
            />
            <p>{post.votes.length}</p>
          </div>
        );
      })}
    </div>
  );
};

export default UserCard;
