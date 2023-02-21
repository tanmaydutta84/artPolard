"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_global_data_settings = sequelize.define(
    "tbl_global_data_settings",
    {
      globalSettingsId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      imageAvailable: { type: DataTypes.BOOLEAN, defaultValue: false },
      noOfFreeImages: DataTypes.INTEGER,
      maxImages: DataTypes.INTEGER,
      pricePerImage: DataTypes.FLOAT,
      documentAvailable: { type: DataTypes.BOOLEAN, defaultValue: false },
      documentName: DataTypes.STRING,
      maxDocuments: DataTypes.INTEGER,
      videoAvailable: { type: DataTypes.BOOLEAN, defaultValue: false },
      maxTitleLength: DataTypes.INTEGER,
      maxDescriptionLength: DataTypes.INTEGER,
      maxFreeVideos: DataTypes.INTEGER,
      maxVideos: DataTypes.INTEGER,
      pricePerVideo: DataTypes.FLOAT,
      maxVideoSize: { type: DataTypes.INTEGER, defaultValue: 50 },
      auctionAvailable: { type: DataTypes.BOOLEAN, defaultValue: false },
      buyItOption: { type: DataTypes.BOOLEAN, defaultValue: false },
      baseFee: DataTypes.FLOAT,
      percentageOfBasePrice: DataTypes.INTEGER,
      percentageOfIncrease: DataTypes.INTEGER,
      maxFee: DataTypes.FLOAT,
      buyersPremium: { type: DataTypes.BOOLEAN, defaultValue: false },
      fixedPriceAvailable: { type: DataTypes.BOOLEAN, defaultValue: false },
      priceToList: DataTypes.FLOAT,
      percentageOfFixedPrice: DataTypes.INTEGER,
      maxFeeOfFixedPrice: DataTypes.FLOAT,
      contactSellerAvailable: { type: DataTypes.BOOLEAN, defaultValue: false },
      displayPrice: { type: DataTypes.BOOLEAN, defaultValue: false },
      displaySellerPhoneNumber: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      displaySellerName: { type: DataTypes.BOOLEAN, defaultValue: false },
      displayContactForm: { type: DataTypes.BOOLEAN, defaultValue: false },
      priceToListForContact: DataTypes.FLOAT,
      percentageOfPriceForContact: DataTypes.INTEGER,
      maxFeeForContact: DataTypes.FLOAT,
      pricePerInquiry: DataTypes.FLOAT,
      boldFaceTitle: DataTypes.FLOAT,
      coloredTitle: DataTypes.FLOAT,
                                          featuredListing: DataTypes.FLOAT,
      highLightedListing: DataTypes.FLOAT,
      scheduledListing: DataTypes.FLOAT,
      showcaseListing: DataTypes.FLOAT,
      subTitleListing: DataTypes.FLOAT,
      viewCounter: DataTypes.FLOAT,
      insertionFee: DataTypes.FLOAT,
      auctionListing: DataTypes.FLOAT,
      fixedPriceListing: DataTypes.FLOAT,
      contactSellerListing: DataTypes.FLOAT,
      inquiryListing: DataTypes.FLOAT,
      maxFee: DataTypes.FLOAT,
      autoRenewListing: DataTypes.FLOAT,
      field: { type: DataTypes.JSON },
      noOfColumnsWeb: DataTypes.INTEGER,
      noOfColumnsMobile: DataTypes.INTEGER,
      information: DataTypes.JSON,
      bannerRotationSpeed: DataTypes.FLOAT,
      showViewCount: { type: DataTypes.BOOLEAN, defaultValue: false },
      showBidButton: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {}
  );
  tbl_global_data_settings.associate = function (models) {
    // associations can be defined here
    tbl_global_data_settings.hasMany(models.tbl_global_bid_increment_setting, {
      foreignKey: "settingsId",
      as: "bidIncrements",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    tbl_global_data_settings.hasMany(models.tbl_global_charges_selected_colours, {
      foreignKey: "settingsId",
      as: "selectedColours",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    tbl_global_data_settings.hasMany(models.tbl_global_document_names, {
      foreignKey: "settingsId",
      as: "documentNames",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    tbl_global_data_settings.hasMany(models.tbl_global_document_types, {
      foreignKey: "settingsId",
      as: "documentTypes",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };
  return tbl_global_data_settings;
};
