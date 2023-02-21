/*
 * Summary:     partner.js file handles all routes, request and response for Partner - (CMS related actions).
 * Author:      Openxcell(empCode-473)
 */

/**require NPM-modules for configuration */
var express = require("express");
var router = express.Router();

const authentication = require("../../Middleware/adminAuthentication")
  .authentication;
const multer_adddealer = require("../../Middleware/multer_adddealer");


const dealerController = require("../../Controllers/dealerController");


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


  router.put(
    "/updateuser",
    dealerController.updateDealer
  );


  router.delete(
    "/deleteuserbyid/:id",
   
    dealerController.deleteDealerbyid
  );


module.exports = router;
