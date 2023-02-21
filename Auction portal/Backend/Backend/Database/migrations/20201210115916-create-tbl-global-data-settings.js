'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tbl_global_data_settings', {
      globalSettingsId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      field: {
        type: Sequelize.JSON,
      },
      noOfColumnsWeb: {
        type: Sequelize.INTEGER,
      },
      noOfColumnsMobile: {
        type: Sequelize.INTEGER,
      },
      information: {
        type: Sequelize.JSON,
      },
      bannerRotationSpeed: {
        type: Sequelize.FLOAT
      },
      showViewCount:{
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      showBidButton:{
        type: Sequelize.BOOLEAN,
        defaultValue:false
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
    return queryInterface.dropTable('tbl_global_data_settings');
  }
};