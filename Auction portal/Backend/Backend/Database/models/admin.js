"use strict";
module.exports = (sequelize, DataTypes) => {
  const admin = sequelize.define(
    "admin",
    {
         EmailID: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          Password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          Role : {
            type: DataTypes.STRING,
            allowNull: false
          }

    },
    {}
  );
  admin.associate = function(models) {
    // associations can be defined here
  };
  return admin;
};
