"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_item = sequelize.define(
    "tbl_item",
    {
      itemId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      price: DataTypes.INTEGER,
      bidCount: DataTypes.INTEGER,
      availability: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      ratingCount: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      manufactureId: DataTypes.INTEGER,
      itemDescription: DataTypes.TEXT,
      itemCharacteristics: DataTypes.TEXT,
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true }  
    },
    {}
  );
  tbl_item.associate = function(models) {
    // associations can be defined here
    tbl_item.belongsTo(models.tbl_category, {
      foreignKey: "categoryId",
      sourceKey: "categoryId",
      as: "category"
    });
    tbl_item.belongsTo(models.tbl_user, {
      foreignKey: "sellerId",
      as: "seller",
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    tbl_item.belongsTo(models.tbl_user, {
      foreignKey: "manufactureId",
      as: "manufacturer",
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return tbl_item;
};
