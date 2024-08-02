'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Distributer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Distributer.init({
    name: {
      type: DataTypes.STRING
    },
    userId:{
      type: DataTypes.INTEGER,
      allowNull:true
    },
    email:{
      type:DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Distributer',
  });
  return Distributer;
};