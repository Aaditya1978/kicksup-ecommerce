'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order.init({
    user_id: DataTypes.INTEGER,
    order_date: DataTypes.DATE,
    cart_id: DataTypes.INTEGER,
    total: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'order',
  });

  order.associate = function(models) {
    order.belongsTo(models.user, {
      foreignKey: 'user_id',
      as: 'user'
    });

    order.belongsTo(models.cart, {
      foreignKey: 'cart_id',
      as: 'cart'
    });
  };

  return order;
};