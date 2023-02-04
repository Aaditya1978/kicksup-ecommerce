const express = require("express");
const Router = express.Router();
const db = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = db.admin;
const Product = db.product;
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

// route to register admin 
Router.post("/register", async (req, res) => {
    const email = req.body.email;
    // check if Admin already exist
    const admin = await Admin.findOne({ where: { email: email } });
    if (admin) {
        return res.status(400).send({ message: "Admin already exists!" });
    }
    // encrypt password
    const hash = await encryptPassword(req.body.password);
    // create Admin
    const newAdmin = await Admin.create({
        name: req.body.name,
        email: email,
        password: hash,
    });
    newAdmin.save();
    // create token
    const token = jwt.sign({ id: newAdmin.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    return res.status(200).send({ message: "Admin created successfully!", token: token });
});

// route to login Admin
Router.post("/login", async (req, res) => {
    // check if Admin exists
    const admin = await Admin.findOne({ where: { email: req.body.email } });
    if (!admin) {
        return res.status(400).send({ message: "Admin does not exist!" });
    }
    // compare password
    const result = await comparePassword(req.body.password, admin.password);
    if (!result) {
        return res.status(400).send({ message: "Invalid password!" });
    }
    // create token
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
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
        const admin = await Admin.findOne({ where: { id: decoded.id } });
        if (!admin) {
            return res.status(400).send({ message: "Admin does not exist!" });
        }
        return res.status(200).send({ message: "Admin details fetched successfully!", admin: admin });
    });
});


Router.post("/addproduct", async (req, res) => {
    // get token from header
    const token = req.body.token;
    if (!token) {
        return res.status(400).send({ message: "No token provided!" });
    }
    // verify token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        // get user details
        const admin = await Admin.findOne({ where: { id: decoded.id } });
        if (!admin) {
            return res.status(400).send({ message: "Admin does not exist!" });
        }
        // add product
        const images = JSON.stringify(req.body.images);
        const sizes = JSON.stringify(req.body.sizes);
        const newProduct = await Product.create({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            rating: req.body.rating,
            images: images,
            size: sizes,
        });
        newProduct.save();
        return res.status(200).send({ message: "Product added successfully!" });
    });
});


Router.get("/products", async (req, res) => {
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
        const admin = await Admin.findOne({ where: { id: decoded.id } });
        if (!admin) {
            return res.status(400).send({ message: "Admin does not exist!" });
        }
        // get products
        const products = await Product.findAll();
        return res.status(200).send({ message: "Products fetched successfully!", products: products });
    });
});

Router.delete("/deleteproduct/:id", async (req, res) => {
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
        const admin = await Admin.findOne({ where: { id: decoded.id } });
        if (!admin) {
            return res.status(400).send({ message: "Admin does not exist!" });
        }
        // delete product
        const product = await Product.findOne({ where: { id: req.params.id } });
        if (!product) {
            return res.status(400).send({ message: "Product does not exist!" });
        }
        await product.destroy();
        return res.status(200).send({ message: "Product deleted successfully!" });
    });
});


module.exports = Router;