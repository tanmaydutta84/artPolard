"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_country = sequelize.define(
    "tbl_country",
    {
      countryId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      shortName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      hooks: {
        beforeCreate: function (country, options, fn) {
          country.createdAt = new Date();
          country.updatedAt = new Date();
          fn(null, country);
        },
        beforeUpdate: function (country, options, fn) {
          country.updatedAt = new Date();
          fn(null, country);
        },
      },
    }
  );
  tbl_country.associate = function (models) {
    // associations can be defined here
  };
  return tbl_country;
};
