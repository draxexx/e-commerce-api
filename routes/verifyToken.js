// import json web token
const jwt = require("jsonwebtoken");

// to verify token
const verifyToken = (req, res, next) => {
  // get token from the headers
  const authHeader = req.headers.token;
  // if token exist
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) return res.status(403).json("Token is not valid!");
      // create request user and assign user that comes from the callback func
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    // if request user id equals to request params id or user is admin
    // request user id comes from verifyToken function, we created there
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(401).json("You are not allowed to do that");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    // if request user is admin
    // request user id comes from verifyToken function, we created there
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(401).json("You are not allowed to do that");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
