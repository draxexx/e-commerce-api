// import express library
const express = require("express");
// create express object through its constructor
const app = express();
// import mongoose library to connect mongoDB
const mongoose = require("mongoose");
// import dotenv to use .env file
const dotenv = require("dotenv");

// import routes
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");
const authRoute = require("./routes/auth");

// to use .env file, first make the configuration
dotenv.config();

// connect to the mongoDB through connect() function by using mongoose
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => console.log(err));

// to pass json data
app.use(express.json());

// localhost:300/api/user
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/cart", cartRoute);
app.use("/api/auth", authRoute);

// listen the 3000 port
app.listen(process.env.PORT || 3000, () =>
  console.log("Backend server is running on 3000")
);
