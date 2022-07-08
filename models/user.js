// import mongoose library to connect mongoDB
const mongoose = require("mongoose");

// create userSchema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    // creates createdAt, updatedAt
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
