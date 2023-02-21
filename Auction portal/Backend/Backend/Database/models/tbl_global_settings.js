"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_global_settings = sequelize.define(
    "tbl_global_settings",
    {
      settingsId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      bannerRotationSpeed: DataTypes.FLOAT,
    },
    {}
  );
  tbl_global_settings.associate = function (models) {
    // associations can be defined here
  };
  return tbl_global_settings;
};
