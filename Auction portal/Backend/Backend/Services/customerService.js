/*
 * Summary:     partnerService file for handling all Partner - CMS related actions.
 * Author:      Openxcell(empCode-473)
 */

/**require NPM-modules,models and constants for configuration */
const user = require("../Database/models").tbl_user;
const users=require("../Database/models").users;
const customer=require("../Database/models").customer_service;
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





module.exports = {

  /*register user */
   
  async registercustomer(req, res) {
      console.log(req.body);

      const emailid=req.body.Emailid;
      const password=req.body.Password;
      const username=req.body.Username
      const encryptedPassword = await bcrypt.hash(password, saltRounds);
      const Status="Active";
      const isActive="false";

      
 
    try{

        connection.query('SELECT * FROM customer_service WHERE Emailid = ?  or  Username=?', [emailid,username], function(error, rst, fields) {

            if(rst.length==0){



            if (error) {

                res.send({
                   "code":400,
                    "failed":{'error':error, 'con':connection_more.test}
                  })
                 }


              
            

               var sql = "INSERT INTO `customer_service`(`Name`,`Username`,`Emailid`,`Password`,`isActive`) VALUES ('" + req.body.Name + "','" + username + "','" + emailid + "','" + encryptedPassword + "','" + isActive + "')";
           
          
                connection.query(sql, function(error, results) {

                if (error) {

                res.send({
                   "code":400,
                    "failed":{'error':error, 'con':connection_more.test}
                  })
                 }
                 else {
                    return res.json({
              
                        message: "user successfully added",
                        "status": true,
                        "data": [],
                        "errors": []
                      
                      });
                 }
            });
        }

        else {
            return res.json({
              
                message: "Emailid or Username is already exists",
                "status": true,
                "data": [],
                "errors": []
              
              });
           }
       });
    }
    catch(error){
        console.log(error);
    }
    
 },









 /* login customer*/
 async logincustomer(req, res) {
  
    try{


        let email = req.body.Emailid;
        let password = req.body.Password;
        //let id=req.body.id;
        let Active="true";
         console.log(req.body);
  
         //res.send("welcome");

         if(email){

            connection.query('SELECT * FROM customer_service WHERE 	Emailid = ? ', [email], function(error, results, fields) {
        
                if (error) throw error;


                
                if(results.length>0){
                
                  if(results[0].isActive=="true"){
                    

                    bcrypt.compare(password, results[0].Password, function(err, isMatch) {
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
                        } 
                        
                        else {
                          
                          const token = jsonwebtoken.sign({ id : results[0].Customer_id}, "jsonwebtokenfordemotest");
                            res
                            .cookie("access_token", token, {
                              httpOnly: true,
                              
                            })
                            .status(200)
                            .json({ 
                             
                              message: "Login successfully" ,
                              "status": true,
                              "data": {
                                       "accessToken": token,
                                       "user_info":  {
                                         Cusomerid : results[0].Customer_id,
                                         UserName : results[0].Username,
                                         Emailid : results[0].Emailid

                                         }  
                                    },
                             "errors": []
                            
                                });
                            }
                       })
                   }
                  else{
                    res.json({ 
                      message: "You are not allowed to login need to activate your account",
                      "status": false,
                      "data": [],
                      "errors": []   
                     });
                  }
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
         else{
             res.json({ 
                message: "Please enter all details",
                "status": false,
                "data": [],
                "errors": []   
               });
         }
    }

    catch(error){
        console.log(error);
    }

},









/* logout Customer */
async logoutcustomer(req, res) {

    res.clearCookie("access_token").status(200).json({

        message: "Successfully logged out",
        "status": true,
        "data": [],
        "errors": []  

      });

  },








 

 

 
    
  /*View all Customer Service*/
 
  async viewallcustomer(req, res) {

    

    try{
        var sql = "select * from customer_service";
           
          
        connection.query(sql, function(error, results) {

            if (error) {

                res.send({
                   "code":400,
                    "failed":{'error':error, 'con':connection_more.test}
                  })
                 }


             else {

                return res.json({
                    "status": true,
                    message: "All Customer Service details",
                    "data": results,
                    "errors": []
                    
                  
                  });
              }    
         });
     }
    catch(error){
        console.log(error);
    }
   
 },







 /* update customer data */

 async editallcustomer(req, res) {
     try{

      var d=req.body;
      console.log(d);

      
      let sqq=`select * from customer_service where Customer_id=` + req.body.Customer_id;
      connection.query(sqq, function(error, results) {

       if(results.length>0){

       
       let sqlu = `UPDATE customer_service set  Name = '${d.Name}',Username = '${d.Username}',Emailid = '${d.Emailid}'  where Customer_id=` + req.body.Customer_id ;
       connection.query(sqlu , function(error, result) {

             if (error) {
               res.send({
               "code":400,
               "failed":{'error':error, 'con':connection_more.test}
             })
            } else {
                   res.json({ 
                    "status": true,
                     message: "Customer Service details updated succesfully",
                     "data": [],
                     "errors": []   
                    
                    
                    });
                }
            });
         }
         else{
           res.json({
              
                      "status": false, 
                      message: "please enter valid Customer Service id",
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








/* Customer service Status update*/

async statusUpdate(req, res) {

  try{

    var d=req.body;
    console.log(d);

    
    let sqp=`select * from customer_service where Customer_id=` + req.params.id;
    connection.query(sqp, function(error, resultp) {
      
      console.log(resultp.length); 
     if(resultp.length>0){

     
     let sqllu = `UPDATE customer_service set  isActive = '${d.isActive}'  where Customer_id=` + req.params.id ;
     connection.query(sqllu , function(error, resultt) {

           if (error) {
             res.send({
             "code":400,
             "failed":{'error':error, 'con':connection_more.test}
           })
          } 
          else {
                 res.json({ 
                  "status": true,
                   message: "Customer Service status updated succesfully",
                   "data": [],
                   "errors": []   
                  
                  
                  });
              }
          });
       }
       else{
         res.json({
            
                    "status": false, 
                    message: "please enter valid Customer Service id",
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









/* Delete customer service */

async delcustomerbyid(req, res) {

    try{

    
    const isActive="false";

    
    let sqq=`select * from customer_service where Customer_id=` + req.params.id;
    connection.query(sqq, function(error, results) {

     if(results.length>0){
    
     if(results[0].isActive=="true"){

     let sqlu = `UPDATE customer_service set  isActive = '${isActive}'  where Customer_id=` + req.params.id ;
     connection.query(sqlu , function(error, result) {

           if (error) {
             res.send({
             "code":400,
             "failed":{'error':error, 'con':connection_more.test}
           })
          } else {
                 res.json({ 
                  
                   message: "Customer Service details deleted succesfully",
                   "status": true,
                   "data": [],
                   "errors": []   
                  
                  
                  });
              }
          });
        }
        else{
          res.json({
            
                  
            message: "Customer service details already deleted",
            "status": false, 
            "data": [],
            "errors": [] 
  
            });
          }
       }
       else{
         res.json({
            
                  
                    message: "please enter valid Customer Service id",
                    "status": false, 
                    "data": [],
                    "errors": [] 
          
              });
           }
      });
 }
  catch(err){
      console.log(err);
    }
  }
};
