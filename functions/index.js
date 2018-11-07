const { https } = require("firebase-functions");
const express = require("express");
const cors = require("cors")({ origin: true });
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
admin.initializeApp();
const { email, emailValidators } = require("./email");

const app = express();
const main = express();

main.use(cors);
main.use("/", app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

app.post("/email", emailValidators, (req, res) => email(req, res));

exports.api = https.onRequest(main);
