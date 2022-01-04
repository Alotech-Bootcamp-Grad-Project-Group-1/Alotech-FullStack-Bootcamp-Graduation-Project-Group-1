const jwt = require("jsonwebtoken");
const db = require("../models");

const Token = db.Token;
const sequelize = db.sequelize;

// Checks if token is valid, then return json object
const isTokenValid = async (req, res) => {
  const token = req.body.token;

  // if token is not exist, returns empty token message and valid:false
  if (!token || token === undefined) {
    return res.json({ valid: false, msg: "empty token" });
  }


  const [value, meta] = await sequelize.query(
    "SELECT token FROM tokens WHERE token = :_token",
    {
      replacements: { _token: token },
    }
  );

  // if the token is not matched to stored tokens in the database return unregistered token message
  if (!value.length) {
    return res.json({ valid: false, msg: "unregistered token" });
  }

  // verifies token if expired or not
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.json({ valid: false, msg: "token expired" });
    } else {
      return res.json({
        valid: true,
        user_id: decoded.user_id,
        isAdmin: decoded.isAdmin,
        msg: "token valid",
      });
    }
  });
};

module.exports = {
  isTokenValid,
};
