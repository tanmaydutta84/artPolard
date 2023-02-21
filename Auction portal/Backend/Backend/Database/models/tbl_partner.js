"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_partner = sequelize.define(
    "tbl_partner",
    {
      partnerId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: DataTypes.STRING,
      icon: DataTypes.STRING,
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
    {}
  );
  tbl_partner.associate = function(models) {
    // associations can be defined here
  };
  return tbl_partner;
};
