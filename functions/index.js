const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const apiRouter = require("./api/router");
const appService = require("./api/src/services/core/app");


appService.init();

const app = express();
app.use(cors());
app.use("/api", apiRouter);

const api = functions.https.onRequest(app);

module.exports = {api};
