"use strict";


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull:true
      },
      phone: {
        type: DataTypes.STRING,
        unique:true
      },
      email: {
        type: DataTypes.STRING,
        unique:true,
        allowNull: true,
      },
      verificationCode:{
        type:DataTypes.INTEGER,
        allowNull:true
      },
      role: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
        allowNull:true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
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
    await queryInterface.dropTable("Users");
  },
};
