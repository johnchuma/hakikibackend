"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Lots", {
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
    await queryInterface.dropTable("Lots");
  },
};
