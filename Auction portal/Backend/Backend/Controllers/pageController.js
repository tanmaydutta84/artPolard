/*
 * Summary:     adminController file for handling all requests and response of Page  - CMS
 * Author:      Openxcell(empCode-473)
 */

/*Messages,status code and services require*/
const status = require("../Configs/statusCode").status;
const message = require("../Configs/cmsMessage").cmsMessage;
const pageService = require("../Services/pageService");

module.exports = {













  /* List Static Content */



  async uploadhtmlcss(req, res) {
    try {
      //response on add user
      let logUserr = await pageService.uploadhtmlCSS(req, res);
      if (logUserr) {
        res.send("Success");
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

  /*
  async uploadhtmlcss(req, res) {
    try {
      await pageService.uploadhtmlCSS(req, res);
      //response of update static content
      res.status(status.SUCCESS).send({
        data: [],
        message: message.pageUpdated,
        status: status.success,
      });
    } catch (error) {
     
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.error,
      });
    }
  },
  */






  /* Update Static Content*/
  async updateStaticContent(req, res) {
    try {
      await pageService.updateStaticContent(req, res);
      //response of update static content
      res.status(status.SUCCESS).send({
        data: [],
        message: message.pageUpdated,
        status: status.success,
      });
    } catch (error) {
      console.log("updateStaticContent -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.error,
      });
    }
  },
};
