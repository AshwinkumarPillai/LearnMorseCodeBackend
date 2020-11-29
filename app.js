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

let MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  app.listen(3001);
  console.log("Connection established\nStanding by...");
  if (err) console.log("ERROR\n\n\n", err);
});
