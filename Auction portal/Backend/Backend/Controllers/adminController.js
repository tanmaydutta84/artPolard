/*
 * Summary:     adminController file for handling all requests and response of Admin  - CMS
 * Author:      Openxcell(empCode-473)
 */

/*Messages,status code and services require*/
//const status = require("../Configs/statusCode").status;
//const message = require("../Configs/cmsMessage").cmsMessage;
const adminService = require("../Services/adminService");

module.exports = {

  
  /* Add Admin */
  async addAdmin(req, res) {
    try {
      let addAdmin = await adminService.addadmin(req, res);
      if (addAdmin) {
    
        console.log("done");
      }
    
    } catch (error) {
     
        console.log(error);
    }
  },




   // admin Login //
  async loginAdmin(req, res) {
    try {
      let logAdmin = await adminService.loginadmin(req, res);
      if (logAdmin) {
        
        console.log("done");
      }
    } catch (error) {
      
        console.log(error);
    }
  },





  // Admin logout //
  async logoutAdmin(req, res) {
    try {
      let logouttAdmin = await adminService.logoutadmin(req, res);
      if (logouttAdmin) {
      
        console.log("done");
      }
    } catch (error) {
      
        console.log(error);
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

 
  /* Delete Admin */
  async deleteAdmin(req, res) {
    try {
      //response on delete admin
      let delete_admin = await adminService.deleteAdmin(req, res);
      if (delete_admin) {
        res.status(status.SUCCESS).send({
          data: [],
          message: message.adminDeleted,
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

  /* View Admin */
  async getAdminById(req, res) {
    try {
      let view_admin = await adminService.getAdminById(req, res);
      if (view_admin) {
        //respnse of view admin
        res.status(status.SUCCESS).send({
          data: view_admin,
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
      console.log("TCL: getAdminById -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },

  /* Update Admin*/
  async updateAdmin(req, res) {
    try {
      let update_admin= await adminService.updateAdmin(req, res);
      //response of update admin
      res.status(status.SUCCESS).send({
        data: update_admin,
        message: message.adminUpdated,
        status: status.SUCCESS
      });
    } catch (error) {
      console.log("updateAdmin -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },

  /* List Admin */
  async listAdmin(req, res) {
    try {
      let admin_List = await adminService.listAdmin(req, res);

      if (admin_List) {
        //response of list admin
        res.status(status.SUCCESS).send({
          data: admin_List,
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
      console.log("TCL: listPartner -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },

  /* Logout */
  async logOut(req, res) {
    try {
      await adminService.logOut(req, res);
      res.status(status.SUCCESS).send({
        //response on successful details update
        data: [],
        status: status.SUCCESS,
        message: message.logoutSuccess
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

  /* change password */
  async changePassword(req, res) {
    try {
      let changePassword = await adminService.changePassword(
        req,
        res,
        req.tokenFound
      );
      if (changePassword) {
        res.status(status.SUCCESS).send({
          //response on successfully change password
          data: [],
          message: message.passwordChanged,
          status: status.SUCCESS
        });
      } else {
        //response on old password mis-match
        res.status(status.SUCCESS).send({
          data: [],
          message: message.incorrectoldPassword,
          status: status.SERVER_ERROR
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

  /* Forgot Password*/
  async forgotPassword(req, res) {
    try {
      let forgotPassword = await adminService.forgotPassword(req, res);
      if (forgotPassword) {
        res.status(status.SUCCESS).send({
          //response on successful mail send
          data: [],
          message: message.emailSentSuccessfully,
          status: status.SUCCESS
        });
      } else {
        res.status(status.SUCCESS).send({
          data: [],
          message: message.emailNotFound,
          status: status.SERVER_ERROR
        });
      }
    } catch (error) {
      //response on internal server error
      console.log("TCL->ForgotpasswordError" + error);
      res.status(status.SERVER_ERROR).send({
        data: [],
        error: error,
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },

  /* OTP verification*/
  async otpVerify(req, res) {
    try {
      email_verify = await adminService.otpVerify(req, res);

      if (email_verify) {
        res.status(status.SUCCESS).send({
          //response on successful OTP varification
          data: [],
          message: message.otpVerified,
          status: status.SUCCESS
        });
      } else {
        res.status(status.SUCCESS).send({
          //response on wrong OTP varification
          data: [],
          message: message.otpDidNotMatch,
          status: status.SERVER_ERROR
        });
      }
    } catch (error) {
      res.status(status.SERVER_ERROR).send({
        //response on internal server error
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },

  /* Reset password */
  async resetPassword(req, res) {
    try {
      await adminService.resetPassword(req, res);

      res.status(status.SUCCESS).send({
        //response on successfull details update
        data: [],
        message: message.passwordChanged,
        status: status.SUCCESS
      });
    } catch (error) {
      res.status(status.SERVER_ERROR).send({
        //response on internal server error
        data: [],
        error: error,
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },

  /* Update status of Admin */
  async updateAdminStatus(req, res) {
    try {
      await adminService.updateAdminStatus(req, res);
      //response on status change
      res.status(status.SUCCESS).send({
        data: [],
        message: message.adminStatusUpdated,
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
  }
};
