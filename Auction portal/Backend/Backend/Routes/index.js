var express = require('express');
var router = express.Router();
var cmsApiRouter = require("./cmsRoutes/index");
const cookieParser = require("cookie-parser");
var cors = require('cors');
var bodyParser = require('body-parser');
var fs=require("fs");
//var xml2js=require("xml2js");
//const csv = require('fast-csv')


/* GET home page. */
//console.log("welcome");





module.exports = app => {
  app.use(cors());
  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({extended: true}));

  app.use('/uploads', express.static('uploads'));
  app.use(cookieParser());
  app.use("/api", cmsApiRouter);
 

}


