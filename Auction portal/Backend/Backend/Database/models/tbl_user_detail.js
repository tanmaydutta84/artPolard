"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_user_detail = sequelize.define(
    "tbl_user_detail",
    {
      userDetailId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      prefix: {
        type: DataTypes.ENUM,
        values: ["Mr", "Mrs", "Miss"],
        defaultValue: "Mr",
      },
      address1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address2: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      countryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      promocode: {
        type: DataTypes.STRING,
        unique: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {}
  );
  tbl_user_detail.associate = function (models) {
    // associations can be defined here
 /*    tbl_user_detail.belongsTo(models.tbl_user, {
      foreignKey: "userId",
      sourceKey: "userId",
      as: "userDetail",
    });
 */
    tbl_user_detail.belongsTo(models.tbl_city, {
      foreignKey: "cityId",
      sourceKey: "cityId",
      as: "city",
    });

    tbl_user_detail.belongsTo(models.tbl_state, {
      foreignKey: "stateId",
      sourceKey: "stateId",
      as: "state",
    });

    tbl_user_detail.belongsTo(models.tbl_country, {
      foreignKey: "countryId",
      sourceKey: "countryId",
      as: "country",
    });
  };
  return tbl_user_detail;
};
