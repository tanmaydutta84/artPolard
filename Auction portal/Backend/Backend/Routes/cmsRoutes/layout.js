/*
 * Summary:     layout.js file handles all routes, request and response for layout - (CMS related actions).
 * Author:      Openxcell(empCode-473)
 */

/**require NPM-modules for configuration */
var express = require("express");
var router = express.Router();

/* require for Authentication */
const authentication = require("../../Middleware/adminAuthentication")
  .authentication;
//const multerMiddleware = require("../../middleware/multer");

/* require for Controller */
const layoutController = require("../../Controllers/layoutController");

/* routes of layout*/
router.post("/add", layoutController.addLayout); /*Add Layout API*/

router.delete("/delete", layoutController.deleteLayout); /*DELETE Layout API*/

router.get(
    "/dropdown",
    authentication,
    layoutController.layoutDropdown
  ); /*Dropdown Layout API*/

module.exports = router;
