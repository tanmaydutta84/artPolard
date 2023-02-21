'use strict';
module.exports = (sequelize, DataTypes) => {
  const tbl_global_charges_selected_colours = sequelize.define('tbl_global_charges_selected_colours', {
    globalchargesSelectedColourId:{  allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,},
    settingsId: DataTypes.INTEGER,
    selectedColour: DataTypes.STRING
  }, {});
  tbl_global_charges_selected_colours.associate = function(models) {
    // associations can be defined here
    tbl_global_charges_selected_colours.belongsTo(models.tbl_global_data_settings, {
      foreignKey: "settingsId",
      as: "selectedColours",
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    });
  };
  return tbl_global_charges_selected_colours;
};