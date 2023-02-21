"use strict";
module.exports = (sequelize, DataTypes) => {
  const customer_service = sequelize.define(
    "customer_service",
    {
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          Username: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          Username: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          Emailid :{
            type: DataTypes.STRING,
            allowNull: false,
          },


          Password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          Status : {
            type: DataTypes.STRING,
            allowNull: false
          },
          isActive : {
            type: DataTypes.STRING,
            allowNull: false
          }

    },
    {}
  );
  customer_service.associate = function(models) {
    // associations can be defined here
  };
  return customer_service;
};
