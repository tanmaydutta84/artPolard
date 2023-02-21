"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_newsletter = sequelize.define(
    "tbl_newsletter",
    {
      newsletterId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
        },
        allowNull: false,
      },
      isRegistered: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      isSubscribed: {
        allowNull: false,
        defaultValue: true,
        type: DataTypes.BOOLEAN,
      },
      isActive: {
        allowNull: false,
        defaultValue: true,
        type: DataTypes.BOOLEAN,
      },
    },
    {}
  );
  tbl_newsletter.associate = function (models) {
    // associations can be defined here
  };
  return tbl_newsletter;
};
