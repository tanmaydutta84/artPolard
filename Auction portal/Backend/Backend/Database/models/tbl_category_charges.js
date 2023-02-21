"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_category_charges = sequelize.define(
    "tbl_category_charges",
    {
      categoryChargesId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      categoryId: DataTypes.INTEGER,
      boldFaceTitle: DataTypes.FLOAT,
      coloredTitle: DataTypes.FLOAT,
      featuredListing: DataTypes.FLOAT,
      highLightedListing: DataTypes.FLOAT,
      scheduledListing:DataTypes.FLOAT,
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
    },
    {}
  );
  tbl_category_charges.associate = function (models) {
    // associations can be defined here
    tbl_category_charges.belongsTo(models.tbl_category, {
      foreignKey: "categoryId",
      as: "categoryCharges",
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    });
    tbl_category_charges.hasMany(models.tbl_category_charges_selected_colour, {
      foreignKey: "categoryChargesId",
      as: "selectedColours",
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    });
  };
  return tbl_category_charges;
};
