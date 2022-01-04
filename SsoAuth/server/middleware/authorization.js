const jwt = require("jsonwebtoken");
const db = require("../models");

const Token = db.Token;
const sequelize = db.sequelize;

// Authorizes token, if token expired then deletes token
const authorization = async (req, res) => {

  // Gets token and user_id from tokens database
  const [value, meta] = await sequelize.query(
    "SELECT token, user_id FROM tokens WHERE session = :_session",
    {
      replacements: { _session: req.body.session },
    }
  );
  
  // If token not exists in database, returns {auth: false, msg:"unknown token"}
  if (!value.length) {
    return res.json({ auth: false, msg: "unknown token" });
  }

  const token = value[0].token;
  const user_id = value[0].user_id;

  // Verifies token whether expires or not, then return json object
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      Token.deleteToken(token);
      return res.json({ auth: false, msg: "token expired" });
    } else {
      return res.json({
        auth: true,
        msg: "authorization success",
        user_id: user_id,
        isAdmin: decoded.isAdmin,
        token: token,
      });
    }
  });
};

module.exports = authorization;
