// import express library
const express = require("express");
// get Router function
const router = express.Router();

// get User model
const User = require("../models/user.js");
// import verifyTokenAndAuthorization middleware
const { verifyTokenAndAuthorization } = require("./verifyToken");

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

module.exports = router;
