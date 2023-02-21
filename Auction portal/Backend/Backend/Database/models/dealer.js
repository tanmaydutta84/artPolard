'use strict';
module.exports = (sequelize, DataTypes) => {
  const dealer = sequelize.define('dealer', {
   
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone : {
          type : DataTypes.INTEGER,
          allowNull: false,
       },
      company: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Bysiness_type :{
        type: DataTypes.STRING,
        allowNull: false, 
      },
      Website: {
        type: DataTypes.STRING,
        allowNull: false,  
      },
      Address1: {
        type: DataTypes.STRING,
        allowNull: false,  
      },
      Address2: {
        type: DataTypes.STRING,
        allowNull: false,  
      },
      city : {
        type: DataTypes.STRING,
        allowNull: false, 
      },
      
      state : {
        type: DataTypes.STRING,
        allowNull: false, 
      },

      postalcode: {
        type: DataTypes.STRING,
        allowNull: false, 
      },

      country :{
        type: DataTypes.STRING,
        allowNull: false, 
      },

      logo : {
        type: DataTypes.STRING,
        allowNull: false, 
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
 


  }, {});

  dealer.associate = function(models) {
    // associations can be defined here
  };
  return dealer;
};