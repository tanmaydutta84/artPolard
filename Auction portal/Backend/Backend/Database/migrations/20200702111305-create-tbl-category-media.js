"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("tbl_category_media", {
      categoryMediaId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: { model: "tbl_categories", key: "categoryId" },
        onDelete: "CASCADE",
      },
      imageAvailable:{
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      noOfFreeImages: {
        type: Sequelize.INTEGER,
      },
      maxImages: {
        type: Sequelize.INTEGER,
      },
      pricePerImage: {
        type: Sequelize.FLOAT,
      },
      documentAvailable:{
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      documentName: {
        type: Sequelize.STRING,
      },
      maxDocuments: {
        type: Sequelize.INTEGER,
      },
      videoAvailable:{
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      maxTitleLength: {
        type: Sequelize.INTEGER,
      },
      maxDescriptionLength: {
        type: Sequelize.INTEGER,
      },
      maxFreeVideos: {
        type: Sequelize.INTEGER,
      },
      maxVideos: {
        type: Sequelize.INTEGER,
      },
      pricePerVideo: {
        type: Sequelize.FLOAT,
      },
      maxVideoSize: {
        type: Sequelize.INTEGER,
        defaultValue: 50,
      },
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
    return queryInterface.dropTable("tbl_category_media");
  },
};
