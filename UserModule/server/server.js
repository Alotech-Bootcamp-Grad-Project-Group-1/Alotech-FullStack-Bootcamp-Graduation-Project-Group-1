require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./models");
const userRoute = require("./routes/userRoute");

// Initialize app
const app = express();

const corsConfig = {
  credentials: true,
  origin: true,
};

// Middlewares
app.use(cors(corsConfig));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// User module server routers
app.use("/users", userRoute);

// Initialize Port number
const PORT = process.env.PORT || 9005;

// Starts server
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
