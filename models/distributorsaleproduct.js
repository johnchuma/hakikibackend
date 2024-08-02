'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DistributorSaleProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DistributorSaleProduct.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DistributorSaleProduct',
  });
  return DistributorSaleProduct;
};