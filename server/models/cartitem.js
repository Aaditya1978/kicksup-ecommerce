'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cartItem.init({
    cart_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'cartItem',
  });

  cartItem.associate = function(models) {
    cartItem.belongsTo(models.cart, {
      foreignKey: 'cart_id',
      as: 'cart'
    });
  };

  cartItem.associate = function(models) {
    cartItem.belongsTo(models.product, {
      foreignKey: 'product_id',
      as: 'product'
    });
  };

  return cartItem;
};