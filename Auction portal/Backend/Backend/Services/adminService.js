/*
 * Summary:     adminService file for handling all Admin - CMS related actions.
 * Author:      Openxcell(empCode-473)
 */

/**require NPM-modules,models and constants for configuration */
//const admin = require("../Database/models").tbl_admin;
//const adminToken = require("../Database/models").tbl_admin_token;
const UUID = require("uuidv4");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const constant1 = require("../Configs/constant").JWTOBJCMS;
const constant = require("../Configs/constant");
const generateOtp = require("../Helpers/general.helper").generateOtp;
const Bcryptjs = require("bcryptjs"); /* For encryption and decryption */
const generatedSalt = Bcryptjs.genSaltSync(10);
const Mail = require("../Helpers/sendmail");
const JwtToken = require("jsonwebtoken"); /*For generate JWT-Token*/
const bcrypt = require('bcrypt');
const saltRounds = 10;
const imageupload = require("../Middleware/multer_aws_upload");
const imageDelete = require("../Middleware/multer_aws_delete");
const mysql= require("mysql");
var connection_more =require('./../config/config');
var connection = mysql.createConnection(connection_more.test);

module.exports = {



  //add Admin //
  async addadmin(req, res) {

    try{
      let EmailID = req.body.EmailID;
      let Password = req.body.Password;
      const encryptedPassword = await bcrypt.hash(Password, saltRounds);
      //let id=req.body.AdminID;
      let Role=req.body.Role;
      console.log(req.body);

      var sql =  "INSERT INTO `admin`(`Emailid`,`Password`,`Role`) VALUES ('" + EmailID + "','" + encryptedPassword + "','" + Role + "')";
           
          
      connection.query(sql, function(error, results) {
        if (error) {

          res.send({
             "code":400,
              "failed":{'error':error, 'con':connection_more.test}
            })
           }
  
           else {
            return res.json({
                
              message: "admin successfully added",
              "status": true,
              "data": [],
              "errors": []
            
            });
           }
      }); 



      //return res.send("added");

    }
    catch(err){
      console.log("error");
    }
},








  // Admin Login //

  async loginadmin(req, res) {

         try{

          let EmailID = req.body.EmailID;
          let Password = req.body.Password;
          let id=req.body.AdminID;
          //let Role=req.body.Role;
          console.log(req.body);

          if (EmailID) {
       
            connection.query('SELECT * FROM admin WHERE EmailID = ?', [EmailID], function(error, results, fields) {
            
              if (error) throw error;
           
            if(results.length>0){
              
            bcrypt.compare(Password, results[0].Password, function(err, isMatch) {
              if (err) {
                throw err
              } else if (!isMatch ) {
                console.log("Password doesn't match!");
                 res.json({ 
                  message: "invalid credentials!",
                  "status": false,
                  "data": [],
                  "errors": []   
                 });
                res.end();
              } else {
                
               
                 
                 
                const token = JwtToken.sign({ id : results[0].AdminID}, "jsonwebtokenfordemotestadmin");
                 res
                  .cookie("access_tokenn", token, {
                    httpOnly: true,
                    
                  })
                  .status(200)
                  .json({ 
                   
                    message: "Login successfully" ,
                    "status": true,
                    "data": {
                             "accessTokenn": token,
                             "admin_info":  {
                               AdminID : results[0].AdminID
                             }  
                                           
                           },
                   "errors": []
                  
                  });
                  }
            })
        }
            
           
               else {
    
                   res.json({ 
                  message: "invalid credentials!",
                  "status": false,
                  "data": [],
                  "errors": []   
                 });
                
                }			
              });
            }
           else {
                  
    
                  res.json({ 
                    message: "Please enter all details",
                    "status": false,
                    "data": [],
                    "errors": []   
                   });
                  res.end();
                }
    
        
           
         }

         catch(err){
           console.log("err")
         }
   

    
  
        },






        // Admin Logout //

        async logoutadmin(req, res) {

          res.clearCookie("access_tokenn").status(200).json({
     
                 message: "Successfully logged out",
                 "status": true,
                 "data": [],
                 "errors": []  
         
          });
      },


























  
};
