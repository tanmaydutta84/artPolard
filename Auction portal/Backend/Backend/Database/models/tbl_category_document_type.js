"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_category_document_type = sequelize.define(
    "tbl_category_document_type",
    {
      categoryDocumentTypeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      categoryId: DataTypes.INTEGER,
      documentTypeName: DataTypes.STRING,
    },
    {}
  );
  tbl_category_document_type.associate = function (models) {
    // associations can be defined here
    tbl_category_document_type.belongsTo(models.tbl_category, {
      foreignKey: "categoryId",
      as: "categoryDocumentType",
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    });
  /*   tbl_category_document_type.belongsTo(models.tbl_category_media, {
      foreignKey: "categoryMediaId",
      as: "categoryMediaDocument",
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    }); */
  };
  return tbl_category_document_type;
};
