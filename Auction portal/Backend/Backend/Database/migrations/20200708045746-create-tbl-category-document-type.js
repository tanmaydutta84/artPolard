'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tbl_category_document_types', {
      categoryDocumentTypeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: { model: "tbl_categories", key: "categoryId" },
        onDelete: "CASCADE"
      },
     /*  categoryMediaId: {
        type: Sequelize.INTEGER,
        references: { model: "tbl_category_media", key: "categoryMediaId" },
        onDelete: "CASCADE"
      }, */
      documentTypeName: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('tbl_category_document_types');
  }
};