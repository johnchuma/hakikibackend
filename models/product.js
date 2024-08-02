'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    uuid:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
      allowNull:false
    },
    price: {
      type: DataTypes.FLOAT,
    },
    manufactureDate: {
      type: DataTypes.DATE,
    },
    expireDate: {
      type: DataTypes.DATE,
    },
    introduction: {
      type: DataTypes.TEXT,
    },
    details: {
      type: DataTypes.TEXT,
    },
    usageDetails: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    videoLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    OID: {
      type: DataTypes.STRING,
      allowNull:true
    },
    size: {
      type: DataTypes.DOUBLE,
    },
    scratchCode: {
      type: DataTypes.STRING,
      allowNull:true
    },
    supplierId: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};