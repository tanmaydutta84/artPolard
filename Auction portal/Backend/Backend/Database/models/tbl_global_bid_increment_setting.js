"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_global_bid_increment_setting = sequelize.define(
    "tbl_global_bid_increment_setting",
    {
      globalBidIncrementSettingId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      settingsId: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      flag: {
        type: DataTypes.ENUM,
        values: ["Upto", "Plus"],
      },
      increment: DataTypes.INTEGER,
    },
    {}
  );
  tbl_global_bid_increment_setting.associate = function (models) {
    // associations can be defined here
    tbl_global_bid_increment_setting.belongsTo(
      models.tbl_global_data_settings,
      {
        foreignKey: "settingsId",
        as: "bidIncrements",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }
    );
  };
  return tbl_global_bid_increment_setting;
};
