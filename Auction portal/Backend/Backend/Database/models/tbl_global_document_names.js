"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_global_document_names = sequelize.define(
    "tbl_global_document_names",
    {
      globalDocumentNameId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      settingsId: DataTypes.INTEGER,
      documentCategoryName: DataTypes.STRING,
    },
    {}
  );
  tbl_global_document_names.associate = function (models) {
    // associations can be defined here
    tbl_global_document_names.belongsTo(models.tbl_global_data_settings, {
      foreignKey: "settingsId",
      as: "documentNames",
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    });
  };
  return tbl_global_document_names;
};
