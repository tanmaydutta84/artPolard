"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("tbl_items", {
      itemId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      bidCount: {
        type: Sequelize.INTEGER
      },
      availability: {
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: { model: "tbl_categories", key: "categoryId" },
        onDelete: "CASCADE"
      },
      ratingCount: {
        type: Sequelize.INTEGER
      },
      sellerId: {
        type: Sequelize.INTEGER,
        references: { model: "tbl_users", key: "userId" },
        onDelete: "CASCADE"
      },
      manufactureId: {
        type: Sequelize.INTEGER,
        references: { model: "tbl_users", key: "userId" },
        onDelete: "CASCADE"
      },
      itemDescription: {
        type: Sequelize.TEXT
      },
      itemCharacteristics: {
        type: Sequelize.TEXT
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
    return queryInterface.dropTable("tbl_items");
  }
};
