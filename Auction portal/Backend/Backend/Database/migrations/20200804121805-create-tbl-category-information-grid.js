"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("tbl_category_information_grids", {
      categoryInformationGridId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: { model: "tbl_categories", key: "categoryId" },
        onDelete: "CASCADE",
      },
      noOfColumnsWeb: {
        type: Sequelize.INTEGER,
      },
      noOfColumnsMobile: {
        type: Sequelize.INTEGER,
      },
      information: {
        type: Sequelize.JSON,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tbl_category_information_grids");
  },
};
