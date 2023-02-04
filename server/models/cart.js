'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cart.init({
    user_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'cart',
  });

  cart.associate = function(models) {
    cart.belongsTo(models.user, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };

  cart.associate = function(models) {
    cart.hasMany(models.cartItem, {
      foreignKey: 'cart_id',
      as: 'cartItems'
    });
  };

  return cart;
};