// import mongoose library to connect mongoDB
const mongoose = require("mongoose");

// create orderSchema
const orderSchema = new mongoose.Schema(
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
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    // creates createdAt, updatedAt
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
