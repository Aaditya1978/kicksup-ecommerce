const express = require("express");
const Router = express.Router();
const db = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = db.user;
const saltRounds = 10;

// function to encrypt password
const encryptPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      }
      resolve(hash);
    });
  });
};

// function to compare password
const comparePassword = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

// route to register user 
Router.post("/register", async (req, res) => {
    const email = req.body.email;
    // check if user already exist
    const user = await User.findOne({ where: { email: email } });
    if (user) {
        return res.status(400).send({ message: "User already exists!" });
    }
    // encrypt password
    const hash = await encryptPassword(req.body.password);
    // create user
    const newUser = await User.create({
        name: req.body.name,
        email: email,
        address: req.body.address,
        password: hash,
    });
    newUser.save();
    // create token
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    return res.status(200).send({ message: "User created successfully!", token: token });
});

// route to login user
Router.post("/login", async (req, res) => {
    // check if user exists
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
        return res.status(400).send({ message: "User does not exist!" });
    }
    // compare password
    const result = await comparePassword(req.body.password, user.password);
    if (!result) {
        return res.status(400).send({ message: "Invalid password!" });
    }
    // create token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    return res.status(200).send({ message: "Login successful!", token: token });
});

Router.get("/details", async (req, res) => {
    // get token from header
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(400).send({ message: "No token provided!" });
    }
    // verify token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        // get user details
        const user = await User.findOne({ where: { id: decoded.id } });
        if (!user) {
            return res.status(400).send({ message: "User does not exist!" });
        }
        return res.status(200).send({ message: "User details fetched successfully!", user: user });
    });
});


module.exports = Router;