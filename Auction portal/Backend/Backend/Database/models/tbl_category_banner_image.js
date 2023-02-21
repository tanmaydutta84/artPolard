"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_category_banner_image = sequelize.define(
    "tbl_category_banner_image",
    {
      categoryBannerImageId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {}
  );
  tbl_category_banner_image.associate = function (models) {
    // associations can be defined here
    tbl_category_banner_image.belongsTo(models.tbl_category, {
      foreignKey: "categoryId",
      as: "category",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };
  return tbl_category_banner_image;
};
