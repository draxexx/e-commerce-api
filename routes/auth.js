// import express library
const express = require("express");
// get Router function
const router = express.Router();
// import crypto library
const CryptoJS = require("crypto-js");
// import json web token
const jwt = require("jsonwebtoken");

// get User model
const User = require("../models/user.js");

// create new user
router.post("/register", async (req, res, next) => {
  // create User object
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    // encrypt the password
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    // save created user object to the DB
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// login
router.post("/login", async (req, res, next) => {
  try {
    // find the user by username
    const user = await User.findOne({ username: req.body.username });
    // if the user not found
    if (!user) {
      return res.status(401).json("Wrong credentials!");
    }

    // decrypt the password
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    // get original password
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    // creates access token
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    // if the entered password not matched
    if (originalPassword !== req.body.password) {
      return res.status(401).json("Wrong credentials!");
    }

    const { password, ...others } = user._doc;

    // return logged user object and access token as a JSON
    return res.status(200).json({ ...others, accessToken });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
