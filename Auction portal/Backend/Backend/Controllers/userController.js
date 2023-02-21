/*
 * Summary:     userController file for handling all requests and response of user  - CMS
 * Author:      Openxcell(empCode-473)
 */

/*Messages,status code and services require*/
const status = require("../Configs/statusCode").status;
const message = require("../Configs/cmsMessage").cmsMessage;
const userService = require("../Services/userService");

module.exports = {

 // register user//
  async addUser(req, res) {
    try {
      //response on add user
      let addUser = await userService.registeruser(req, res);
      if (addUser) {
        res.send("Success");
      }
    }
     catch (error) {
      //response on internal server error
      console.log(error);
    }
  },

  
  //login user//
  async loginUser(req, res) {
    try {
      //response on add user
      let logUser = await userService.loginuser(req, res);
      if (logUser) {
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



  /* logout user*/
  
  async logoutUser(req, res) {
    try {
     
      let loguser = await userService.logoutuser(req,res);
      if (loguser) {
        res.status(status.SUCCESS).send({
          data: [],
          message: message.userDeleted,
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






  



  async updatestatus(req, res) {
    try {
     
      let upstatus = await userService.updateStatus(req,res);
      if (upstatus ) {
        res.status(status.SUCCESS).send({
          data: [],
          message: message.userDeleted,
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











  async uploadpreviousdata(req, res) {
    try {
     
      let uploadd = await userService.uploadpreviousData(req,res);
      if (uploadd) {
        res.status(status.SUCCESS).send({
          data: [],
          message: message.userDeleted,
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





  // forgot password //
  async forgotPass(req, res) {
    try {
     
      let fpass = await userService.forgotpass(req,res);
      if (fpass) {
        res.status(status.SUCCESS).send({
          data: [],
          message: message.userDeleted,
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



  // Change password//
  async changePass(req, res) {
    try {
     
      let changepass = await userService.changepassword(req,res);
      if (changepass) {
        res.status(status.SUCCESS).send({
          data: [],
          message: message.userDeleted,
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











  /* Delete User */
  async deleteUser(req, res) {
    try {
      //response on delete user
      let deleteUser = await userService.deleteUser(req, res);
      if (deleteUser) {
        res.status(status.SUCCESS).send({
          data: [],
          message: message.userDeleted,
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

  /* View User */
  async getUserById(req, res) {
    try {
      let viewUser = await userService.getUserById(req, res);
      if (viewUser) {
        //respnse of view user
        res.status(status.SUCCESS).send({
          data: viewUser,
          message: message.success,
          status: status.SUCCESS
        });
      } else {
        res.status(status.SUCCESS).send({
          data: [],
          message: message.noRecordFound,
          status: status.SERVER_ERROR
        });
      }
    } catch (error) {
      console.log("TCL: getUserById -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },

  /* Update User*/
  async updateUser(req, res) {
    try {
      await userService.updateUser(req, res);
      //response of update user
      res.status(status.SUCCESS).send({
        data: [],
        message: message.userUpdated,
        status: status.SUCCESS
      });
    } catch (error) {
      console.log("updateUser -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        error:error,
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },

  /* List User */
  async listUser(req, res) {
    try {
      let userList = await userService.listUser(req, res);

      if (userList) {
        //response of list partner
        res.status(status.SUCCESS).send({
          data: userList,
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
      console.log("TCL: listUser -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },

  /* Update status of User */
  async updateUserStatus(req, res) {
    try {
      await userService.updateUserStatus(req, res);
      //response on status change
      res.status(status.SUCCESS).send({
        data: [],
        message: message.userStatusUpdated,
        status: status.SUCCESS
      });
    } catch (error) {
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },

  /* Country Dropdown */
  async countryDropdown(req, res) {
    try {
      let countryList = await userService.countryDropdown(req, res);

      if (countryList) {
        //respnse of Dropdown of country
        res.status(status.SUCCESS).send({
          data: countryList,
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
      console.log("TCL: dropdownCountry -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },

  /* State Dropdown */
  async stateDropdown(req, res) {
    try {
      let stateList = await userService.stateDropdown(req, res);

      if (stateList) {
        //respnse of Dropdown of country
        res.status(status.SUCCESS).send({
          data: stateList,
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
      console.log("TCL: dropdownState -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },

  /* City Dropdown */
  async cityDropdown(req, res) {
    try {
      let cityList = await userService.cityDropdown(req, res);

      if (cityList) {
        //respnse of Dropdown of country
        res.status(status.SUCCESS).send({
          data: cityList,
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
      console.log("TCL: dropdownCity -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },

  /* ReferredBy Dropdown */
  async referredByDropdown(req, res) {
    try {
      let referredByList = await userService.referredByDropdown(req, res);

      if (referredByList) {
        //respnse of Dropdown of country
        res.status(status.SUCCESS).send({
          data: referredByList,
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
      console.log("TCL: referredByDropdown -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },

  /* Subscription Dropdown */
  async subscriptionDropdown(req, res) {
    try {
      let subscriptionList = await userService.subscriptionDropdown(req, res);

      if (subscriptionList) {
        //respnse of Dropdown of country
        res.status(status.SUCCESS).send({
          data: subscriptionList,
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
      console.log("TCL: subscriptionDropdown -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  }
};
