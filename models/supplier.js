"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Supplier.belongsTo(models.User)
      // define association here
    }
  }
  Supplier.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      uuid:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
      },
      
    },
    {
      sequelize,
      modelName: "Supplier",
    }
  );
  return Supplier;
};
