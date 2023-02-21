/*
 * Summary:     layoutController file for handling all requests and response of Layout  - CMS
 * Author:      Openxcell(empCode-473)
 */

/*Messages,status code and services require*/
const status = require("../Configs/statusCode").status;
const message = require("../Configs/cmsMessage").cmsMessage;
const layoutService = require("../Services/layoutService");

module.exports = {
/* Add Layout */
  async addLayout(req, res) {
    try {
      await layoutService.addLayout(req, res);
      //response of add layout
      res.status(status.SUCCESS).send({
        data: [],
        message: message.layoutAdded,
        status: status.SUCCESS
      });
    } catch (error) {
      console.log("addLayout -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },

  /* Delete Layout */
  async deleteLayout(req, res) {
    try {
      //response on delete layout
      let delete_layout = await layoutService.deleteLayout(req, res);
      if (delete_layout) {
        res.status(status.SUCCESS).send({
          data: [],
          message: message.layoutDeleted,
          status: status.SUCCESS
        });
      }
    } catch (error) {
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },

   /* Layout Dropdown */
  async layoutDropdown(req, res) {
    try {
      let layout_List = await layoutService.layoutDropdown(req, res);

      if (layout_List) {
        //respnse of Dropdown of category And Sub-category
        res.status(status.SUCCESS).send({
          data: layout_List,
          message: message.success,
          status: status.SUCCESS
        });
      } else {
        res.status(status.SUCCESS).send({
          data: [],
          message: message.noRecordFound,
          status: status.SUCCESS
        });
      }
    } catch (error) {
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  }
};
