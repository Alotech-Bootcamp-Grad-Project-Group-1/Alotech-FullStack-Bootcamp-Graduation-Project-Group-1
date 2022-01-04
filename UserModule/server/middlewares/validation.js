const { body, validationResult } = require("express-validator");
const db = require("../models");
const jwt = require("jsonwebtoken");

// This is for creater user test
const createUserValidation = [
  body("username", "Username is required")
    .notEmpty()
    .custom((value) => {
      return db.User.findOne({
        where: {
          username: value,
        },
      }).then((user) => {
        if (user) {
          return Promise.reject("Username already exists");
        }
      });
    }),
  body("user_name", "User name is required").notEmpty(),
  body("user_surname", "User surname is required").notEmpty(),
  body("user_password", "User password is required").notEmpty(),
  body("user_email").isEmail().withMessage("Email is invalid"),
  body("user_type", "User type is required").notEmpty(),
];

// This is for update user test
const updateUserValidation = [
  body("username", "Username is required").notEmpty(),
  body("user_name", "User name is required").notEmpty(),
  body("user_surname", "User surname is required").notEmpty(),
  body("user_password", "User password is required").notEmpty(),
  body("user_email").isEmail().withMessage("Email is invalid"),
  body("user_email", "User email is required").notEmpty(),
  body("user_type", "User type is required").notEmpty(),
];

// Checks if token is valid or not.
const validToken = (req, res, next) => {
  const token = req.get("access_token");
  console.log("valid token middleware ", token);
  if (!token || token === undefined) {
    console.log("no permission: null token");
    res.json({ msg: "null token" });
    return;
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      console.log("no permission: expired token");
      res.json({ msg: "expired token" });
      return;
    } else {
      req.userID = decoded.id;
      req.isAdmin = decoded.isAdmin;
      next();
    }
  });
};

// Checks if user id is valid or not and is admin or not.
const checkUser = (req, res, next) => {
  console.log("checkUser middleware");

  if (req.isAdmin === true) {
    next();
    return;
  }

  if (req.userID.toString() !== req.params.id) {
    res.json({ msg: "no permission: different user id" });
    return;
  } else {
    next();
  }
};

// Checks if user is admin or not.
const checkAdmin = (req, res, next) => {
  console.log("checkAdmin middleware");
  if (req.isAdmin === true) {
    next();
    return;
  } else {
    res.json({ msg: "need admin account" });
  }
};

module.exports = {
  createUserValidation,
  updateUserValidation,
  validToken,
  checkUser,
  checkAdmin,
};
