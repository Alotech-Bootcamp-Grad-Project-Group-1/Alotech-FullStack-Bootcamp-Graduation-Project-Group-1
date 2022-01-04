const db = require("../models");
const CryptoJs = require("crypto-js");
const { body, validationResult } = require("express-validator");
const sequelize = db.sequelize;

// Gets all user for users database
const getListOfUsers = (req, res) => {
  sequelize
    .query("CALL getListOfUsers ()")
    .then((v) => {
      res
        .status(200)
        .json({ status: "success", message: "Users found", users: v });
    })
    .catch((err) => {
      res.status(400).json({ status: "error", message: err });
    });
};

// Creates user and store in users database
const createUser = (req, res) => {
  const {
    username,
    user_name,
    user_surname,
    user_password,
    user_email,
    user_type,
  } = req.body;

  // hashs and salts password
  salt_password = user_password + process.env.SALT_PASS;
  user_password_hash = CryptoJs.SHA256(salt_password).toString();

  sequelize
    .query(
      "CALL createUser (:_username, :_user_name, :_user_surname, :_user_password, :_user_email, :_user_type)",
      {
        replacements: {
          _username: username,
          _user_name: user_name,
          _user_surname: user_surname,
          _user_password: user_password_hash,
          _user_email: user_email,
          _user_type: user_type,
        },
      }
    )
    .then((v) => {
      res
        .status(201)
        .json({ status: "success", message: "User created", user: v[0] });
    })
    .catch((err) => {
      let errors = validationResult(req);
      let error_message = errors.array().map((error) => error.msg);
      res.status(400).json({ status: "error", message: error_message });
    });
};

// Gets user info by id from users database,
const getUserInfo = (req, res) => {
  const user_id = req.params.id;
  sequelize
    .query("CALL getUserInfo (:_user_id)", {
      replacements: { _user_id: user_id },
    })
    .then((v) => {
      if (v.length > 0) {
        res
          .status(200)
          .json({ status: "success", message: "User found", user: v[0] });
      } else {
        res.status(404).json({ status: "error", message: "User not found" });
      }
    })
    .catch((err) => {
      res.status(400).json({ status: "error", message: err });
    });
};

// Updates user by id from users database
const updateUser = (req, res) => {
  const user_id = req.params.id;
  const {
    username,
    user_name,
    user_surname,
    user_password,
    user_email,
    user_type,
  } = req.body;

  // hashs and salts password
  salt_password = user_password + process.env.SALT_PASS;
  user_password_hash = CryptoJs.SHA256(salt_password).toString();

  sequelize
    .query(
      "CALL updateUser (:_user_id, :_username, :_user_name, :_user_surname, :_user_password, :_user_email, :_user_type)",
      {
        replacements: {
          _user_id: user_id,
          _username: username,
          _user_name: user_name,
          _user_surname: user_surname,
          _user_password: user_password_hash,
          _user_email: user_email,
          _user_type: user_type,
        },
      }
    )
    .then((v) => {
      res
        .status(200)
        .json({ status: "success", message: "User updated", user: v[0] });
    })
    .catch((err) => {
      let errors = validationResult(req);
      let error_message = errors.array().map((error) => error.msg);
      res.status(400).json({ status: "error", message: error_message });
    });
};

// Deletes user by id from users database
const deleteUser = (req, res) => {
  const user_id = req.params.id;
  sequelize
    .query("CALL deleteUser (:_user_id)", {
      replacements: { _user_id: user_id },
    })
    .then((v) => {
      res.status(200).json({ status: "success", message: "User deleted" });
    })
    .catch((err) => {
      res.status(400).json({ status: "error", message: err });
    });
};

module.exports = {
  getListOfUsers,
  createUser,
  getUserInfo,
  updateUser,
  deleteUser,
};
