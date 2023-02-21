"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_user = sequelize.define(
    "tbl_user",
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Username already exists!",
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email address is already in use!",
        },
        validate: {
          isEmail: {
            msg: "Email address must be valid",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profileImage: {
        type: DataTypes.STRING,
      },
      verificationCode: {
        type: DataTypes.STRING,
      },
      otp: {
        type: DataTypes.STRING,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {}
  );
  tbl_user.associate = function (models) {
    // associations can be defined here

   /*  tbl_user.hasMany(models.tbl_subscription, {
      as: "subscription",
    }); */

    tbl_user.hasOne(models.tbl_user_business_info, {
      foreignKey: "userId",
      sourceKey: "userId",
      as: "userBusiness",
    });

    tbl_user.hasOne(models.tbl_user_detail, {
      foreignKey: "userId",
      sourceKey: "userId",
      as: "userDetail",
    });

    tbl_user.hasMany(models.tbl_user_subscription, {
      foreignKey: "userId",
      sourceKey: "userId",
      as: "userSubscription",
    });
  };
  return tbl_user;
};
