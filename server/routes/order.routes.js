const express = require("express");
const Router = express.Router();
const db = require("../models/db");
const Product = db.product;
const Cart = db.cart;
const CartItem = db.cartItem;
const Order = db.order;

// route to create order
Router.post("/create", async (req, res) => {
    const userId = req.body.user_id;
    const cart = await Cart.findOne({ where: { user_id: userId, status: "pending" } });
    if (!cart) {
        return res.status(400).send({ message: "Cart not found!" });
    }
    let total_price = 0;
    const cartItems = await CartItem.findAll({ where: { cart_id: cart.id } });
    await Promise.all(
        cartItems.map(async (item) => {
            const product = await Product.findOne({ where: { id: item.product_id } });
            total_price += product.price * item.quantity;
        })
    );
    // create order
    const newOrder = await Order.create({
        user_id: userId,
        cart_id: cart.id,
        order_date: new Date(),
        total: total_price
    });
    newOrder.save();
    // update cart status
    cart.status = "ordered";
    cart.save();
    return res.status(200).send({ message: "Order created successfully!", order: newOrder });
});


// route to get orders
Router.get("/get/:id", async (req, res) => {
    const userId = req.params.id;
    const orders = await Order.findAll({ where: { user_id: userId } });
    if (!orders) {
        return res.status(400).send({ message: "No orders found!" });
    }
    let orderData = [];
    await Promise.all(
        orders.map(async (order) => {
            const cart = await Cart.findOne({ where: { id: order.cart_id } });
            const cartItems = await CartItem.findAll({ where: { cart_id: cart.id } });
            const products = [];
            await Promise.all(
                cartItems.map(async (item) => {
                    const product = await Product.findOne({ where: { id: item.product_id } });
                    products.push({
                        name: product.name,
                        price: product.price,
                        quantity: item.quantity,
                        category: product.category,
                        image: JSON.parse(product.images)[0]
                    });
                })
            );
            orderData.push({
                order: order,
                products: products
            });
        })
    );
    return res.status(200).send({ message: "Orders fetched successfully!", orders: orderData });
});


module.exports = Router;