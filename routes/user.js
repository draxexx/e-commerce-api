// import express library
const express = require("express");
// get Router function
const router = express.Router();

// get User model
const User = require("../models/user.js");
// import verifyTokenAndAuthorization, verifyTokenAndAdmin middlewares
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

// get all users
router.get("/", verifyTokenAndAdmin, async (req, res, next) => {
  // gets query named 'new'
  // user?new=
  const query = req.query.new;
  try {
    const users = query
      ? // gets last registered user
        await User.find().sort({ _id: -1 }).limit(1)
      : await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update user
router.put("/:id", verifyTokenAndAuthorization, async (req, res, next) => {
  // check there is a password in the body
  // then encrypt the password
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  // find the user by id and update
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// delete the user by id
router.delete("/:id", verifyTokenAndAuthorization, async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
