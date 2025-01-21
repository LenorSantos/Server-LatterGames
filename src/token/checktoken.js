const {request, response} = require("express");
const jwt = require("jsonwebtoken");

function checktoken(privateKey, req = request, res = response, next) {
  if (req.headers.authorization) {
    jwt.verify(req.headers.authorization, privateKey, (err, decoded) => {
      // console.log(err);
      if (err) {
        res.status(401).end();
      } else {
        next();
      }
    });
  } else if (req.originalUrl === "/login") {
    next();
  } else {
    res.status(401).end();
  }
};

module.exports = { checktoken };