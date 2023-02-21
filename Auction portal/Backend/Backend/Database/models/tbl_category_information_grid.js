"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_category_information_grid = sequelize.define(
    "tbl_category_information_grid",
    {
      categoryInformationGridId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      categoryId: DataTypes.INTEGER,
      noOfColumnsWeb: DataTypes.INTEGER,
      noOfColumnsMobile: DataTypes.INTEGER,
      information: DataTypes.JSON,
    },
    {}
  );
  tbl_category_information_grid.associate = function (models) {
    // associations can be defined here
    tbl_category_information_grid.belongsTo(models.tbl_category, {
      foreignKey: "categoryId",
      as: "categoryInformationGrids",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };
  return tbl_category_information_grid;
};
