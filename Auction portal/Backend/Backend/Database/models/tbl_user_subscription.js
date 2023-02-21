"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_user_subscription = sequelize.define(
    "tbl_user_subscription",
    {
      userSubscriptionId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subscriptionId: {
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
  tbl_user_subscription.associate = function (models) {
    // associations can be defined here

   /*  tbl_user_subscription.belongsTo(models.tbl_user, {
      foreignKey: "userId",
      sourceKey: "userId",
      as: "user",
    }); */

    tbl_user_subscription.belongsTo(models.tbl_subscription, {
      foreignKey: "subscriptionId",
      sourceKey: "subscriptionId",
      as: "subscription",
    });
  };
  return tbl_user_subscription;
};
