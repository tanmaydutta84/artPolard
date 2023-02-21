'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tbl_global_bid_increment_settings', {
      globalBidIncrementSettingId: {
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
      amount: {
        type: Sequelize.INTEGER
      },
      flag: {
        type: Sequelize.ENUM,
        values: ["Upto", "Plus"],
        defaultValue: "Upto",
      },
      increment: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('tbl_global_bid_increment_settings');
  }
};