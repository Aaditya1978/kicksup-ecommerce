const express = require("express");
const Router = express.Router();
const db = require("../models/db");
const Product = db.product;
const Cart = db.cart;
const CartItem = db.cartItem;

// roure to add product to cart
Router.post("/add", async (req, res) => {
    const productId = req.body.product_id;
    const userId = req.body.user_id;
    const quantity = req.body.quantity;
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
        return res.status(400).send({ message: "Product not found!" });
    }
    // check if cart exists where status is pending
    const cart = await Cart.findOne({ where: { user_id: userId, status: "pending" } });
    if (!cart) {
        // create new cart
        const newCart = await Cart.create({
            user_id: userId,
            status: "pending"
        });
        newCart.save();
        // create new cart item
        const newCartItem = await CartItem.create({
            cart_id: newCart.id,
            product_id: productId,
            quantity: quantity
        });
        newCartItem.save();
        return res.status(200).send({ message: "Product added to cart successfully!", cartItem: newCartItem });
    }
    else{
        // check if product already exists in cart
        const cartItem = await CartItem.findOne({ where: { cart_id: cart.id, product_id: productId } });
        if (!cartItem) {
            // create new cart item
            const newCartItem = await CartItem.create({
                cart_id: cart.id,
                product_id: productId,
                quantity: quantity
            });
            newCartItem.save();
            return res.status(200).send({ message: "Product added to cart successfully!", cartItem: newCartItem });
        }
        else{
            // update quantity
            cartItem.quantity += 1;
            cartItem.save();
            return res.status(200).send({ message: "Product added to cart successfully!", cartItem: cartItem });
        }
    }
});


// route to get cart items
Router.get("/get/:id", async (req, res) => {
    const userId = req.params.id;
    // check if cart exists where status is pending
    const cart = await Cart.findOne({ where: { user_id: userId, status: "pending" } });
    if (!cart) {
        return res.status(400).send({ message: "Cart not found!" });
    }
    // get cart items
    const cartItems = await CartItem.findAll({ where: { cart_id: cart.id } });
    const cartItemsWithProduct = [];
    for (let i = 0; i < cartItems.length; i++) {
        const cartItem = cartItems[i];
        const product = await Product.findOne({ where: { id: cartItem.product_id } });
        cartItemsWithProduct.push({
            cartItemId: cartItem.id,
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: cartItem.quantity,
            image: JSON.parse(product.images)[0]
        });
    }
    if (!cartItems) {
        return res.status(400).send({ message: "Cart items not found!" });
    }
    return res.status(200).send({ message: "Cart items fetched successfully!", cartItems: cartItemsWithProduct });
});


// route to remove cart item
Router.delete("/remove/:id", async (req, res) => {
    const cartItemId = req.params.id;
    // check if cart item exists
    const cartItem = await CartItem.findOne({ where: { id: cartItemId } });
    if (!cartItem) {
        return res.status(400).send({ message: "Cart item not found!" });
    }
    // delete cart item
    cartItem.destroy();
    return res.status(200).send({ message: "Cart item removed successfully!" });
});


module.exports = Router;