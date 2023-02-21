"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_layout = sequelize.define(
    "tbl_layout",
    {
      layoutId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: DataTypes.STRING,
      noOfImages: DataTypes.INTEGER,
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
    },
    {}
  );
  tbl_layout.associate = function(models) {
    // associations can be defined here
  };
  return tbl_layout;
};
