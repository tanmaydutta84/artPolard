'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tbl_global_document_names', {
      globalDocumentNameId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      settingsId: {
        type: Sequelize.INTEGER,
        references: { model: "tbl_global_data_settings", key: "globalSettingsId" },
        onDelete: "CASCADE"
      },
      documentCategoryName: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('tbl_global_document_names');
  }
};