const express = require("express");
const Router = express.Router();
const db = require("../models/db");
const Product = db.product;

// route to get all products
Router.get("/all", async (req, res) => {
    const products = await Product.findAll();
    const types = [];
    products.forEach((product) => {
        if (!types.includes(product.category)) {
            types.push(product.category);
        }
    });
    return res.status(200).send({products: products, types: types});
});

// route to get product by id
Router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const product = await Product.findOne({ where: { id: id } });
    if (!product) {
        return res.status(400).send({ message: "Product not found!" });
    }
    return res.status(200).send({product: product});
});

// route to get products by filter
Router.post("/filter", async (req, res) => {
    const costFilter = req.body.costFilter;
    const typeFilter = req.body.typeFilter;
    const products = await Product.findAll();
    const filteredProducts = [];
    products.forEach((product) => {
        if (( costFilter.includes("cost1") && product.price < 1500 ) 
            || ( costFilter.includes("cost2") && product.price >= 1500 && product.price <= 4000 )
            || ( costFilter.includes("cost3") && product.price > 4000 && product.price <= 7000 )
            || ( costFilter.includes("cost4") && product.price > 7000 )
            || typeFilter.includes(product.category)) {
            filteredProducts.push(product);
        }
    });
    return res.status(200).send({products: filteredProducts});
});

module.exports = Router;