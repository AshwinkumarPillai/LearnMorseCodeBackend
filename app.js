const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const loginRoutes = require("./routes/user.routes");

app.use(loginRoutes);
app.use("/schedule-pinger", (req, res) => {
  res.send("Thank you for keeping me alive pinger!\n-Learn Morse Code");
});

let MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3100;

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  app.listen(PORT);
  console.log("Connection established\nStanding by...");
  if (err) console.log("ERROR\n\n\n", err);
});
