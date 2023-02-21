'use strict';
module.exports = (sequelize, DataTypes) => {
  const tbl_category_document_name = sequelize.define('tbl_category_document_name', {
    categoryDocumentNameId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    categoryId: DataTypes.INTEGER,
    documentCategoryName: DataTypes.STRING
  }, {});
  tbl_category_document_name.associate = function(models) {
    // associations can be defined here
    tbl_category_document_name.belongsTo(models.tbl_category, {
      foreignKey: "categoryId",
      as: "categoryMediaDocumentCategoryName",
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    });
  };
  return tbl_category_document_name;
};