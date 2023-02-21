/*
 * Summary:     user.js file handles all routes, request and response for User - (CMS related actions).
 * Author:      Openxcell(empCode-473)
 */

/**require NPM-modules for configuration */
var express = require("express");
var router = express.Router();

const authorization=require("../../Middleware/customerauth").authorization;

//const userauth=require("../../Middleware/userauth");

/* require for Controller */

const customerserviceController = require("../../Controllers/customerserviceController");


/* routes of user*/


router.post("/registration",customerserviceController.adduser);

router.post("/login",customerserviceController.login);

router.get("/logout",authorization,customerserviceController.logoutUser);

//router.get("/logout",customerserviceController.logout);

router.get("/listofcustomerservice",customerserviceController.viewuser);

router.put("/upadtecustomerservice",customerserviceController.edituser);

router.put("/statusupdatebyid/:id",customerserviceController.statusupdate);

router.delete("/deletecustomerservicebyid/:id",customerserviceController.deleteuser);




//router.post("/login",userController.loginUser);

//router.get("/logout",authorization,userController.logoutUser);

//router.post("/forgotpassword",userController.forgotPass);

//router.put("/changepassword",authorization,userController.changePass);






module.exports = router;
