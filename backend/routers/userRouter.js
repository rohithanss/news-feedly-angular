const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = require("../middlewares/authentication");
const UserModel = require("../models/UserModel");
const SECRET_KEY = process.env.SECRET_KEY;

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  let { name, email, password } = req.body;
  if (name == undefined || email == undefined || password == undefined) {
    res.send({ msg: "some fields are missing", status: "fail" });
    return;
  }
  let userExist = await UserModel.findOne({ email });

  try {
    if (userExist?.email) {
      return res.send({ msg: "user already exists", status: "fail" });
    }
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.send({
          msg: "error while signing up try again",
          status: "error",
        });
      } else {
        let user = new UserModel({
          name,
          email,
          password: hash,
        });
        let savedUser = await user.save();
        let token = jwt.sign({ userId: savedUser._id }, SECRET_KEY);

        res.send({
          msg: "sign up successful",
          status: "success",
          token,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.send({ msg: "error registering", status: "error" });
  }
});

userRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;
  if (email == undefined || password == undefined) {
    res.status(400).send({ msg: "some fields are missing", status: "fail" });
    return;
  }
  let userExist = await UserModel.find({ email });
  if (userExist.length == 0) {
    res.send({ msg: "wrong Credentials", status: "fail" });
  } else {
    let user = userExist[0];
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.send({ msg: "Error while logging in", status: "error" });
      } else {
        if (result) {
          let token = jwt.sign({ userId: user._id }, SECRET_KEY);
          res.status(202).send({
            token,
            msg: "login Successful",
            status: "success",
          });
        } else {
          res.send({ msg: "wrong Credentials", status: "fail" });
        }
      }
    });
  }
});

userRouter.get("/profile", authentication, async (req, res) => {
  let userId = req.body.userId;
  try {
    let { name, email } = await UserModel.findById({ _id: userId });
    res.send({ name, email, userId, status: "success" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "something Went wrong! try again later", status: "error" });
  }
});

module.exports = userRouter;
