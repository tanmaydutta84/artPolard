"use strict";
module.exports = (sequelize, DataTypes) => {
  const tbl_admin_token = sequelize.define(
    "tbl_admin_token",
    {
      adminTokenId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      accessToken: DataTypes.STRING,
      adminId: DataTypes.INTEGER
    },
    {}
  );
  tbl_admin_token.associate = function(models) {
    // associations can be defined here
    tbl_admin_token.hasOne(models.tbl_admin, {
			foreignKey: 'adminId',
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
		});
  };
  return tbl_admin_token;
};
