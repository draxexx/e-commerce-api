// import mongoose library to connect mongoDB
const mongoose = require("mongoose");

// create cartSchema
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  {
    // creates createdAt, updatedAt
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);
