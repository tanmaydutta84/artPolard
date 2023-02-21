"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_user_business_info = sequelize.define(
    "tbl_user_business_info",
    {
      userBusinessInfoId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      companyName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      address1: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      address2: {
        allowNull: false,
        type: DataTypes.STRING,
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
        allowNull: false,
        type: DataTypes.STRING,
      },
      countryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      daytimePhone: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      otherPhone: {
        type: DataTypes.STRING,
      },
      faxNumber: {
        type: DataTypes.STRING,
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
  tbl_user_business_info.associate = function (models) {
    // associations can be defined here

   /*  tbl_user_business_info.belongsTo(models.tbl_user, {
      foreignKey: "userId",
      sourceKey: "userId",
      as: "userBusiness",
    }); */

    tbl_user_business_info.belongsTo(models.tbl_city, {
      foreignKey: "cityId",
      sourceKey: "cityId",
      as: "city",
    });

    tbl_user_business_info.belongsTo(models.tbl_state, {
      foreignKey: "stateId",
      sourceKey: "stateId",
      as: "state",
    });

    tbl_user_business_info.belongsTo(models.tbl_country, {
      foreignKey: "countryId",
      sourceKey: "countryId",
      as: "country",
    });
  };
  return tbl_user_business_info;
};
