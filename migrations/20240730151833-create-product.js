"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      scanned:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      name: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productionCost:{
        type:DataTypes.FLOAT,
        defaultValue:null
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
        allowNull: true,
      },
      videoLink: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      OID: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      size: {
        type: DataTypes.DOUBLE,
      },
      scratchCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      supplierId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("Products");
  },
};
