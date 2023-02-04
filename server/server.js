require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models/db");
const userRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");

// port
const PORT = process.env.PORT || 5000;

// create express app
const app = express();
app.use(express.json());
app.use(cors());

// connect to db
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
}).catch((err) => {
    console.log("Failed to sync db: " + err.message);
});


// routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

// run server
app.listen(PORT, () => {
  console.log("server started on port " + PORT);
});