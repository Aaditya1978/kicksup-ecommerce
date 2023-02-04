'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    rating: DataTypes.FLOAT,
    category: DataTypes.STRING,
    images: DataTypes.STRING,
    size: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product',
  });

  product.associate = function(models) {
    product.hasMany(models.cartItem, {
      foreignKey: 'product_id',
      as: 'cartItems'
    });
  };

  return product;
};