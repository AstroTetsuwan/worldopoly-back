const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());


app.get("/api", (req, res) => {
  res.send("You did it! 🥳");
});

const api = functions.https.onRequest(app);

module.exports = {api};
