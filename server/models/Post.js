// import mongoose from 'mongoose';
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  image: {
    type: String,
    required: true,
  },

  title: String,

  // array for votes so I can use array.lenght to calculate how many votes
  votes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],

  creator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },

  time: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
