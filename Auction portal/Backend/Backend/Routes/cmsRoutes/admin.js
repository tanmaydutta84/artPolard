/*
 * Summary:     admin.js file handles all routes, request and response for Admin - (CMS related actions).
 * Author:      Openxcell(empCode-473)
 */

/**require NPM-modules for configuration */
var express = require("express");
var router = express.Router();

/* require for Authentication */
const authentication = require("../../Middleware/adminAuthentication")
  .authentication;

const adminauthorization = require("../../Middleware/adminauth")
  .adminauthorization;  
const multerMiddleware = require("../../Middleware/multer");

/* require for Controller */
const adminController = require("../../Controllers/adminController"); /*Generate Password API*/

//router.post("/login", adminController.signIn); /*Login API */

router.post(
  "/add",
  adminController.addAdmin
); /*Add Admin API*/


router.post("/login",adminController.loginAdmin);

router.get("/logout",adminauthorization,adminController.logoutAdmin);



router.put(
  "/setPassword",
  adminController.setPassword
); /*Set Password API*/

router.delete(
  "/delete",
  authentication,
  adminController.deleteAdmin
); /*DELETE Admin API*/

router.get(
  "/view/:adminId",
  authentication,
  adminController.getAdminById
); /*View Admin API*/

router.put(
  "/update",
  authentication,
  multerMiddleware.singleUpload,
  adminController.updateAdmin
); /*Update Admin API*/

router.post(
  "/list",
  authentication,
  adminController.listAdmin
); /*List Admin API*/

router.delete(
  "/logout",
  authentication,
  adminController.logOut
); /* Logout API*/

router.put(
  "/changePassword",
  authentication,
  adminController.changePassword
); /* Change Password API*/

router.post("/otpVerify", adminController.otpVerify); /* Verify OTP API*/

router.put(
  "/resetPassword",
  adminController.resetPassword
); /* forgotpassword API*/

router.post(
  "/forgotPassword",
  adminController.forgotPassword
); /* forgotpassword API*/

router.put(
  "/updateStatus",
  authentication,
  adminController.updateAdminStatus
); /*Update Status Admin API*/

module.exports = router;
