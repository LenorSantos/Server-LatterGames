const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();



function checktoken(next) {
  const token = app.request.headers.token;
  console.log(token);
  app.response.status(200).end();
  // jwt.verify(token, (err, decoded) => {
  //   if (err) console.log(err);
  //   console.log(decoded);
  //   app.response.status(200).end();
  // });
};

module.exports = {checktoken};