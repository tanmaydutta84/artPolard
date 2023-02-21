"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_demo = sequelize.define(
    "tbl_demo",
    {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: DataTypes.STRING,
    
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email address already registered",
        }
      },
      phoneNumber: DataTypes.BIGINT,
      website: DataTypes.STRING,
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
    },
    {
      timestamps: false,
    },
  );
  tbl_demo.associate = function(models) {
    // associations can be defined here
  };
  return tbl_demo;
};