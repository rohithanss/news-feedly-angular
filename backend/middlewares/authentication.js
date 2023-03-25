const jwt = require("jsonwebtoken");
require("dotenv").config();

async function authentication(req, res, next) {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).send({ status: "fail", msg: "Token is missing" });
  }
  try {
    let decoded = jwt.verify(token, process.env.secret_key);

    req.body.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(400).send({ msg: "Please login again", status: err.message });
  }
}

module.exports = authentication;
