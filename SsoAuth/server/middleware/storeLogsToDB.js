var fs = require('fs');
var path = require('path');
const db = require('../models')

// Location of Log file
var jsonPath = path.join(__dirname, '..', 'authorization.txt');

const Log = db.Log;

// Middleware, Saves Logs from authorization.txt to Log Database
const storeLogsToDB = async (req, res, next) => {

  // Reads Log file
  var txtString = fs.readFileSync(jsonPath, 'utf8');

  const arrtxtString = txtString.split(",") 

  if (arrtxtString.length > 1 ) {

    const lastLog = arrtxtString[arrtxtString.length -2 ]
    const logInfo = {log: lastLog}
    
    // Saves Log to Log Database;
    const createLog =  async (logInfo) => { 
      await Log.create(logInfo);
      console.log(logInfo); 
    }
  
    createLog(logInfo);
  
    return next();
  }
  return next();
}

module.exports = storeLogsToDB;