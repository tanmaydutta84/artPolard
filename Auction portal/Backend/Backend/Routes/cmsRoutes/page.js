/*
 * Summary:     page.js file handles all routes, request and response for Page - (CMS related actions).
 * Author:      Openxcell(empCode-473)
 */

/**require NPM-modules for configuration */
var express = require("express");
var router = express.Router();

/* require for Authentication */
const authentication = require("../../Middleware/adminAuthentication")
  .authentication;

  const multer_page=require("../../Middleware/multer_page");
/* require for Controller */
const pageController = require("../../Controllers/pageController"); /*Generate Password API*/



router.post(
  "/uploadtemplate",multer_page.singleUpload,pageController.uploadhtmlcss

); 




module.exports = router;
