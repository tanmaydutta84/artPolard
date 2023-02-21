/*
 * Summary:     layoutService file for handling all Layout - CMS related actions.
 * Author:      Openxcell(empCode-473)
 */

/**require NPM-modules,models and constants for configuration */
const layout = require("../Database/models").tbl_layout;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const constant = require("../Configs/constant");

module.exports = {
  /* Add Layout*/
  async addLayout(req, res) {
    return await layout.create({
      name: req.body.name,
      noOfImages: req.body.noOfImages
    });
  },

  /* Delete Layout*/
  async deleteLayout(req, res) {
    return await layout.destroy({
      where: {
        layoutId: req.body.layoutId
      }
    });
  },

  /*Layout Dropdown */
  async layoutDropdown(req, res) {
    return await layout.findAll({
      where: {isActive:true},
      attributes: ["layoutId", "name", "noOfImages"]
    });
  }
};
