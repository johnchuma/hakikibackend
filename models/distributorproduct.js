"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DistributorProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DistributorProduct.belongsTo(models.User, {
        as: "distributor",
        foreignKey: "userId",
      });
    }
  }
  DistributorProduct.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      batchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "DistributorProduct",
    }
  );
  return DistributorProduct;
};
