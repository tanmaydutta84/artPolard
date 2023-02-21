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
const authorization=require("../../Middleware/userauth").authorization;



const multer_adddealer = require("../../Middleware/multer_adddealer");


const dealerController = require("../../Controllers/dealerController");
const inventoryController=require("../../Controllers/inventoryController");
const multerxml = require("../../Middleware/multerxml");

/* routes of user*/


router.post("/addpro",inventoryController.addpro);

router.post("/inventorydata",multerxml.singleUpload,inventoryController.getdata);

router.get("/listofinventory",inventoryController.listdatabyid);

router.get("/listofinventorybyId/:id",inventoryController.listdatabyidd);

router.post("/viewinventorybyId",inventoryController.viewdatabyid);

router.post("/addcategories",inventoryController.addsubcategoryitem);

router.get("/viewcategories",inventoryController.viewcat);

router.get("/viewcategoriesbycount",inventoryController.viewcatcount);




router.get("/viewpublishedinventory",inventoryController.viewpublish);

router.get("/viewsoldinventory",inventoryController.viewsold);

router.get("/getcategorybyId/:id",inventoryController.getcat);

// Update details Route

router.put("/updateinventorybyId/:id",inventoryController.updatedatabyid);

router.put("/updatepublishstatusbyId/:id",inventoryController.updatepublish);

router.post("/updatecategorybyId/:id",inventoryController.updatecategory);

router.delete("/deleteinventorybyId/:id",inventoryController.deletedatabyid);

router.delete("/deletecategorybyId/:id",inventoryController.deletecategory);



router.post("/deleteitembyId/:id",inventoryController.deleteitembyid);

router.post("/filterbyyear",inventoryController.filteryear);

router.post("/filterbymodel",inventoryController.filtermodel);

router.post("/filterbylocation",inventoryController.filterlocation);

router.post("/filterbyprice",inventoryController.filterprice);

router.post("/filterbydate",inventoryController.filterdate);

router.get("/filtercategorybyId/:id",inventoryController.filtercategory);


// sorting by dropdown list//

router.post("/sortingitem",inventoryController.sortdate);








module.exports = router;
