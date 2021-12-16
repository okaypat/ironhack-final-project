// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  age: Number,

  likesVet: {
    type: Boolean,
    default: false,
  },

  animal: {
    type: String,
    enum: ['cat', 'dog'],
    require: true,
  },

  time: {
    type: Date,
    default: Date.now,
  },
});

const Pet = mongoose.model('Pet', petSchema);

// export default Pet
module.exports = Pet;
