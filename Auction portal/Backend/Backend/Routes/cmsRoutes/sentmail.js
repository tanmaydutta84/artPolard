/*
 * Summary:     partner.js file handles all routes, request and response for Partner - (CMS related actions).
 * Author:      Openxcell(empCode-473)
 */

/**require NPM-modules for configuration */
var express = require("express");
var router = express.Router();

/* require for Controller */
const mailcontroller = require("../../Controllers/sentmailController");




router.post(
  "/sentmailtouser",
  mailcontroller.sentMail
);




module.exports = router;
