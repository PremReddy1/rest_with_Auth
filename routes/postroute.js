const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const router = express.Router();
let isAuthenticated = false;
const UserModel = require("../models/users");
// const UserSchema = new mongoose.Schema({
//   email: String,
//   password: String,
// });

// const UserModel = mongoose.model("Users", UserSchema);

router.get("/", (req, res) => {
  const fullPath = path.join(__dirname, "../src/signup.html");
  res.sendFile(fullPath);
});
router.get("/login.html", (req, res) => {
  isAuthenticated = true;
  const fullPath = path.join(__dirname, "../src/login.html");
  res.sendFile(fullPath);
});
router.get("/signup.html", (req, res) => {
  const fullPath = path.join(__dirname, "../src/signup.html");
  res.sendFile(fullPath);
});

function checkAuthentication(req, res, next) {
  if (isAuthenticated) {
    return next();
  }
  res.redirect("/");
}

router.get("/users", checkAuthentication, (req, res) => {
  const users = UserModel.find({})
    .select("email password")
    .then((users) => {
      res.json({ users: users });
    });
});

router.post("/", async (req, res) => {
  const users = new UserModel(req.body);
  await users.save();
  res.redirect("/login.html");
});

router.post("/login.html", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate login credentials
    const user = await UserModel.findOne({ email, password });

    if (user) {
      // Successful login
      res.redirect("/users");
    } else {
      // Invalid credentials
      res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    // Handle errors
    res.status(500).send(error.message);
  }
});

module.exports = router;
