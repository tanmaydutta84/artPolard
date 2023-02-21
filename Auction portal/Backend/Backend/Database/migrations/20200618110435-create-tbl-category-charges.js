"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("tbl_category_charges", {
      categoryChargesId: {
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
      boldFaceTitle: {
        type: Sequelize.FLOAT,
      },
      coloredTitle: {
        type: Sequelize.FLOAT,
      },
      featuredListing: {
        type: Sequelize.FLOAT,
      },
      highLightedListing: {
        type: Sequelize.FLOAT,
      },
      scheduledListing: {
        type: Sequelize.FLOAT,
      },
      showcaseListing: {
        type: Sequelize.FLOAT,
      },
      subTitleListing: {
        type: Sequelize.FLOAT,
      },
      viewCounter: {
        type: Sequelize.FLOAT,
      },
      insertionFee: {
        type: Sequelize.FLOAT,
      },
      auctionListing: {
        type: Sequelize.FLOAT,
      },
      fixedPriceListing: {
        type: Sequelize.FLOAT,
      },
      contactSellerListing: {
        type: Sequelize.FLOAT,
      },
      inquiryListing: {
        type: Sequelize.FLOAT,
      },
      maxFee: {
        type: Sequelize.FLOAT,
      },
      autoRenewListing: {
        type: Sequelize.FLOAT,
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
    return queryInterface.dropTable("tbl_category_charges");
  },
};
