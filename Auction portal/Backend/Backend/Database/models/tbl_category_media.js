"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_category_media = sequelize.define(
    "tbl_category_media",
    {
      categoryMediaId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      categoryId: DataTypes.INTEGER,
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
    },
    {}
  );
  tbl_category_media.associate = function (models) {
    // associations can be defined here
    tbl_category_media.belongsTo(models.tbl_category, {
      foreignKey: "categoryId",
      as: "categoryMedia",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    /*  tbl_category_media.hasMany(models.tbl_category_document_type, {
      foreignKey: "categoryMediaId",
      as: "categoryMediaDocument",
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    }); */
  };
  return tbl_category_media;
};
