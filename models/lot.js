"use strict";
const { Model } = require("sequelize");
const User = require("./user");
module.exports = (sequelize, DataTypes) => {
  class Lot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lot.belongsTo(models.User);
    }
  }
  Lot.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
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
