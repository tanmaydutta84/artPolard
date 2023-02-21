/*
 * Summary:     categoryBannerServices file for handling all CATEGORY BANNER - CMS related actions.
 * Author:      Openxcell(empCode-473)
 */

/**require NPM-modules,models and constants for configuration */
const category = require("../Database/models").tbl_category;
const template_page =require("../Database/models").page_template;
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


  /* Add dealer */

  async adddealer(req, res) {

      try{
        
        var data=req.body;

        
      
        console.log(data);
        const password = data.password;
        const encryptedPassword = await bcrypt.hash(password, saltRounds);
        const accounttype="pending";
        //const Service_type=null;
        

          //res.send("added");


          if (data.Business_type===""){
            data.Business_type="NULL";
          }

          if (data.Service_type===""){
            data.Service_type="NULL";
          }

         
         if((data.Business_type ==="NULL" || data.Service_type ==="NULL") ){
           
        
          var sql = "INSERT INTO `users`(`firstName`,`lastName`,`phone`,`company`, `Business_type`, `Service_type` ,`Website`,`Address1`, `Address2`, `city` ,`state`,`postalcode`, `country` ,`email`, `password`,`Dealer_Account`,`logo`) VALUES ('" + data.firstName + "','" + data.lastName + "','" + data.phone + "','" + data.company + "','" + data.Business_type + "','" + data.Service_type + "','" + data.Website + "','" + data.Address1 + "','" + data.Address2 + "','" + data.city + "','" + data.state+ "','" + data.postalcode + "','" + data.country + "','" + data.email + "','" + encryptedPassword + "','" + accounttype + "','" + req.file.filename + "')"; "SELECT LAST_INSERT_ID();"
           
          
          connection.query(sql, function(error, results) {
            
               
               //console.log(results.insertId);
              
           if (error) {

          res.send({
             "code":400,
              "failed":{'error':error, 'con':connection_more.test}
            })
           } else {
           

            sqqq="insert into `logo_status`(`logo`,`UserID`,`status`) values ('" + req.file.filename + "','" + results.insertId + "','" + 'pending' + "')";
            connection.query(sqqq, function(error, rt) {
              if (error) {

                res.send({
                   "code":400,
                    "failed":{'error':error, 'con':connection_more.test}
                  })
                }
                  else{
                    res.json({
              
                      message: "user successfully added",
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
              
          message: "Please select either Business type or Service Type",
          "status": true,
          "data": [],
          "errors": []
        
        });

      }
     }
      catch(err){
          console.log(err);
      }

  },











    // update logo by userID
  async updateLogo(req, res) {
   
    try{
      console.log(req.file.filename);
      let sqluplogo=`select * from users where UserID= ${req.params.id} and IsDeleted='false'` ;
      connection.query(sqluplogo, function(erroruplogo, resultuplogo) {
        
        if(resultuplogo.length>0){

          if (erroruplogo) {
            res.send({
              "code":400,
               "failed":{'error':erroruplogo, 'con':connection_more.test}
             })
            }


            else{

              let sqlupp = `UPDATE users set  logo = '${req.file.filename}'  where UserID=` + req.params.id ;
              
              connection.query(sqlupp, function(errorupp, resultupp) {

                if (errorupp) {
                  res.send({
                    "code":400,
                     "failed":{'error':errorupp, 'con':connection_more.test}
                   })
                  }

                  else{

                    let sqlchdata=`select * from users where UserID=` + req.params.id ;
                    connection.query(sqlchdata, function(errorchdata, resultchdata) {

                      if (errorchdata) {
                        res.send({
                          "code":400,
                           "failed":{'error':errorchdata, 'con':connection_more.test}
                         })
                        }

                        else{

                          res.json({
                            message: "Updated user details",  
                           "status": false, 
                            "data": resultchdata[0].logo,
                           "errors": [] 
                 
                          });

                     }

                });

           }




              });
        


            }









        }
        else{
          res.json({
            message: "please enter valid user id",  
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


  },












   /* view all  dealers */

  async viewdealer(req, res) {
    
    try{

      var sqll = `select * from users where IsDeleted='false'`;
 
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
              message: "All User details",
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

       let sqlv=`select * from users where UserID=` + id ;

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





  // view all customer service provider //  
  async viewcustomer(req, res) {

    try{

      res.send("welcome");


    }
    catch(error){
      console.log(error);
    }
  },




  










/* Update Dealer details */

async updatedealer(req, res) {

  try{

    var d=req.body;
    console.log(d);

    
    let sqq=`select * from users where UserID=` + req.body.UserID ;
    connection.query(sqq, function(error, results) {

     if(results.length>0){


        var sql = "INSERT INTO `user_previous_details`(`firstName`,`lastName`,`phone`,`company`, `Business_type`, `Website`,`Address1`, `Address2`, `city` ,`state`,`postalcode`, `country` ,`email`,`Inventory_Type`,`UserID`) VALUES ('" + results[0].firstName + "','" + results[0].lastName + "','" + results[0].phone + "','" + results[0].company + "','" + results[0].Business_type + "','" + results[0].Website + "','" + results[0].Address1 + "','" + results[0].Address2 + "','" + results[0].city + "','" + results[0].state+ "','" + results[0].postalcode + "','" + results[0].country + "','" + results[0].email + "','" + results[0].Inventory_Type + "','" + results[0].UserID + "')"; 
         
        
        connection.query(sql, function(error, results) {
          if (error) {
            res.send({
            "code":400,
            "failed":{'error':error, 'con':connection_more.test}
          })
         }
      });



     
     let sqlu = `UPDATE users set  firstName = '${d.firstName}',lastName = '${d.lastName}',phone = '${d.phone}',company = '${d.company}',Business_type = '${d.Business_type}',Website = '${d.Website}',Address1 = '${d.Address1}',Address2 = '${d.Address2}',city = '${d.city}',state = '${d.state}',postalcode = '${d.postalcode}',country = '${d.country}',email = '${d.email}', Inventory_Type= '${d.Inventory_Type}'  where UserID=` + req.body.UserID ;
     connection.query(sqlu , function(error, result) {

           if (error) {
             res.send({
             "code":400,
             "failed":{'error':error, 'con':connection_more.test}
           })
          } else {

            let sqqup=`select * from users where UserID=` + req.body.UserID ;
            connection.query(sqqup, function(errorup, resultsup) {

              if (errorup) {
                res.send({
                "code":400,
                "failed":{'error':errorup, 'con':connection_more.test}
              })
             }

             else {
              res.json({ 
                message: "updated Data",
               "status": true,
                "data": resultsup,
                "errors": []   
               
               
                });
             }
         });
       }
   });
 }
       else{
         res.json({
                     message: "please enter valid user id",  
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

},









  /* 

  async deletedealerbyid(req, res) {

     try{
   



       let sq=`select * from users where UserID=` + req.params.id ;
       connection.query(sq, function(error, results) {

        if(results.length>0){

        
        let sqlld = `delete from users where UserID=` + req.params.id ;
        connection.query(sqlld, function(error, result) {

              if (error) {
                res.send({
               "code":400,
                "failed":{'error':error, 'con':connection_more.test}
              })
             } else {
              res.json({ 
                "status": true,
                 message: "user details succesfully deleted", 
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

  }



};

*/


  /* Delete Dealer details */

  async deletedealerbyid(req, res) {

    try{
     const isd="true";

     /*

     const isd="true";


     let sqt=`select * from logo_status where UserID=` + req.params.id;
     connection.query(sqt, function(errort, resultst) {

       console.log(resultst.length);

       if(resultst.length>0){

       if (errort) {
         res.send({
         "code":400,
         "failed":{'error':errort, 'con':connection_more.test}
       })
      }

      let sq=`UPDATE users JOIN logo_status ON users.UserID = logo_status.UserID SET users.IsDeleted= '${isd}' , logo_status.IsDeleted= '${isd}'  WHERE users.UserID=` +req.params.id ;
      connection.query(sq, function(error, results) {

       if (errort) {
         res.send({
         "code":400,
         "failed":{'error':errort, 'con':connection_more.test}
       })
      }

      else{
       res.json({
                   message: "deleted",  
                  "status": false, 
                  
                  "data": [],
                  "errors": [] 
        
            });
          }
      });
    }

     else {


       let sqg=`update users set IsDeleted='${isd}' where UserID=` +req.params.id ;
       connection.query(sqg, function(errorg, resultg) {

         if(resultg.length>0){

        if (errorg) {
          res.send({
          "code":400,
          "failed":{'error':errorg, 'con':connection_more.test}
        })
       }

       else{
        res.json({
                    message: "deleted",  
                   "status": false, 
                   
                   "data": [],
                   "errors": [] 
         
             });
          }
       }

         else {
           res.send("error");
         }
 
       });

     }


      

  });
 */





  let sqljoin=`SELECT * FROM users INNER JOIN logo_status INNER JOIN auction_data WHERE users.UserID = logo_status.UserID AND logo_status.UserID = auction_data.UserID AND users.UserID=` +req.params.id ;

  connection.query(sqljoin, function(errorj, resultj) {
       console.log(resultj.length);

       if(resultj.length>0){

         let sqlljoin1 = `UPDATE users JOIN auction_data ON users.UserID = auction_data.UserID JOIN logo_status ON auction_data.UserID = logo_status.UserID JOIN auction_feeddata ON logo_status.UserID=auction_feeddata.UserID  SET users.IsDeleted= '${isd}' , auction_data.IsDeleted= '${isd}' , logo_status.IsDeleted= '${isd}' , auction_feeddata.IsDeleted= '${isd}' WHERE users.UserID=` +req.params.id ;
         connection.query(sqlljoin1, function(errorj1, resultj1) {

           if (errorj1) {
             res.send({
             "code":400,
             "failed":{'error':errorj1, 'con':connection_more.test}
           })
          }

           res.json({ 
             message: "user details succesfully deleted",
             "status": true,
              "data": [],
             "errors": [] 
           
               });
           });
       }

       else {

         let sqljoin2=`SELECT * FROM users INNER JOIN auction_data INNER JOIN auction_feeddata WHERE users.UserID = auction_data.UserID AND auction_data.UserID=auction_feeddata.UserID AND users.UserID=` +req.params.id ;

         connection.query(sqljoin2, function(errorj2, resultj2) {

           console.log("2nd"+resultj2.length);

           if(resultj2.length>0){

             let sqlljoin3 = `UPDATE users JOIN auction_data ON users.UserID = auction_data.UserID JOIN auction_feeddata ON auction_data.UserID = auction_feeddata.UserID SET users.IsDeleted= '${isd}' , auction_data.IsDeleted= '${isd}' , auction_feeddata.IsDeleted= '${isd}' WHERE users.UserID=` +req.params.id ;
         connection.query(sqlljoin3, function(errorj3, resultj3) {

           if (errorj3) {
             res.send({
             "code":400,
             "failed":{'error':errorj3, 'con':connection_more.test}
           })
          }
   
           else{

           res.json({ 
              message: "user details succesfully deleted",
             "status": true,
             "data": [],
             "errors": [] 
           
               });
             }
           });


           }


           else{

             let sqljoin4=`SELECT * FROM users INNER JOIN logo_status WHERE users.UserID = logo_status.UserID AND users.UserID=` +req.params.id ;
             
             connection.query(sqljoin4, function(errorj4, resultj4) {

               console.log("3rd"+resultj4.length);

               if(resultj4.length>0){
               
               let sqljoin5=`UPDATE users JOIN logo_status ON users.UserID = logo_status.UserID SET users.IsDeleted= '${isd}' , logo_status.IsDeleted= '${isd}' WHERE users.UserID=` +req.params.id;
               
               connection.query(sqljoin5, function(errorj5, resultj5) {

                 if (errorj5) {
                   res.send({
                   "code":400,
                   "failed":{'error':errorj5, 'con':connection_more.test}
                 })
                }
         
                 else{
     
                  res.json({ 
                    message: "user details succesfully deleted",
                   "status": true,
                   "data": [],
                   "errors": [] 
                 
                     });
                   }
                 });
               }

               else{

                    let sqljoin6=`select * from users where UserID=` +req.params.id;

                    connection.query(sqljoin6, function(errorj6, resultj6) {

                     console.log("res4"+resultj6.length);

                     if(resultj6.length>0){

                       let sqljoin7=`UPDATE users SET users.IsDeleted= '${isd}' WHERE users.UserID=` +req.params.id;
               
                       connection.query(sqljoin7, function(errorj7, resultj7) {

                         if (errorj7) {
                           res.send({
                           "code":400,
                           "failed":{'error':errorj7, 'con':connection_more.test}
                         })
                        }
                 
                         else{
             
                          res.json({ 
                            message: "user details succesfully deleted",
                           "status": true,
                           "data": [],
                           "errors": [] 
                         
                             });
                           }




                       });



                     }


                     else {

                       res.json({
                         message: "Please enter valid UserID", 
                         "status": false,
                          
                         "data": [],
                         "errors": [] 
                       
                           });



                       

                     }



                    })




               }

          })



            // let sqljoin5=`UPDATE users JOIN logo_status ON users.UserID = logo_status.UserID SET users.IsDeleted= '${isd}' , logo_status.IsDeleted= '${isd}' WHERE users.UserID=` +req.params.id;







           }







         });





       }












 });












      


  

  

    
      }
    catch(err){
        console.log(err);
   
       }
    }



};
