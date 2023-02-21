'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
   
    Product_id: {
        type : DataTypes.INTEGER,
        allowNull: false,
      },
      Product_Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Manufacturer_Name : {
        type: DataTypes.STRING,
        allowNull: false,
       },
       Manufacturer_Brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Price :{
        type : DataTypes.INTEGER,
        allowNull: false,
      },
      Category: {
        type: DataTypes.STRING,
        allowNull: false,  
      },
      Product_Description: {
        type: DataTypes.STRING,
        allowNull: false,  
      },
      Meta_Title: {
        type: DataTypes.STRING,
        allowNull: false,  
      },
      Meta_keywords: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
      
      Meta_Description: {
        type: DataTypes.STRING,
        allowNull: false, 
      },

      image: {
        type: DataTypes.STRING,
        allowNull: false, 
      },

      Date :{
        type: DataTypes.STRING,
        allowNull: false, 
      },

     


  }, {});

  product.associate = function(models) {
    // associations can be defined here
  };
  return product;
};