import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./PostCard";

const SinglePost = (props) => {
  const [post, setPost] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/posts/all-posts/find-by-id/${props.match.params.postId}`
      )
      .then((results) => {
        console.log("resuts:", results);
        setPost(results.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
    return () => {};
  }, []);
  console.log("All Props", props);

  return (
    <div>
      <h2>This is a single post</h2>
      <PostCard attribute={post} />
    </div>
  );
};

export default SinglePost;
