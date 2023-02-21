'use strict';
module.exports = (sequelize, DataTypes) => {
  const page_template = sequelize.define('page_template', {
   
    logo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    banner_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      banner_subtitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      banner_image: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      font: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      font_size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },



  }, {});

  page_template.associate = function(models) {
    // associations can be defined here
  };
  return page_template;
};