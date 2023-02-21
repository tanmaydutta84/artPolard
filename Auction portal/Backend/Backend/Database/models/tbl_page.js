'use strict';
module.exports = (sequelize, DataTypes) => {
  const tbl_page = sequelize.define('tbl_page', {
    pageId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    pageName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pageUrl: {
      allowNull: false,
      unique: {
        args: true,
        msg: "Page URL already exists!",
      },
      type: DataTypes.STRING
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {});
  tbl_page.associate = function(models) {
    // associations can be defined here
  };
  return tbl_page;
};