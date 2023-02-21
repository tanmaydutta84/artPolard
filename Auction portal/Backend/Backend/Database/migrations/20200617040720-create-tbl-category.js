"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("tbl_categories", {
      categoryId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      singularName: {
        type: Sequelize.STRING,
      },
      pluralName: {
        type: Sequelize.STRING,
      },
      categoryKeyId: {
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.STRING,
      },
      mainLayoutImage: {
        type: Sequelize.STRING,
      },
      categoryType: {
        type: Sequelize.ENUM,
        values: ["MainCategory", "ParentCategory", "ChildCategory"],
        defaultValue: "MainCategory",
      },
      mainCategoryId: {
        type: Sequelize.INTEGER,
        references: { model: "tbl_categories", key: "categoryId" },
        onDelete: "CASCADE",
      },
      parentCategoryId: {
        type: Sequelize.INTEGER,
        references: { model: "tbl_categories", key: "categoryId" },
        onDelete: "CASCADE",
      },
      mainLayoutImagePlace: {
        type: Sequelize.ENUM,
        values: ["SlideShow", "Icon"],
      },
      layoutId: {
        type: Sequelize.INTEGER,
        references: { model: "tbl_layouts", key: "layoutId" },
        onDelete: "NO ACTION",
      },
      position: {
        type: Sequelize.INTEGER,
      },
      showBorder: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      borderWeight: {
        type: Sequelize.INTEGER,
        defaultValue: 2,
      },
      percentageOnExtraAmount: {
        type: Sequelize.INTEGER,
      },
      discountOnProductListing: {
        type: Sequelize.INTEGER,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
      },
      bannerStatus: { type: Sequelize.BOOLEAN, defaultValue: true },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tbl_categories");
  },
};
