/*
 * Summary:     partnerService file for handling all Partner - CMS related actions.
 * Author:      Openxcell(empCode-473)
 */

/**require NPM-modules,models and constants for configuration */
const user = require("../Database/models").tbl_user;
const users=require("../Database/models").users;
const userDetail = require("../Database/models").tbl_user_detail;
const userBusiness = require("../Database/models").tbl_user_business_info;
const userSubscription = require("../Database/models").tbl_user_subscription;
const subscription = require("../Database/models").tbl_subscription;
const city = require("../Database/models").tbl_city;
const state = require("../Database/models").tbl_state;
const country = require("../Database/models").tbl_country;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const constant = require("../Configs/constant");
const imageupload = require("../Middleware/multer_aws_upload");
const imageDelete = require("../Middleware/multer_aws_delete");
var connection_more =require('./../config/config');

var fs=require('fs');
var xml2js=require('xml2js');

var parser= new xml2js.Parser({ attrkey: "ATTR" });
const bcrypt = require('bcrypt');
const jsonwebtoken=require("jsonwebtoken");
//const nodemailer =require("nodemailer");
//const randtoken =require("rand-token");
//const cookie=require('cookie-parser');
const saltRounds = 10;
var mysql= require('mysql');
const { CloudSearch } = require("aws-sdk");
//const { values } = require("sequelize/types/lib/operators");
var connection = mysql.createConnection(connection_more.test);

/*
//send email
function sendEmail(email, token) {
 
  var email = email;
  var token = token;

  var mail = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 9091,
      service: 'gmail',
      auth: {
          user: 'ronyd4601@gmail.com', // Your email id
          pass: 'rehwukalwixxgwwu' // Your password
      }
  });

  var mailOptions = {
      from: 'ronyd4601@gmail.com',
      to: email,
      subject: 'Reset Password Link - Tutsmake.com',
      html: '<p>You requested for reset password, kindly use this <a href="http://localhost:4000/reset-password?token=' + token + '">link</a> to reset your password</p>'

  };

  mail.sendMail(mailOptions, function(error, info) {
      if (error) {
          console.log(error);
      } else {
          console.log("mail sent successfully");
      }
  });
}
*/



module.exports = {

    async addPro(req, res) {
        try{
            console.log(req.body);
            res.send("ok");

        }
        catch(error){
            console.log(error);
        }
       
    },





  /*register user */

  async getData(req, res) {

   
    fs.readFile('unitinventory_univ.xml',function(err,data){
        if(!err) {
           
            parser.parseString(data, function(error, result) {
                if(error === null) {

                    console.log(result.feed.item.length);
                    var d=JSON.stringify(result.feed.item);
                    //console.log(JSON.stringify(result.feed.item));
                   //res.send(result.feed.item);
                   const output = Object.entries(result.feed).map(([key, value]) => ({
                    key,
                    value
                  }));
                  //console.log(key);
                  console.log(output);
                   

                    

                    var sql = "INSERT INTO `auction_feeddata`(`title`,`link`,`description`,`modified`,`customerId`,`customer`,`address1`,`address2`,`address3`,`country`,`state`,`city`,`zip`,`phone`,`email`,`companyurl`,`companylogo`,`Item`) VALUES ('" + result.feed.title + "','" + result.feed.link + "','" + result.feed.description + "','" + result.feed.modified + "','" + result.feed.customerId + "','" + result.feed.customer + "','" + result.feed.address1 + "','" + result.feed.address2 + "','" + result.feed.address3 + "','" + result.feed.country + "','" + result.feed.state + "','" + result.feed.city + "','" + result.feed.zip + "','" + result.feed.phone + "','" + result.feed.email + "','" + result.feed.companyurl + "','" + result.feed.companylogo + "','" + JSON.stringify(result.feed.item) + "')";
                    connection.query(sql, function(errorr, result){

                        if (errorr) {
                            res.send({
                              "code":400,
                              "failed":{'error':error, 'con':connection_more.test}
                            })
                          } 

                          else {
                            res.json({ 
                            message: "Product details successfully added",
                            "status": true,
                            "data": [],
                            "errors": []
                           
                           });
                      
                         }
                    });
                    //var check=result.feed.item;
                    /*     
                    let queryParams = [];
                    for (var i = 0; i < result.feed.item.length; i++) {
                      const title = result.feed.item[i].title;
                      const description = result.feed.item[i].description;
                      const price = result.feed.item[i].price;
                      const price_type = result.feed.item[i].price_type;
                      const stocknumber = result.feed.item[i].stocknumber;
                      const vin = result.feed.item[i].vin;
                      const manufacturer = result.feed.item[i].manufacturer;
                      const year = result.feed.item[i].year;
                      const color = result.feed.item[i].color;
                      const model_type = result.feed.item[i].model_type;
                      const model_typestyle = result.feed.item[i].model_typestyle;
                      const model_name = result.feed.item[i].model_name;
                      const trim_name = result.feed.item[i].trim_name;
                      const trim_color = result.feed.item[i].trim_color;
                      const condition = result.feed.item[i].condition;
                      const usage = result.feed.item[i].usage;
                      const location = result.feed.item[i].location;
                      const updated = result.feed.item[i].updated;
                      const miles = result.feed.item[i].miles;
                     
                  
                      let param = [
                        title,
                        description,
                        price,
                        price_type,
                        stocknumber,
                        vin,
                        manufacturer,
                        year,
                        color,
                        model_type,
                        model_typestyle,
                        model_name,
                        trim_name,
                        trim_color,
                        condition,
                        usage,
                        location,
                        updated,
                        miles








                        
                      ];
                  
                      queryParams.push(param);
                    }
                
                    for(var i=0; i<result.feed.item.length;i++){
              
                        check[i]= ('" + result.feed.item[i].title + "','" + result.feed.item[i].description + "','" + result.feed.item[i].price + "','" + result.feed.item[i].price_type + "','" + result.feed.item[i].StockNumber + "','" + result.feed.item[i].vin + "','" + result.feed.item[i].manufacturer + "','" + result.feed.item[i].year + "');
                        console.log(check[i]);
                    }
           
                    var sql = "INSERT INTO `product`(`Product_Name`,`Description`,`Price`,`PriceType`,`StockNumber`,`Vin`,`Manufacturer`,`Year`,`Color`,`ModelType`,`ModelTypeStyle`,`ModelName`,`TrimName`,`TrimColor`,`Conditions`,`Usages`,`Location`,`Updated`,`Miles`) VALUES ?";
                    const query = connection.query(sql, [queryParams], function(err, result){
                        if (err) {
                            res.send({
                              "code":400,
                              "failed":{'error':error, 'con':connection_more.test}
                            })
                          } 
                     
                          else {
                                  res.json({ 
                                  message: "Product details successfully added",
                                  "status": true,
                                  "data": [],
                                  "errors": []
                                 
                                 });
                            
                               }
                          
                        });
                
                */
                }
                else {
                    res.json({ 
              
                        "status": false,
                        message: "Invalid xml file", 
                        "data": [],
                        "errors": [] 
                      
                      });
                }
            });
        }
        else {
            res.json({ 
      
                "status": false,
                message: "Invalid xml file", 
                "data": [],
                "errors": [] 
              
              });
          }
       })
    }
}
