'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tbl_category_sales_types', {
      categorySalesTypeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: { model: "tbl_categories", key: "categoryId" },
        onDelete: "CASCADE",
      },
      auctionAvailable: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      buyItOption: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      baseFee: {
        type: Sequelize.FLOAT
      },
      percentageOfBasePrice: {
        type: Sequelize.INTEGER
      },
      percentageOfIncrease: {
        type: Sequelize.INTEGER
      },
      maxFee: {
        type: Sequelize.FLOAT
      },
      buyersPremium: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      fixedPriceAvailable: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      priceToList: {
        type: Sequelize.FLOAT
      },
      percentageOfFixedPrice: {
        type: Sequelize.INTEGER
      },
      maxFeeOfFixedPrice: {
        type: Sequelize.FLOAT
      },
      contactSellerAvailable: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      displayPrice: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      displaySellerPhoneNumber: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      displaySellerName: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      displayContactForm: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      priceToListForContact: {
        type: Sequelize.FLOAT
      },
      percentageOfPriceForContact: {
        type: Sequelize.INTEGER
      },
      maxFeeForContact: {
        type: Sequelize.FLOAT
      },
      pricePerInquiry: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tbl_category_sales_types');
  }
};