/*
 * Summary:     category.js file handles all routes, request and response for Category - (CMS related actions).
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
const categoryController = require("../../Controllers/categoryController");

/* routes of category and sub-category*/
router.post(
  "/add",
  authentication,
  multerMiddleware.multiProfilePic,
  categoryController.addCategory
); /*Add Category API*/ 

router.delete(
  "/delete",
  authentication,
  categoryController.deleteCategory
);/*DELETE Category API*/ 

router.get(
  "/view/:categoryId",
  authentication,
  categoryController.getCategoryById
); /*View Category API*/

router.put(
  "/update",
  authentication,
  multerMiddleware.multiProfilePic,
  categoryController.updateCategory
); /*Update Category API*/

router.post(
  "/list",
  authentication,
  categoryController.listCategory
); /*List Category API*/

router.put(
  "/updateStatus",
  authentication,
  categoryController.updateCategoryStatus
); /*Update Status Category API*/

router.post(
  "/dropdown",
  authentication,
  categoryController.categoryDropdown
); /*Dropdown Category API*/

router.get(
  "/mainCategoryDropdown",
  authentication,
  categoryController.mainCategoryDropdown
); /*Dropdown Category API*/

router.get(
  "/parentCategoryDropdown",
  authentication,
  categoryController.parentCategoryDropdown
); /*Dropdown Category API*/

router.get(
  "/subCategoryDropdown",
  authentication,
  categoryController.subCategoryDropdown
); /*Dropdown Category API*/

module.exports = router;
