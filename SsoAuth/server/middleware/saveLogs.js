const log4js = require("log4js");
var path = require('path');
const db = require('../models')

const Log = db.Log;

// Middleware, Saves Logs of SSO Auth server to authorization.txt file
const saveLogs = async (req, res, next) => { 

  const  log4j = () => {

    log4js.configure({
      appenders: { authorization: { type: "file", filename: "authorization.txt" } },
      categories: { default: { appenders: ["authorization"], level: "info" } }
    });
       
    const logger = log4js.getLogger("authorization");
    logger.debug("authorization debug,");
    logger.info("authorization info,");

  }

  await log4j(); // capture logs

 
  return next();
   
}

module.exports = saveLogs;
