/*
 * Summary:     news.js file handles all routes, request and response for News - (CMS related actions).
 * Author:      Openxcell(empCode-470)
 */

/**require NPM-modules for configuration */
var express = require("express");
var router = express.Router();

/* require for Authentication */
const authentication = require("../../Middleware/adminAuthentication")
  .authentication;
const multerMiddleware = require("../../Middleware/multer");

/* require for Controller */
const newsController = require("../../Controllers/newsController");

router.post(
  "/add",
  authentication,
  multerMiddleware.singleUpload,
  newsController.addNews
); /*Add News API*/

router.delete(
  "/delete",
  authentication,
  newsController.deleteNews
); /*DELETE News API*/

router.get(
  "/view/:newsId",
  authentication,
  newsController.getNewsById
); /*View News API*/

router.put(
  "/update",
  authentication,
  multerMiddleware.singleUpload,
  newsController.updateNews
); /*Update News API*/

router.post("/list", authentication, newsController.listNews); /*List News API*/

router.put(
  "/updateStatus",
  authentication,
  newsController.updateNewsStatus
); /*Update Status News API*/

module.exports = router;
