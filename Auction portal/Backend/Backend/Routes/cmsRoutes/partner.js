/*
 * Summary:     partner.js file handles all routes, request and response for Partner - (CMS related actions).
 * Author:      Openxcell(empCode-473)
 */

/**require NPM-modules for configuration */
var express = require("express");
var router = express.Router();

/* require for Authentication */
const authentication = require("../../Middleware/adminAuthentication")
  .authentication;
const multerMiddleware = require("../../Middleware/multer");

/* require for Controller */
const partnerController = require("../../Controllers/partnerController");

/* router.post('/add', upload, function(req, res, next) {
  console.log(req.file)
  res.send('Successfully uploaded ' + req.file + ' files!')
}) */

/* routes of partner*/

router.post(
  "/adddemo",
  //authentication,

  partnerController.addPartnerDemo
);

router.post(
  "/add",
  //authentication,
  multerMiddleware.singleUpload,
  partnerController.addPartner
); /*Add Partner API*/

router.delete(
  "/delete",
  authentication,
  partnerController.deletePartner
); /*DELETE Partner API*/

router.get(
  "/view/:partnerId",
  authentication,
  partnerController.getPartnerById
); /*View Partner API*/

router.put(
  "/update",
  authentication,
  multerMiddleware.singleUpload,
  partnerController.updatePartner
); /*Update Partner API*/

router.post(
  "/list",
  authentication,
  partnerController.listPartner
); /*List Partner API*/

router.put(
  "/updateStatus",
  authentication,
  partnerController.updatePartnerStatus
); /*Update Status Partner API*/

module.exports = router;
