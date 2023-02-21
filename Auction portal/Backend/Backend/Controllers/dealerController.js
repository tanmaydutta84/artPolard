/*
 * Summary:     categoryBannerController file for handling all requests and response of CATEGORY BANNER  - CMS
 * Author:      Openxcell(empCode-473)
 */

/*Messages,status code and services require*/
const status = require("../Configs/statusCode").status;

const dealerService=require("../Services/dealerService");

module.exports = {

  


  /* Add Dealer for page */
  
  async addDealer(req, res) {
    try {
      //response of add category And Sub-category
      let add_dealer = await dealerService.adddealer(
        req,
        res
      );
      if (add_dealer) {
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








  async updatelogo(req, res) {
    try {
      
      let uplogo = await dealerService.updateLogo( req, res);
      if (uplogo) {
        res.send("Success");
      }
    }
     catch (error) {

      console.log(error)
 
    }
  },


  /* view Dealer */

  async viewDealer(req, res) {
    try {
      //response of add category And Sub-category
      let view_dealer = await dealerService.viewdealer(
        req,
        res
      );
      if (view_dealer) {
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



  /* view Dealer by id */

  async viewDealerbyid(req, res) {
    try {
      //response of add category And Sub-category
      let view_dealerbyid = await dealerService.viewdealerbyid(
        req,
        res
      );
      if (view_dealerbyid) {
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




  /* view customer service provider */

  async viewCustomer(req, res) {
    try {
      //response of add category And Sub-category
      let viewCustomerr = await dealerService.viewcustomer(
        req,
        res
      );
      if (viewCustomerr) {
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















  // Update Dealer  //
  async updateDealer(req, res) {
    try {
      //response of add category And Sub-category
      let update_dealer = await dealerService.updatedealer(
        req,
        res
      );
      if (update_dealer) {
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



  // Delete Dealer  //
  async deleteDealerbyid(req, res) {
    try {
      //response of add category And Sub-category
      let delete_dealerr = await dealerService.deletedealerbyid(
        req,
        res
      );
      if (delete_dealerr) {
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
