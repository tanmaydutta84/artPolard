/*
 * Summary:     userController file for handling all requests and response of user  - CMS
 * Author:      Openxcell(empCode-473)
 */

/*Messages,status code and services require*/
const status = require("../Configs/statusCode").status;
const message = require("../Configs/cmsMessage").cmsMessage;
const customerService = require("../Services/customerService");


module.exports = {

 // register user//
  async adduser(req, res) {
    try {
      //response on add user
      let addUser = await customerService.registercustomer(req, res);
      if (addUser) {
        res.send("Success");
      }
    }
     catch (error) {
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },







  async login(req, res) {
    try {
      //response on login user
      let login = await customerService.logincustomer(req, res);
      if(login){
        console.log("success");
      }
    }
     catch (error) {
      //response on internal server error
      console.log(error);
    }
  },







  async logoutUser(req, res) {
    try {
      //response on logout user
      let logout = await customerService.logoutcustomer(req, res);
      if (logout) {
        res.send("Success");
      }
    }
     catch (error) {
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },







  async viewuser(req, res) {
    try {
      //response on view user
      let vUser = await customerService.viewallcustomer(req, res);
      if (vUser) {
        res.send("Success");
      }
    }
     catch (error) {
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },

  







  async edituser(req, res) {
    try {
      //response on update user
      let edtUser = await customerService.editallcustomer(req, res);
      if (edtUser) {
        res.send("Success");
      }
    }
     catch (error) {
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },









  
  async statusupdate(req, res) {
    try {
      //response on status update user
      let statusup = await customerService.statusUpdate(req, res);
      if (statusup) {
        res.send("Success");
      }
    }
     catch (error) {
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },







  

  
  async deleteuser(req, res) {
    try {
      //response on delete user
      let delUser = await customerService.delcustomerbyid(req, res);
      if (delUser) {
        res.send("Success");
      }
    }
     catch (error) {
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },







  
  
};
