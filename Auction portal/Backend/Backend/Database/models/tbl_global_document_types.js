"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_global_document_types = sequelize.define(
    "tbl_global_document_types",
    {
      globalDocumentTypeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      settingsId: DataTypes.INTEGER,
      documentTypeName: DataTypes.STRING,
    },
    {}
  );
  tbl_global_document_types.associate = function (models) {
    // associations can be defined here
    tbl_global_document_types.belongsTo(models.tbl_global_data_settings, {
      foreignKey: "settingsId",
      as: "documentTypes",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };
  return tbl_global_document_types;
};
