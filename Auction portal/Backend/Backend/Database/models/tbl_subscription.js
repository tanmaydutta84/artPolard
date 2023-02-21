"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_subscription = sequelize.define(
    "tbl_subscription",
    {
      subscriptionId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {}
  );
  tbl_subscription.associate = function (models) {
    // associations can be defined here
  };
  return tbl_subscription;
};
