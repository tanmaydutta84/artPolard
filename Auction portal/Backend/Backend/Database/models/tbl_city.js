"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_city = sequelize.define(
    "tbl_city",
    {
      cityId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      countryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {}
  );
  tbl_city.associate = function (models) {
    tbl_city.belongsTo(models.tbl_state, {
      foreignKey: "stateId",
      sourceKey: "stateId",
      as: "state",
    });

    tbl_city.belongsTo(models.tbl_country, {
      foreignKey: "countryId",
      sourceKey: "countryId",
      as: "country",
    });
  };
  return tbl_city;
};
