/*
 * Summary:     newsService file for handling all Page - CMS related actions.
 * Author:      Openxcell(empCode-473)
 */

/**require NPM-modules,models and constants for configuration */
let pageContent = require("../Database/models").tbl_page;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const constant = require("../Configs/constant");
var connection_more =require('./../config/config');
var mysql= require('mysql');
const { CloudSearch } = require("aws-sdk");
//const { values } = require("sequelize/types/lib/operators");
var connection = mysql.createConnection(connection_more.test);

module.exports = {
  /* List StaticContent*/
 

  async uploadhtmlCSS(req, res) {

    try{
      var data=req.body;
      if(req.files['html']){
        data["html"]=req.files["html"][0].filename;
        
      }
      if(req.files['css']){
        data["css"]=req.files["css"][0].filename;
      }

       console.log(data);
       console.log(data["html"]);
       console.log(data["css"]);
       const status="NULL";

       var sql = "INSERT INTO `page`(`html`,`css`,`status`) VALUES ('" + data['html'] + "','" + data['css'] + "','" + status + "')";
 
       connection.query(sql, function(error, result) {
         
        if (error) {
          return res.send({
            "code":400,
            "failed":{'error':error, 'con':connection_more.test}
          })
        } else {
           return res.json({ 
             message: "HTML & CSS files uploaded successfully",
             "status": true,
             "data": [],
             "errors": []
            
            });
          }
      });
    }
    catch(err){
      console.log(err);
    }
},
  














  /* Update Static Content*/
  async updateStaticContent(req, res) {
    console.log("updateStaticContent -> req", req.body);
    return await pageContent.update(
      {
        pageName: req.body.pageName && req.body.pageName,
        pageUrl: req.body.pageUrl && req.body.pageUrl,
        text: req.body.text && req.body.text,
      },
      {
        where: {
          pageId: req.body.pageId,
        },
      }
    );
  },
};
