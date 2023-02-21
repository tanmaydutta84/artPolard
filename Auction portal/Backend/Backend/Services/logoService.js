/*
 * Summary:     categoryBannerServices file for handling all CATEGORY BANNER - CMS related actions.
 * Author:      Openxcell(empCode-473)
 */

/**require NPM-modules,models and constants for configuration */
const category = require("../Database/models").tbl_category;
const template_page =require("../Database/models").page_template;
const tbl_demo=require("../Database/models").tbl_demo;
//const logo_status=require("../Database/models").logo_status;
const categoryBannerImages = require("../Database/models")
  .tbl_category_banner_image;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const QueryTypes = Sequelize.QueryTypes;
const constant = require("../Configs/constant");
const imageupload = require("../Middleware/multer_aws_upload");
const imageDelete = require("../Middleware/multer_aws_delete");
const db = require("../Database/models/index");
const bcrypt = require('bcrypt');
const path = require('path');
const saltRounds = 10;
const mysql= require("mysql");
var connection_more =require('./../config/config');
var connection = mysql.createConnection(connection_more.test);

module.exports = {


  /* Add logo details */

  async addlogos(req, res) {

         try{
                var data=req.body;
                console.log(data.UserID);
               // req.body.image = req.file.originalname;
                console.log(req.file);
         
                let sqlv=`select * from users where UserID=` + data.UserID ;
                connection.query(sqlv, function(error, resultt) {
                    if (error) {

                    res.send({
                       "code":400,
                        "failed":{'error':error, 'con':connection_more.test}
                      })
                     }
                     
                     if(resultt.length>0){
                      console.log(req.file.filename);
                      //console.log(req.body.file.filename);     
                      var sql = "INSERT INTO `logo_status`(`logo` ,`UserID`, `status`) VALUES ('" + req.file.filename + "','" + data.UserID + "','" + data.status + "')";
           
          
                      connection.query(sql, function(error, results) {

                        if (error) {

                          res.send({
                             "code":400,
                              "failed":{'error':error, 'con':connection_more.test}
                            })
                           }


                           else {
                            res.json({
                    
                            message: "Logo Details successfully added",
                            "status": true,
                            "data": [],
                            "errors": []
                          
                          });
                       }
                  });
                         
              }

                     else{
                      res.json({ 
            
                        "status": false,
                        message: "PLease Enter Valid user id", 
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







/* Edit Logo detail */
async editlogodetails(req, res) {
    
  try{
    var d=req.body;
    console.log(d);

    
    let sqq=`select * from logo_status where logo_id=` + req.body.logo_id ;
    connection.query(sqq, function(error, results) {

      if (error) {
        res.send({
           "code":400,
            "failed":{'error':error, 'con':connection_more.test}
          })
         }

      if(results.length>0){

        let sqlll = `UPDATE logo_status set  status = '${d.status}'  where logo_id=` + req.body.logo_id ;
        connection.query(sqlll , function(error, result) {
          console.log(results[0].logo);
          console.log(results[0].UserID);
          if (error) {
            res.send({
               "code":400,
                "failed":{'error':error, 'con':connection_more.test}
              })
             }

             else{

              let sqllogo = `UPDATE users set  logo = '${results[0].logo}'  where UserID=` + results[0].UserID ;
              connection.query(sqllogo , function(errorlogo, resultlogo) {

                if (errorlogo) {
                  res.send({
                     "code":400,
                      "failed":{'error':errorlogo, 'con':connection_more.test}
                    })
                   }

                   else {
                    res.json({
                      message: "Successfully Edited all Logo details",
                      "status": true,
                      "data": [],
                      "errors": []
                      
                    
                       });
                   }
    


              });



             
              }
          });
       }
      else{

        res.json({ 
          
          "status": false,
          message: "PLease Enter Valid logo id", 
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










  //update Logo by id //
  async editLogobyid(req, res) {
    
    try{
      var d=req.body;
      console.log(d);

      
      let sqq=`select * from users where UserID=` + req.params.id ;
      connection.query(sqq, function(error, results) {

        if (error) {
          res.send({
             "code":400,
              "failed":{'error':error, 'con':connection_more.test}
            })
           }

        if(results.length>0){

          let sqlll = `UPDATE users set  logo = '${req.file.filename}', Dealer_Account='${req.body.Dealer_Account}'  where UserID=` + req.params.id ;
          connection.query(sqlll , function(error, result) {

            if (error) {
              res.send({
                 "code":400,
                  "failed":{'error':error, 'con':connection_more.test}
                })
               }

               else{

                res.json({
                  "status": true,
                  message: "Successfully Edited logo",
                  "data": [],
                  "errors": []
                  
                
                   });
                }
            });
         }
        else{

          res.json({ 
            
            "status": false,
            message: "PLease Enter Valid User id", 
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










  async getLogo(req, res) {

    try{
      let sqlgetlogo=`select * from logo_status where logo_id=${req.params.id} and IsDeleted= 'false'`  ;
      connection.query(sqlgetlogo, function(errorgetl, resultgetl) {

        if(resultgetl.length>0){
          if (errorgetl) {
            res.send({
               "code":400,
                "failed":{'error':errorgetl, 'con':connection_more.test}
              })
             }

             else{

              res.json({ 
                message: "Logo details are",
                "status": true,
                 "data": resultgetl,
                "errors": [] 
              
                 });


             }



        }
        else{
          res.json({ 
            message: "PLease Enter Valid logo id",
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
  ,







   /* view all  Logos */

  async viewalllogo(req, res) {
    
    try{

      var sqll = "select * from logo_status where IsDeleted= 'false'";
 
        connection.query(sqll, function(error, result) {
            
         if (error) {
        res.send({
           "code":400,
            "failed":{'error':error, 'con':connection_more.test}
          })
         } else {
            console.log(result);
            res.json({
              "status": true,
              message: "All Logo details",
              "data": result,
              "errors": []
              
            
            });
        }




       });

    }
    catch(err){
        console.log(err);
    }

  },







 



    /* view  dealer details by id */
  async viewdealerbyid(req, res) {
    
    try{

      let id=req.params.id;
      console.log(id);

      if (id){

       let sqlv=`select * from users where id=` + id ;

      connection.query(sqlv, function(error, resultt) {
          
       if (error) {
       res.send({
         "code":400,
          "failed":{'error':error, 'con':connection_more.test}
        })
       }

       if(resultt.length>0){

          console.log(resultt);
          res.json({
            
              "status": true,
              message: "Individual User details",
              "data": resultt,
              "errors": []
          
          });
       }
       
       else
        {
          res.json({ 
            
            "status": false,
            message: "PLease Enter Valid user id", 
            "data": [],
            "errors": [] 
          
          });
          
          }
        });
      }
       else{

        res.json({ 

          "status": false, 
          message: "PLease provide user id",
          "data": [],
          "errors": [] 
        
        });
     }
    }

    catch(err){
        console.log(err);
    }

    },


  










  /* Update Dealer details */

  async updatedealer(req, res) {

    try{

      var d=req.body;
      console.log(d);

      
      let sqq=`select * from users where id=` + req.body.id ;
      connection.query(sqq, function(error, results) {

       if(results.length>0){

       
       let sqlu = `UPDATE dealer set  firstName = '${d.firstName}',lastName = '${d.lastName}',phone = '${d.phone}',company = '${d.company}',Bysiness_type = '${d.Business_type}',Website = '${d.Website}',Address1 = '${d.Address1}',Address2 = '${d.Address2}',city = '${d.city}',state = '${d.state}',postalcode = '${d.postalcode}',country = '${d.country}',email = '${d.email}'  where id=` + req.body.id ;
       connection.query(sqlu , function(error, result) {

             if (error) {
               res.send({
               "code":400,
               "failed":{'error':error, 'con':connection_more.test}
             })
            } else {
                   res.json({ 
                    "status": true,
                     message: "user details updated succesfully",
                     "data": [],
                     "errors": []   
                    
                    
                    });
             }
            });
         }
         else{
           res.json({
              
                      "status": false, 
                      message: "please enter valid user id",
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






  /* Delete Logo details */

  async deletelogobyid(req, res) {

     try{
   



       let sq=`select * from logo_status where logo_id=` + req.params.id ;
       connection.query(sq, function(error, results) {

        if(results.length>0){

        
        let sqlld = `delete from logo_status where logo_id=` + req.params.id ;
        connection.query(sqlld, function(error, result) {

              if (error) {
                res.send({
               "code":400,
                "failed":{'error':error, 'con':connection_more.test}
              })
             } else {
              res.json({ 
                "status": true,
                 message: "Logo details succesfully deleted", 
                "data": [],
                "errors": [] 
              
              });
              }
             });
          }
          else{
            res.json({ 
              
              "status": false, 
              message: "please enter valid logo id",
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


  async addtables(req, res) {

    try{

      await tbl_demo.sync();
      res.send("added");


    }
    catch(err){
      console.log(err);
    }


  },






 

  async addtabs(req, res) {

    try{
      var data=req.body;
      console.log(data.UserID);
     // req.body.image = req.file.originalname;
      console.log(req.file);

      let sqlv=`select * from users where UserID=` + data.UserID ;
      connection.query(sqlv, function(error, resultt) {
          if (error) {

          res.send({
             "code":400,
              "failed":{'error':error, 'con':connection_more.test}
            })
           }
           
           if(resultt.length>0){
            console.log(req.file.filename);
            //console.log(req.body.file.filename);     
            var sql = "INSERT INTO `logo_status`(`logo` ,`UserID`, `status`) VALUES ('" + req.file.filename + "','" + data.UserID + "','" + data.status + "')";
 

            connection.query(sql, function(error, results) {

              if (error) {

                res.send({
                   "code":400,
                    "failed":{'error':error, 'con':connection_more.test}
                  })
                 }


                 else {
                  res.json({
          
                  message: "Logo Details successfully added",
                  "status": true,
                  "data": [],
                  "errors": []
                
                });
             }
        });
               
    }

           else{
            res.json({ 
  
              "status": false,
              message: "PLease Enter Valid user id", 
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








};
