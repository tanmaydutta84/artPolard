"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_category_sales_type = sequelize.define(
    "tbl_category_sales_type",
    {
      categorySalesTypeId: {
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
    },
    {}
  );
  tbl_category_sales_type.associate = function (models) {
    // associations can be defined here
    tbl_category_sales_type.belongsTo(models.tbl_category, {
      foreignKey: "categoryId",
      as: "categorySalesType",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };
  return tbl_category_sales_type;
};
