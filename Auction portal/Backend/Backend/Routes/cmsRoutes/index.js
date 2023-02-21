/*
 * Summary:     index.js file for handling all modules request and response - (CMS related actions).
 * Author:      Openxcell(empCode-473)
 */

/**require NPM-modules and files for configuration */
var express = require("express");
var router = express.Router();

var categoryRouter = require("../cmsRoutes/category");
var partnerRouter = require("../cmsRoutes/partner");
var layoutRouter = require("../cmsRoutes/layout");
var adminRouter = require("../cmsRoutes/admin");
var userRouter = require("../cmsRoutes/user");
var itemRouter = require("../cmsRoutes/item");
var newsRouter = require("../cmsRoutes/news");
var dealerRouter=require("../cmsRoutes/dealerroute");
const sentm=require("../cmsRoutes/sentmail");
var logoRouter=require("../cmsRoutes/logoroute");

var categoryBannerRouter = require("../cmsRoutes/categoryBanner");
var globalSettingRouter = require("../cmsRoutes/globalSetting")
var pageRouter = require("../cmsRoutes/page");
var customerserviceRouter = require("../cmsRoutes/customer_service");
var inventoryRouter=require("../cmsRoutes/inventoryroute");


/* All routes for api call*/
router.use("/category", categoryRouter);
router.use("/partner", partnerRouter);
router.use("/layout", layoutRouter);
router.use("/admin", adminRouter);
//router.use("/user", userRouter);

router.use("/add-admin",adminRouter);
router.use("/admin-login",adminRouter);
router.use("/admin-logout",adminRouter);


router.use("/user", userRouter);
router.use("/user-registration", userRouter);
router.use("/user-login", userRouter);
router.use("/user-logout", userRouter);
router.use("/userchangepass",userRouter);

router.use("/customer_service", customerserviceRouter);



router.use('/inventory',inventoryRouter);

//router.use("/user", dealerRouter);

router.use("/addlogo",logoRouter);
router.use("/updatelogo",logoRouter);
router.use("/viewlogo",logoRouter);
router.use("/deletelogo",logoRouter);
router.use("/update",logoRouter);


router.use("/adddemo",logoRouter);


router.use("/category_banner", categoryBannerRouter);


router.use("/product", itemRouter);

router.use("/news", newsRouter);
router.use("/global_setting", globalSettingRouter);
router.use("/page", pageRouter);
router.use("/dealer", dealerRouter);
router.use("/sentm",sentm);


module.exports = router;
