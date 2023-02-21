/*
 * Summary:     categoryBanner.js file handles all routes, request and response for Category - (CMS related actions).
 * Author:      Openxcell(empCode-473)
 */

/**require NPM-modules for configuration */
var express = require("express");
var router = express.Router();

/* require for Authentication */
const authentication = require("../../Middleware/adminAuthentication")
  .authentication;
const multerMiddleware = require("../../Middleware/multer");
const multerimage=require("../../Middleware/multer_upload");

/* require for Controller */
const categoryBannerController = require("../../Controllers/categoryBannerController");



/* routes to add page templates */
router.post(
  "/addtemplate",
   multerimage.singleUpload,
  categoryBannerController.addtemplatedetails
);

router.get(
  "/gettemplatebyid/:id",
  categoryBannerController.gettemplate
);


router.get(
  "/viewtemplate",
  categoryBannerController.viewtemplate
);

router.put(
  "/edittemplatebyid/:id",
   multerimage.singleUpload,
  categoryBannerController.edittemplatedetails
);





/* routes of category banner*/
router.post(
  "/add/:categoryId",
  authentication,
  multerMiddleware.multiProfilePic,
  categoryBannerController.addCategoryBanner
); /*Add Category Banner API*/

router.delete(
  "/delete/:categoryId",
  authentication,
  categoryBannerController.deleteCategoryBanner
); /*DELETE Category Banner API*/

router.get(
  "/get-category",
  authentication,
  categoryBannerController.getCategoryList
); /*GET Category List API*/

router.put(
  "/updateStatus",
  authentication,
  categoryBannerController.updateBannerStatus
); /*Update Category Banner Status API*/

router.get(
  "/view/:categoryId",
  authentication,
  categoryBannerController.viewBanner
); /* View category banner API */

router.put(
  "/update/:categoryId",
  authentication,
  multerMiddleware.multiProfilePic,
  categoryBannerController.updateBanner
); /*Update Category Banner API*/

router.post(
  "/list",
  authentication,
  categoryBannerController.listBanner
); /*List Category Banner API*/

module.exports = router;
