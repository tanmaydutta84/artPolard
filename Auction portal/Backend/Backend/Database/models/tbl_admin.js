"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_admin = sequelize.define(
    "tbl_admin",
    {
      adminId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email address already registered",
          fields: [sequelize.fn("lower", sequelize.col("email"))]
        }
      },
      password: DataTypes.STRING,
      passwordToken: DataTypes.STRING,
      image: DataTypes.STRING,
      otp: DataTypes.STRING,
      isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
    },
    {}
  );
  tbl_admin.associate = function(models) {
    // associations can be defined here
  };
  return tbl_admin;
};
