"use strict";
const { Model } = require("sequelize");
const { Batch } = require("../models");
module.exports = (sequelize, DataTypes) => {
  class BatchProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BatchProduct.belongsTo(models.Batch);
      BatchProduct.belongsTo(models.Product);
      // define association here
    }
  }
  BatchProduct.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      batchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "BatchProduct",
    }
  );
  return BatchProduct;
};
