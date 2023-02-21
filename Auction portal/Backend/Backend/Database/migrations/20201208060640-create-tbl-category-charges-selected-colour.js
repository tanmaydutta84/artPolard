'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tbl_category_charges_selected_colours', {
      selectedColourId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryChargesId: {
        type: Sequelize.INTEGER,
        references: { model: "tbl_category_charges", key: "categoryChargesId" },
        onDelete: "CASCADE",
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: { model: "tbl_categories", key: "categoryId" },
        onDelete: "CASCADE",
      },
      selectedColour: {
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
    return queryInterface.dropTable('tbl_category_charges_selected_colours');
  }
};