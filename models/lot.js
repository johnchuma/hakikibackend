"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Lot.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      supplierId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lotNo: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        unique: true,
      },
      packageSize: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      stickersCount: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Lot",
    }
  );
  return Lot;
};
