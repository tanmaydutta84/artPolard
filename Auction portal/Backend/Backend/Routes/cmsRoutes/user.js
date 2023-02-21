/*
 * Summary:     user.js file handles all routes, request and response for User - (CMS related actions).
 * Author:      Openxcell(empCode-473)
 */

/**require NPM-modules for configuration */
var express = require("express");
var router = express.Router();

/* require for Authentication */
const authentication = require("../../Middleware/adminAuthentication")
  .authentication;
const multerMiddleware = require("../../Middleware/multer");
//const userauth=require("../../Middleware/userauth");
const multerMiddlewaree = require("../../Middleware/multer_previousdata");
/* require for Controller */
const userController = require("../../Controllers/userController");
const authorization=require("../../Middleware/userauth").authorization;



const multer_adddealer = require("../../Middleware/multer_adddealer");


const dealerController = require("../../Controllers/dealerController");

/* routes of user*/


router.post("/registration",userController.addUser);

router.post("/login",userController.loginUser);

router.get("/logout",authorization,userController.logoutUser);

router.put("/previousdatabyid/:id",multerMiddlewaree.singleUpload,userController.uploadpreviousdata);

router.put("/updatestatusbyid/:id",userController.updatestatus);

router.post("/forgotpassword",userController.forgotPass);

router.put("/changepassword",authorization,userController.changePass);







router.post(
  "/adduser",
  multer_adddealer.singleUpload,
  dealerController.addDealer
);

router.get(
    "/viewusers",
    dealerController.viewDealer
  );


  router.get(
    "/viewuserbyid/:id",
    dealerController.viewDealerbyid
  );


  router.get(
    "/viewcustomerserviceusers",
    dealerController.viewCustomer
  );

  router.put(
    "/updatelogobyId/:id", multer_adddealer.singleUpload,dealerController.updatelogo
  );

  router.put(
    "/updateuser",
    dealerController.updateDealer
  );


  router.delete(
    "/deleteuserbyid/:id",
   
    dealerController.deleteDealerbyid
  );









router.delete(
  "/delete",
  authentication,
  userController.deleteUser
); /*DELETE User API*/

router.get(
  "/view/:userId",
  authentication,
  userController.getUserById
); /*View User API*/

router.put(
  "/update",
  authentication,
  multerMiddleware.singleUpload,
  userController.updateUser
); /*Update Partner API*/

router.post("/list", authentication, userController.listUser); /*List User API*/

router.put(
  "/updateStatus",
  authentication,
  userController.updateUserStatus
); /*Update Status Partner API*/

router.get(
  "/countryDropdown",
  authentication,
  userController.countryDropdown
); /*Dropdown Country API*/

router.post(
  "/stateDropdown",
  authentication,
  userController.stateDropdown
); /*Dropdown State API*/

router.post(
  "/cityDropdown",
  authentication,
  userController.cityDropdown
); /*Dropdown City API*/

router.get(
  "/referredByDropdown",
  authentication,
  userController.referredByDropdown
); /*Dropdown ReferredBy API*/

router.get(
  "/subscriptionDropdown",
  authentication,
  userController.subscriptionDropdown
); /*Dropdown Subscription API*/

module.exports = router;
