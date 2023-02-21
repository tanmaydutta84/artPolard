/*
 * Summary:     item.js file handles all routes, request and response for Item - (CMS related actions).
 * Author:      Openxcell(empCode-473)
 */

/**require NPM-modules for configuration */
var express = require("express");
var router = express.Router();

/* require for Authentication */
const authentication = require("../../Middleware/adminAuthentication")
  .authentication;
const multerMiddleware = require("../../Middleware/multer");

const csvMiddleware = require("../../Middleware/multer_csv");

/* require for Controller */
const itemController = require("../../Controllers/itemController");

const multer_product_upload = require("../../Middleware/multer_product_upload");

/* routes of item*/






router.post(
  "/addproduct",multer_product_upload.singleUpload.array('image',25),itemController.addproduct ); /*Add Item API*/


router.get(
  "/viewproducts",itemController.viewproduct); 


router.get(
  "/viewproductbyid/:id",itemController.viewproductbyid);
  
  
 router.put(
    "/updateproductbyid/:id",itemController.updateproductbyid);



router.delete(
  "/deleteproductbyid/:id",itemController.deleteproduct); 



router.delete(
  "/delete",
  authentication,
  itemController.deleteItem
); /*DELETE Item API*/

router.get(
  "/view/:itemId",
  authentication,
  itemController.getItemById
); /*View Item API*/

router.put(
  "/update",
  authentication,
  multerMiddleware.singleUpload,
  itemController.updateItem
); /*Update Item API*/

router.post("/list", authentication, itemController.listItem); /*List Item API*/



router.post("/uploadcsv",csvMiddleware.csvUploaded, itemController.csvupload);

router.put(
  "/updateStatus",
  authentication,
  itemController.updateItemStatus
); /*Update Status Item API*/
module.exports = router;
