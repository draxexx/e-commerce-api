// import mongoose library to connect mongoDB
const mongoose = require("mongoose");

// create productSchema
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    price: {
      type: String,
      required: true,
    },
  },
  {
    // creates createdAt, updatedAt
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
