"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_category_field = sequelize.define(
    "tbl_category_field",
    {
      categoryFieldId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: { model: "tbl_categories", key: "categoryId" },
        onDelete: "CASCADE",
      },
      field: { type: DataTypes.JSON },
    },
    {}
  );
  tbl_category_field.associate = function (models) {
    // associations can be defined here
    tbl_category_field.belongsTo(models.tbl_category, {
      foreignKey: "categoryId",
      as: "categoryFields",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };
  return tbl_category_field;
};
