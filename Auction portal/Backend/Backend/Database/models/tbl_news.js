"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_news = sequelize.define(
    "tbl_news",
    {
      newsId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: DataTypes.STRING,
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {}
  );
  tbl_news.associate = function (models) {
    // associations can be defined here
  };
  return tbl_news;
};
