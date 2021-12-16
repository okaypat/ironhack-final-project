import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./PostCard";
import { Link } from "react-router-dom";

function AllPosts() {
  const [postArray, setPostArray] = useState([]);
  const [sorting, setSorting] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4000/posts/all-posts")
      .then((results) => {
        console.log("This is what we got", results.data);
        setPostArray(results.data);
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  }, []);

  const sortByVotes = () => {
    let newArr = [...postArray];
    if (sorting === true) {
      let orderedArr = newArr.sort((a, b) => {
        if (a.votes.length < b.votes.length) {
          return -1;
        }
        if (a.votes.length > b.votes.length) {
          return 1;
        }
        return 0;
      });
      setPostArray(orderedArr);
      setSorting(false);
    } else {
      let orderedArr = newArr.sort((a, b) => {
        if (a.votes.length < b.votes.length) {
          return -1;
        }
        if (a.votes.length > b.votes.length) {
          return 1;
        }
        return 0;
      });
      setPostArray(orderedArr.reverse());
      setSorting(true);
    }
  };
  const sortByDate = () => {
    let newArr = [...postArray];
    if (sorting === true) {
      let orderedArr = newArr.sort((a, b) => {
        if (a.time < b.time) {
          return -1;
        }
        if (a.time > b.time) {
          return 1;
        }
        return 0;
      });
      setPostArray(orderedArr);
      setSorting(false);
    } else {
      let orderedArr = newArr.sort((a, b) => {
        if (a.time < b.time) {
          return -1;
        }
        if (a.time > b.time) {
          return 1;
        }
        return 0;
      });
      setPostArray(orderedArr.reverse());
      setSorting(true);
    }
  };

  return (
    <div className="allposts">
      <h1>All the posts</h1>
      <button onClick={() => sortByVotes()} type="button" className="btn">
        # of Votes
      </button>
      <button onClick={() => sortByDate()} type="button" className="btn">
        Date
      </button>
      {postArray.map((post) => {
        return (
          <div className="allpostsbox">
            <img
              style={{ height: "200px", width: "200px" }}
              src={post.image}
              alt=""
            ></img>
            <br></br>
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
            <p>Votes: {post.votes.length}</p>
          </div>
        );
      })}
    </div>
  );
}

export default AllPosts;
