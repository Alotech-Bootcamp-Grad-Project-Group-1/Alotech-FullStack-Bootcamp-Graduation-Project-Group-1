const express = require("express");
const {
  createUserValidation,
  updateUserValidation,
  validToken,
  checkUser,
  checkAdmin,
} = require("../middlewares/validation");

const {
  getListOfUsers,
  createUser,
  getUserInfo,
  updateUser,
  deleteUser,
} = require("../controllers/userController.js");

// Initializes express router
const router = express.Router();

// Routers and middlewares
router
  .route("/")
  .get(validToken, checkAdmin, getListOfUsers)
  .post(createUserValidation, createUser);

// Routers and middlewares
router
  .route("/:id")
  .get(validToken, checkUser, getUserInfo)
  .put(validToken, checkAdmin, updateUserValidation, updateUser)
  .delete(validToken, checkAdmin, deleteUser);

module.exports = router;
