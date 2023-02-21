/**require NPM-modules for configuration */
var express = require("express");
var router = express.Router();
/* require for Authentication */
const authentication = require("../../Middleware/adminAuthentication")
  .authentication;

const globalSettingController = require("../../Controllers/globalSettingController");

/* routes of global settings*/
router.post(
  "/add",
  authentication,
  globalSettingController.addGlobalSettings
); /*Add Global Settings API*/

router.get(
  "/view",
  authentication,
  globalSettingController.viewGlobalSettings
); /*View Global Settings API*/

router.post(
  "/update",
  authentication,
  globalSettingController.updateGlobalSettings
); /*Update Partner API*/

module.exports = router;
