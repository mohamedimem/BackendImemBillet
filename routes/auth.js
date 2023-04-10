const express = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

// SIGN UP
authRouter.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with same email already exists!" });
    }

    const hashedPassword = await bcryptjs.hash(password, 8);

    let user = new User({
      email,
      password: hashedPassword,
      name,
    });
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Sign In Route
// Exercise
authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exist!" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password." });
    }

    const token = jwt.sign({ id: user._id }, "passwordKey");
    res.json({ token, ...user._doc });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

authRouter.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, "passwordKey");
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    res.json(true);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// get user data
authRouter.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({ ...user._doc, token: req.token });
});

//update user type to organisateur
authRouter.put("/api/organisateur", auth, async (req, res) => {
  try {
    var user = await User.findById(req.user);
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }else{
      if (user.type=='organisateur') {
        return res.status(400).json({ msg: "Already organisateur" });//code 401 par hazard
      }else{
      user.type = 'organisateur'; // Update the type field of the existing user
    user = await user.save();
    res.json(user);
    }
  } 
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//update user type to Superviseur
authRouter.put("/api/superviseur", auth, async (req, res) => {
  try {
    var user = await User.findById(req.user);
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }else{
      if (user.type=='superviseur') {
        return res.status(400).json({ msg: "Already superviseur" });//code 401 par hazard
      }else{
      user.type = 'superviseur'; // Update the type field of the existing user
    user = await user.save();
    res.json(user);
    }
  } 
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//update anytype type to user type
authRouter.put("/api/user", auth, async (req, res) => {
  try {
    var user = await User.findById(req.user);
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }else{
      if (user.type=='user') {
        return res.status(400).json({ msg: "Already user" });//code 401 par hazard
      }else{
      user.type = 'user'; // Update the type field of the existing user
    user = await user.save();
    res.json(user);
    }
  } 
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


module.exports = authRouter;
