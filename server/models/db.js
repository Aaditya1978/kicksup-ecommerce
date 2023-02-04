const Sequelize = require("sequelize");
const dbConfig = require("../db.config");
const user = require("./user.js");
const product = require("./product.js");
const cart = require("./cart.js");
const cartItem = require("./cartitem.js");
const order = require("./order.js");
const admin = require("./admin.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = user(sequelize, Sequelize);
db.product = product(sequelize, Sequelize);
db.cart = cart(sequelize, Sequelize);
db.cartItem = cartItem(sequelize, Sequelize);
db.order = order(sequelize, Sequelize);
db.admin = admin(sequelize, Sequelize);

module.exports = db;