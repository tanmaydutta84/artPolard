"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_category_charges_selected_colour = sequelize.define(
    "tbl_category_charges_selected_colour",
    {
      selectedColourId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      categoryChargesId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      selectedColour: DataTypes.STRING,
    },
    {}
  );
  tbl_category_charges_selected_colour.associate = function (models) {
    // associations can be defined here
    tbl_category_charges_selected_colour.belongsTo(models.tbl_category, {
      foreignKey: "categoryId",
      as: "category",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    tbl_category_charges_selected_colour.belongsTo(models.tbl_category_charges, {
      foreignKey: "categoryId",
      as: "categoryCharges",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };
  return tbl_category_charges_selected_colour;
};
