"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_category = sequelize.define(
    "tbl_category",
    {
      categoryId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      singularName:DataTypes.STRING,
      pluralName:DataTypes.STRING,
      categoryKeyId: DataTypes.INTEGER,
      image: DataTypes.STRING,
      mainLayoutImage: DataTypes.STRING,
      categoryType: {
        type: DataTypes.ENUM,
        values: ["MainCategory", "ParentCategory", "SubCategory"],
      },
      mainCategoryId: DataTypes.INTEGER,
      parentCategoryId: DataTypes.INTEGER,
      mainLayoutImagePlace: {
        type: DataTypes.ENUM,
        values: ["SlideShow", "Icon"],
      },
      layoutId: DataTypes.INTEGER,
      position: DataTypes.INTEGER,
      showBorder:{ type: DataTypes.BOOLEAN, defaultValue: false },
      borderWeight:{ type: DataTypes.INTEGER, defaultValue: 2 },
      percentageOnExtraAmount: DataTypes.INTEGER,
      discountOnProductListing: DataTypes.INTEGER,
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
      bannerStatus: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {}
  );
  tbl_category.associate = function (models) {
    // associations can be defined here
    tbl_category.belongsTo(models.tbl_category, {
      foreignKey: "parentCategoryId",
      as: "parentCategory",
    });
    tbl_category.belongsTo(models.tbl_category, {
      foreignKey: "mainCategoryId",
      as: "mainCategory",
    });
    tbl_category.hasMany(models.tbl_category_banner_image, {
      foreignKey: "categoryId",
      as: "categoryBannerImage",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    tbl_category.hasMany(models.tbl_category_document_type, {
      foreignKey: "categoryId",
      as: "categoryDocumentType",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    tbl_category.hasMany(models.tbl_category_document_name, {
      foreignKey: "categoryId",
      as: "categoryMediaDocumentCategoryName",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    tbl_category.hasOne(models.tbl_category_charges, {
      foreignKey: "categoryId",
      as: "categoryCharges",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    tbl_category.hasOne(models.tbl_category_media, {
      foreignKey: "categoryId",
      as: "categoryMedia",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    tbl_category.hasOne(models.tbl_category_sales_type, {
      foreignKey: "categoryId",
      as: "categorySalesType",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    tbl_category.hasOne(models.tbl_category_field, {
      foreignKey: "categoryId",
      as: "categoryFields",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    tbl_category.hasOne(models.tbl_category_information_grid, {
      foreignKey: "categoryId",
      as: "categoryInformationGrids",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    tbl_category.belongsTo(models.tbl_layout, {
      foreignKey: "layoutId",
      as: "layout",
      onUpdate: "SETNULLL",
      onDelete: "NO ACTION",
    });
  };
  return tbl_category;
};
