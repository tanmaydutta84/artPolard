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

/* require for Controller */
const userController = require("../../Controllers/userController");
const logoController=require("../../Controllers/logoController");

const multer_logo_upload = require("../../Middleware/multer_logo_upload");

/* routes of user*/


router.post("/register",userController.addUser);

router.post("/login",userController.loginUser);


router.post("/addlogodetails", multer_logo_upload.singleUpload,logoController.addlogo);
router.put("/editlogodetails",logoController.editlogo);
router.get("/viewalllogos",logoController.viewlogo);
router.get("/getlogobyid/:id",logoController.getlogo);
router.delete("/deletelogobyid/:id",logoController.deletelogo);
router.put("/updatelogobyid/:id",multer_logo_upload.singleUpload,logoController.editlogobyid);

router.post("/addtab",logoController.addtable);

router.post("/addd",logoController.addtab)










module.exports = router;
