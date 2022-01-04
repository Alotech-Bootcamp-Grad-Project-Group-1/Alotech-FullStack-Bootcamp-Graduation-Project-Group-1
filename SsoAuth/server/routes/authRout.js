const express = require("express");
const { loginUser, getLoginPage } = require("../controllers/auth");
const { isTokenValid } = require("../controllers/validation");

// Initializes express router
const router = express.Router();

// Routers
router.route("/").post(loginUser);
router.route("/").get(getLoginPage);

router.route("/token").post(isTokenValid);

module.exports = router;
