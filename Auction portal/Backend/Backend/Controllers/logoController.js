/*
 * Summary:     userController file for handling all requests and response of user  - CMS
 * Author:      Openxcell(empCode-473)
 */

/*Messages,status code and services require*/
const status = require("../Configs/statusCode").status;
const message = require("../Configs/cmsMessage").cmsMessage;
const userService = require("../Services/userService");
const logoService=require("../Services/logoService");

module.exports = {



    // Add logo details//
  async addlogo(req, res) {
    try {
      //response on add user
      let view= await logoService.addlogos(req, res);
      if (view) {
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



  async editlogo(req, res) {
    try {
      //response on add user
      let view= await logoService.editlogodetails(req, res);
      if (view) {
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




  async editlogobyid(req, res) {
    try {
      //response on add user
      let vi= await logoService.editLogobyid(req, res);
      if (vi) {
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








  async getlogo(req, res) {
    try {
      //response on add user
      let viewl= await logoService.getLogo(req, res);
      if (viewl) {
        res.send("Success");
      }
    }
     catch (error) {
      //response on internal server error
       console.log(error);
    }
  },




 // View all logo details//
  async viewlogo(req, res) {
    try {
      //response on add user
      let view= await logoService.viewalllogo(req, res);
      if (view) {
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




  async deletelogo(req, res) {
    try {
      //response on add user
      let deletelogo= await logoService.deletelogobyid(req, res);
      if (deletelogo) {
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


   
  async addtable(req, res) {
    try {
      //response on add user
      let add= await logoService.addtables(req, res);
      if (add) {
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






  async addtab(req, res) {
    try {
      //response on add user
      let add= await logoService.addtabs(req, res);
      if (add) {
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
