'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductInquiry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductInquiry.init({
    inquiry: {
      type: DataTypes.TEXT,
    },
    productId:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    userId:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'ProductInquiry',
  });
  return ProductInquiry;
};