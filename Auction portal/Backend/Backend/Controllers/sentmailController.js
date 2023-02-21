/*
 * Summary:     adminController file for handling all requests and response of Admin  - CMS
 * Author:      Openxcell(empCode-473)
 */

/*Messages,status code and services require*/
const status = require("../Configs/statusCode").status;
const message = require("../Configs/cmsMessage").cmsMessage;
const adminService = require("../Services/adminService");

module.exports = {

  async sentMail(req, res) {
    try {
      let smail = await adminService.sentmail(req, res);
      if (smail) {
        //response of add partner
        res.status(status.SUCCESS).send({
          data: [],
          message: message.adminAdded,
          status: status.SUCCESS
        });
      }else{
        //email unique violation
        res.status(status.SUCCESS).send({
          data: [],
          message: message.emailRegistered,
          status: status.SERVER_ERROR
        });
      }
    } catch (error) {
     // console.log("addAdmin -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },

  /* Set Password */
  async setPassword(req, res) {
    try {
      let set_password = await adminService.setPassword(req, res);
      if (set_password) {
        //response of set password
        res.status(status.SUCCESS).send({
          data: [],
          message: message.setPassword,
          status: status.SUCCESS
        });
      } else {
        res.status(status.SUCCESS).send({
          data: [],
          message: message.createdPassword,
          status: status.SERVER_ERROR
        });
      }
    } catch (error) {
      console.log("setPassword -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },

  
};
