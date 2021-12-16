// import mongoose from 'mongoose';
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  hometown: {
    type: String,
    required: true,
  },

  preferredCamera: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  time: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
