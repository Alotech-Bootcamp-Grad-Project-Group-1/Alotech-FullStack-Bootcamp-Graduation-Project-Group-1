require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./models");
const authRoute = require("./routes/authRout");
const authorization = require("./middleware/authorization");
const log4js = require("log4js");
var fs = require('fs');
const saveLogs = require('./middleware/saveLogs')
const storeLogsToDB = require('./middleware/storeLogsToDB')

const app = express();

const corsConfig = {
  credentials: true,
  origin: true,
};

app.use(cors(corsConfig));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(saveLogs);
app.use(storeLogsToDB);


app.post("/", authorization);
app.use("/auth", authRoute);

const PORT = process.env.PORT || 5000;

db.sequelize.sync({ force: false }).then(() => { 
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
