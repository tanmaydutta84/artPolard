"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_state = sequelize.define(
    "tbl_state",
    {
      stateId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
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
  tbl_state.associate = function (models) {
    // associations can be defined here
    tbl_state.belongsTo(models.tbl_country, {
      foreignKey: "countryId",
      sourceKey: "countryId",
      as: "country",
    });

    tbl_state.hasMany(models.tbl_city, {
      as: "city",
    });
  };

  return tbl_state;
};
