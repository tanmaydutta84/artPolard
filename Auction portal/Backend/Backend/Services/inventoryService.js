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








    // View all inventory details depends on userID

    async listdataById(req, res) {
      try{
          
          
        let sqid=`select *  from  auction_feeddata where UserID=${req.params.id} and IsDeleted='false'` ;   

       //let sq=`SELECT * FROM auction_data JOIN auction_feeddata on auction_data.AuctionID = auction_feeddata.AuctionID WHERE auction_data.UserID=` + req.params.id ;

        connection.query(sqid, function(errorid, resultsid) {

          if(resultsid.length>0){
            if (errorid) {
              console.log(errorid);
              return res.send({
              "code":400,
              "failed":{'error':errorid, 'con':connection_more.test}
            })
           } 
           else {
             
             res.json({ 
              message: "Inventory data fetch successfully",
               "status": true,
               "data": resultsid,
               "errors": []   
                   });
                }
             }

          else{

            res.json({ 
              message: "Please enter valid UserID", 
              "status": false,
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






    async listdataByid(req, res) {
      try{
          
          


        let sq=`select *  from  auction_feeddata where IsDeleted='false'` ;   
        
        connection.query(sq, function(error, results) {

          if(results.length>0){
            if (error) {
              console.log(error);
              return res.send({
              "code":400,
              "failed":{'error':error, 'con':connection_more.test}
            })
           } 
           else {
             
             res.json({ 
               message: "Inventory data fetch successfully",
               "status": true,
               "data": results,
               "errors": []   
                   });
                }
            
          }

          else{

            res.json({ 
              
              "status": false,
              message: "There is not any Items",  
              "data": [],
              "errors": [] 
            
            });

          }

     
        });

          //res.send("done");

      }
      catch(error){
          console.log(error);
      }
     
  },









 // view single item from inventory list depends on itemid and auctionid

 async viewdataByid(req, res) {

  try{


    /*
    function getNestedChildren(arr, Parent_ID) {
      var out = []
      for (var i in arr) {
        if (arr[i].Parent_ID == Parent_ID) {
          var children = getNestedChildren(arr, arr[i].Category_ID)
    
          if (children.length) {
            arr[i].subCate = children
          }
          out.push(arr[i])
        }
      }
      return out
    }
    */
    console.log(req.body.ItemID);
    let sqhfui=`select *  from  auction_feeddata where ItemID= '${req.body.ItemID}' and IsDeleted= 'false'` ;

    connection.query(sqhfui, function(errori, resull) {
     
      if(resull.length>0){

      if (errori) {
        console.log(errori);
        return res.send({
        "code":400,
        "failed":{'error':errori, 'con':connection_more.test}
       })
     } 

     else {
      /*
     let check=`select *  from  category`;
     connection.query(check, function(check, resultcheck) {

  


      let sqlch=`select *  from  category where Category_ID= '${req.body.Category_ID}'` ;

      connection.query(sqlch, function(errorch, resultch) {

        console.log(resultch[0].Parent_ID);


        if (errorch) {
          console.log(errorch);
          return res.send({
          "code":400,
          "failed":{'error':errorch, 'con':connection_more.test}
         })
        }


        else {
          resull[0].Category=getNestedChildren(resultcheck, resultch[0].Parent_ID);
          res.json({ 
            message: "Category,subcategory and subsubcategory details are",
            "status": true,
            "data": resull,
            "errors": []   
                });
               }




           });




          });











   */

      res.json({ 
        message: "Inventory item depends on itemid",
        "status": true,
        "data": resull,
        "errors": []   
            
            });
          
         }
     }

    else {
      res.json({ 
        message: "Please enter valid ItemID or UserID", 
        "status": false,
       
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








// view all Published item from inventory system 

async viewPublish(req, res) {
  
  try{
    
    
    let sqlvpub="select *  from  auction_feeddata where IsPublished='true'" ;

    connection.query(sqlvpub, function(errorvpub, resultvpub) {
     
      if(resultvpub.length>0){

      if (errorvpub) {
        console.log(resultvpub);
        return res.send({
        "code":400,
        "failed":{'error':errorvpub, 'con':connection_more.test}
       })
     } 

     else {
      res.json({ 
        message: "All Published Inventory details",
        "status": true,
        "data": resultvpub,
        "errors": []   
            
            });
         }
     }

    else {
      res.json({ 
        message: "There is not any published inventory items", 
        "status": false,
       
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








// view all sold item from inventory system 

async viewSold(req, res) {

  try{
    
    
    let sqlsold="select *  from  auction_feeddata where IsPublished='true' and IsSold='true' and IsDeleted= 'false'" ;

    connection.query(sqlsold, function(errorsold, resultsold) {
     
      if(resultsold.length>0){

      if (errorsold) {
        console.log(errorsold);
        return res.send({
        "code":400,
        "failed":{'error':errorsold, 'con':connection_more.test}
       })
     } 

     else {
      res.json({ 
        message: "All sold Inventory details",
        "status": true,
        "data": resultsold,
        "errors": []   
            
            });
         }
     }

    else {
      res.json({ 
        message: "There is not any sold inventory items", 
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














 // update single item from inventory list depends on itemid and auctionid
  
 async updatedataByid(req, res) {

  try{
  console.log(req.body);
  console.log(req.body.ItemID);
  let sqlupdate=`select *  from  auction_feeddata where 	AuctionID = ${req.params.id} and ItemID= '${req.body.ItemID}'` ;

  connection.query(sqlupdate, function(errss, resultsspp) {
   
    if(resultsspp.length>0){

    if (errss) {
      console.log(errss);
      return res.send({
      "code":400,
      "failed":{'error':errss, 'con':connection_more.test}
    })
   } 

   else {



    let catup=`select *  from  category where Category_ID = ${req.body.Category}`;
    
    connection.query(catup, function(errocatup, resultcatup) {

      console.log(resultcatup[0].CategoryName);

      if (errocatup) {
        console.log(errocatup);
        return res.send({
        "code":400,
        "failed":{'error':errocatup, 'con':connection_more.test}
       })
     } 

     else {

      let sqlpu = `UPDATE auction_feeddata set Itemtitle='${req.body.Title}',CategoryName='${resultcatup[0].CategoryName}',ItemDescription='${req.body.ItemDescription}', Availability='${req.body.Availability}',Usages='${req.body.Usages}',Location = '${req.body.Location}' , Miles = '${req.body.Miles}', StockNumber='${req.body.StockNumber}', Vin='${req.body.Vin}', Color = '${req.body.Color}' ,TrimColor = '${req.body.TrimColor}' ,  Price=${req.body.Price}, PriceType= '${req.body.PriceType}' ,  ModelName = '${req.body.ModelName}', Conditions = '${req.body.Conditions}'  where AuctionID = ${req.params.id} and ItemID= '${req.body.ItemID}'` ;
    
      connection.query(sqlpu, function(erros, resultts) {
      if (erros) {
        console.log(erros);
        return res.send({
        "code":400,
        "failed":{'error':erros, 'con':connection_more.test}
       })
     } 

     else{

      res.json({ 
        message: "Inventory item details updated succesfully",
        "status": true,
         "data": [],
         "errors": []   
        });
      }
   });







     }






    });



    

 }
}

  else {
    res.json({ 
      message: "Please enter valid AuctionID", 
      "status": false,
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











// Add all type of categories

async addsubCategory(req, res) {

  //console.log(req.body);

  try{
    
    /*
    const options={
      upper: true,
    }
    const s=slug(req.body.CategoryName,options);

    console.log(s);
    */

    let sqadd=`select *  from  category where 	CategoryName = '${req.body.CategoryName}'` ; 
    
    connection.query(sqadd , function(erroradd, resultadd) {

      if (erroradd) {
        res.send({
          "code":400,
          "failed":{'error':erroradd, 'con':connection_more.test}
        })
      }

      if(resultadd.length>0){

        res.json({ 
          message: "Category already exists, try with different name", 
          "status": false,
          "data": [],
          "errors": [] 
        
             });

      }

      else {

        var sqlc = "INSERT INTO `category`(`CategoryName`,`Parent_ID`,`level`) VALUES ('" + req.body.CategoryName + "','" + req.body.Parent_ID + "','" + req.body.level + "')";

        connection.query(sqlc , function(errorc, resultc) {
          if (errorc) {
            res.send({
              "code":400,
              "failed":{'error':errorc, 'con':connection_more.test}
            })
          } else {
                  res.json({ 
                  message: "Category/subcategory/subsubcategory added successfully",
                  "status": true,
                  "data": [],
                  "errors": []
                 
                  });
               }
           });
       }
 })

    /*

  
*/
   }
  catch(error){
    console.log(error);
  }

  
},











 // get category by ID  
 async getCat(req, res) {

  try{
    let sqlgetcat=`select *  from  category where Category_ID = ${req.params.id}` ; 
    
    connection.query(sqlgetcat , function(errorgetcat, resultgetcat) {

      if(resultgetcat.length>0){

      if (errorgetcat) {
        res.send({
          "code":400,
          "failed":{'error':errorgetcat, 'con':connection_more.test}
        })
      }

      else{

        res.json({ 
          message: "Category details are:",
          "status": true,
          "data": resultgetcat,
          "errors": []   
              });

      }



    }

    else{

      res.json({ 
        message: "Please Enter valid categoryID",
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














// view categry detaails by count

async viewcatCount(req, res) {

  try{
    let sqcatcount=`select CategoryName as Category, (select Category_ID from category where CategoryName=Category) as Category_ID,count(FeedID) as Total from auction_feeddata group by CategoryName order by count(FeedID) desc` ;
    connection.query(sqcatcount , function(errorcatcount, resultcatcount) {

     
     if (errorcatcount) {
        res.send({
          "code":400,
          "failed":{'error':errorcatcount, 'con':connection_more.test}
        })
      }

      else{

        res.json({ 
          message: "Category details count wise:",
          "status": true,
          "data": resultcatcount,
          "errors": []   
              });
          }

      });

  }
  catch(error){
    console.log(error);
  }
},
















// view all categories, subcategories and subsub categories //

async viewCat(req, res) {

  try{

    function getNestedChildren(arr, Parent_ID) {
    var out = []
    for (var i in arr) {
      if (arr[i].Parent_ID == Parent_ID) {
        var children = getNestedChildren(arr, arr[i].Category_ID)
  
        if (children.length) {
          arr[i].subCate = children
        }
        out.push(arr[i])
      }
    }
    return out
  }

    let sqcat=`select *  from  category` ;
    connection.query(sqcat , function(errorcat, resultcat) {

      if (errorcat) {
        res.send({
          "code":400,
          "failed":{'error':errorcat, 'con':connection_more.test}
        })
      }

      else{
         res.json({ 
           message: "Category,subcategory and subsubcategory details are",
           "status": true,
           "data": getNestedChildren(resultcat, 0),
           "errors": []   
               });
           
        console.log(getNestedChildren(resultcat, 0));
      }




    });




  }

  catch(err){
    console.log(err);
  }




},














async updateCategory(req, res) {

  try{
    console.log(req.body);
    let sqlcatup = `UPDATE category set CategoryName='${req.body.CategoryName}' where 	Category_ID = ${req.params.id}` ;
    
    connection.query(sqlcatup, function(errocatup, resultcatup) {

      

      if (errocatup) {
        res.send({
          "code":400,
          "failed":{'error':errocatup, 'con':connection_more.test}
        })
      }

      else{


        let sqqup=`select CategoryName from category where Category_ID=` + req.params.id ;
        connection.query(sqqup, function(errorup, resultsup) {

          if (errorup) {
            res.send({
              "code":400,
              "failed":{'error':errorup, 'con':connection_more.test}
            })
          }

          else{
            res.json({ 
              message: "Item Category updated successfully", 
              "status": true,
              "data": resultsup,
              "errors": [] 
            
                 });
             }

        });

        
        
         }

      });

  }
  catch(err){
    console.log(err);
  }

},








async deleteCategory(req, res) {

  try{
      
   

    const id=req.body.id;
    function delete_subcats(id) {
      let res = 'SELECT Category_ID FROM category WHERE Parent_ID = '+ id;
      connection.query(res, function(errord, resultsd) {

        if (errord) {
          console.log(errord);
          return res.send({
          "code":400,
          "failed":{'error':errord, 'con':connection_more.test}
        })
       } 

       else{

         
         if (resultsd) {
          //console.log("test");
          for (var i in resultsd){
           // console.log(resultsd[i].Category_ID);
            delete_subcats(resultsd[i].Category_ID);

          }
          
 

        }


        let resde = 'DELETE FROM category WHERE Category_ID= '+ id;
        connection.query(resde, function(errorde, resultsde) {

          if (errorde) {
            console.log(errorde);
            return res.send({
            "code":400,
            "failed":{'error':errorde, 'con':connection_more.test}
          })
         } 

       
           });


       }

 });

}


   
let rescate = 'SELECT * FROM category WHERE Category_ID  = '+ req.params.id;
connection.query(rescate, function(errorcate, resultscate) {
  //console.log(resultscate.length);
  if(resultscate.length>0){

  if (errorcate) {
    console.log(errorcate);
    return res.send({
    "code":400,
    "failed":{'error':errorcate, 'con':connection_more.test}
  })
 } 

 else{
  res.json({ 
    message: "Category deleted successfully",
    "status": true,
    "data": [],
    "errors": []   
        });
  delete_subcats(req.params.id);

 }
}

else{
  res.json({ 
    message: "Please enter valid CategoryID", 
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




















// update publish status of single item from inventory list depends on itemid and auctionid

async updatePublish(req, res) {

  try{
  
    console.log(req.body.IsPublished);
    let sqlupdatep=`select *  from  auction_feeddata where 	AuctionID = ${req.params.id} and ItemID= '${req.body.ItemID}'` ;

    connection.query(sqlupdatep, function(erro, resultsg) {
     
      if(resultsg.length>0){

      if (erro) {
        console.log(erro);
        return res.send({
        "code":400,
        "failed":{'error':erro, 'con':connection_more.test}
      })
     } 

     else {
      
      let sqlpub = `UPDATE auction_feeddata set IsPublished='${req.body.IsPublished}'  where AuctionID = ${req.params.id} and ItemID= '${req.body.ItemID}'` ;
      
      connection.query(sqlpub, function(erropub, resultpub) {
        if (erropub) {
          console.log(erropub);
          return res.send({
          "code":400,
          "failed":{'error':erropub, 'con':connection_more.test}
         })
       } 

       else{
        res.json({ 
          message: "Invenotry item publish status updated succesfully",
          "status": true,
           "data": [],
           "errors": []   
          });
        }
     });
   }
 }

    else {
      res.json({ 
        message: "Please enter valid AuctionID", 
        "status": false,
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









  async filterprice(req, res) {
    try{

      if(req.body.minprice < req.body.maxprice){
      let sqhf=`select *  from  auction_feeddata where Price >= ${req.body.minprice} and  Price <= ${req.body.maxprice}` ;

      connection.query(sqhf, function(errorfg, resultsk) {

        if(resultsk.length>0){
          if (errorfg) {
            console.log(errorfg);
            return res.send({
            "code":400,
            "failed":{'error':errorfg, 'con':connection_more.test}
          })
         } 
         else {
           
           res.json({ 
             message: "All Inventory Items are between price range",
             "status": true,
             "data": resultsk,
             "errors": []   
                 });
              }
          
        }

        else{

          res.json({ 
            message: "There is not any item in this price range", 
            "status": false,
           
            "data": [],
            "errors": [] 
          
          });

        }

   
      });


    }

    else {
      res.json({ 
        message: "Please enter min price is less then of max price",  
        "status": false,
        
        "data": [],
        "errors": [] 
      
      });

    }

    }
    catch(error){
      console.log(error);
    }





  }
  ,


  // filter inventory items by range of year  
  async filterYear(req, res) {
    try{

      if(req.body.min < req.body.max){
      let sqh=`select *  from  auction_feeddata where year >= ${req.body.min} and  year <= ${req.body.max}` ;

      connection.query(sqh, function(error, results) {

        if(results.length>0){
          if (error) {
            console.log(error);
            return res.send({
            "code":400,
            "failed":{'error':error, 'con':connection_more.test}
          })
         } 
         else {
           
           res.json({ 
             message: "All Inventory Items are between year range",
             "status": true,
             "data": results,
             "errors": []   
                 });
              }
          
        }

        else{

          res.json({ 
            message: "There is not any item in this year range", 
            "status": false,
            
            "data": [],
            "errors": [] 
          
          });

        }

   
      });


    }

    else {
      res.json({ 
        message: "Please enter min year is less then of max year",  
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
















  async filterbyModel(req, res) {

    try{
      console.log(req.body.ModelName);
      let sqt=`select *  from  auction_feeddata where ModelName= '${req.body.ModelName}'`;

        connection.query(sqt, function(error, resultsu) {
          
          if(resultsu.length>0){
            if (error) {
              console.log(error);
              return res.send({
              "code":400,
              "failed":{'error':error, 'con':connection_more.test}
            })
           } 
           else {
             
             res.json({ 
               message: "Inventory Items details with specific modelname",
               "status": true,
               "data": resultsu,
               "errors": []   
                   });
                }
            
          
              }
          else{

            res.json({ 
              message: "Please enter valid modelname",
              "status": false,
              
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









  async filterLocation(req, res) {

    try{
      console.log(req.body.Location);
      let sqt=`select *  from  auction_feeddata where Location= '${req.body.Location}'`;

        connection.query(sqt, function(error, resultsu) {
          
          if(resultsu.length>0){
            if (error) {
              console.log(error);
              return res.send({
              "code":400,
              "failed":{'error':error, 'con':connection_more.test}
            })
           } 
           else {
             
             res.json({ 
               message: "Inventory Items details with specific Location",
               "status": true,
               "data": resultsu,
               "errors": []   
                   });
                }
            
          
              }
          else{

            res.json({ 
              message: "Please enter valid Location", 
              "status": false,
              
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











  // filter item by Item Category

  async filterCategory(req, res) {

    try{
      //console.log(req.body.CategoryName);


      let sqlcatc=`select * from category where Category_ID = '${req.params.id}'`;

      connection.query(sqlcatc, function(errorcatc, resultcatc) {

        if (errorcatc) {
          console.log(errorcatc);
          return res.send({
          "code":400,
          "failed":{'error':errorcatc, 'con':connection_more.test}
        })
       } 


       else{

        let sqt=`select * from auction_feeddata where CategoryName= '${resultcatc[0].CategoryName}' and IsDeleted= 'false'`;

        connection.query(sqt, function(errort, resultsu) {
          console.log(resultsu.length);
          if(resultsu.length>0){
            if (errort) {
              console.log(errort);
              return res.send({
              "code":400,
              "failed":{'error':errort, 'con':connection_more.test}
            })
           } 
           else {
             
             res.json({ 
               message: "Inventory Items details with specific Category",
               "status": true,
               "data": resultsu,
               "errors": []   
                   });
                }
            }
          else{

            res.json({ 
              message: "There is not any item related this category", 
              "status": false,
              "data": [],
              "errors": [] 
            
          
              });
           }
       });



       }

        





      });


  
    }

    catch(error){
      console.log(error);
    }

  },






  










  // sorting data in desc.

  async sortDate(req, res) {

    try{
      console.log(req.body.data);
      let sqth=`select * from auction_feeddata order by ${req.body.data} desc`;

        connection.query(sqth, function(errp, resultop) {
        
        
          
         
            if (errp) {
              console.log(errp);
              return res.send({
              "code":400,
              "failed":{'error':errp, 'con':connection_more.test}
             })
           } 
           else {
             
             res.json({ 
               message: "Sorted Inventory Items details are",
               "status": true,
               "data": resultop,
               "errors": []   
                   });
                }
             });
          }
    catch(error){
      console.log(error);
    }




  },






   // filter item by Range of dates

   async filterDate(req, res) {

    try{
      console.log(req.body.mindate);
      console.log(req.body.maxdate);

      if(req.body.mindate <= req.body.maxdate){

      let sqt=`select * from auction_feeddata where DATE(ItemcreatedAT) >= '${req.body.mindate}' and DATE(ItemcreatedAT) <= '${req.body.maxdate}'`;

        connection.query(sqt, function(error, resultsu) {
          
          if(resultsu.length>0){
            if (error) {
              console.log(error);
              return res.send({
              "code":400,
              "failed":{'error':error, 'con':connection_more.test}
            })
           } 
           else {
             
             res.json({ 
               message: "Inventory Items details depend on the range of date",
               "status": true,
               "data": resultsu,
               "errors": [] 
                 
                   });
                }
            }
          else{

            res.json({ 
              message: "Please enter correct date", 
              "status": false,
              "data": [],
              "errors": [] 
            
                });
              }
           });
         }
      else{

        res.json({ 
          message: "Please enter min date less then compare to max date", 
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






  // Delete all Inventory details by auctionID

  async deletedataByid(req, res) {

  
    try{
 



      let sq=`select * from auction_data where AuctionID=` + req.params.id ;
      connection.query(sq, function(error, resultsr) {

       if(resultsr.length>0){

       
       let sqlld = `delete from auction_data where AuctionID= ${req.params.id}` ; 
       connection.query(sqlld, function(error, resultrt) {

             if (error) {
               res.send({
              "code":400,
               "failed":{'error':error, 'con':connection_more.test}
             })
            } 
            else {



              let sqlldp = `delete from auction_feeddata where AuctionID= ${req.params.id}` ;
              connection.query(sqlldp, function(errs, resulto) {
                if (error) {
                  res.send({
                 "code":400,
                  "failed":{'error':errs, 'con':connection_more.test}
                })
              }

              else {

                res.json({ 
                  message: "Inventory details deleted successfully",
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
            message: "please enter valid AuctionID",
             "status": false, 
             
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









   // Delete single item from Inventory details by itemId and AuctionID

async deleteitemByid(req, res) {

  try{
    console.log(req.body);
    console.log(req.body.ItemID);
    let sqldelete=`select *  from  auction_feeddata where 	AuctionID = ${req.params.id} and UserID=${req.body.UserID} and ItemID= '${req.body.ItemID}'` ;

    connection.query(sqldelete, function(errp, resultpo) {
     
      if(resultpo.length>0){

      if (errp) {
        console.log(errp);
        return res.send({
        "code":400,
        "failed":{'error':errp, 'con':connection_more.test}
      })
     } 

     else {
      
      let sqldl = `Delete from  auction_feeddata  where AuctionID = ${req.params.id} and UserID=${req.body.UserID} and ItemID= '${req.body.ItemID}'` ;
      
      connection.query(sqldl, function(errosh, resulttsj) {
        if (errosh) {
          console.log(errosh);
          return res.send({
          "code":400,
          "failed":{'error':errosh, 'con':connection_more.test}
        })
       } 

       else{
        res.json({ 
          message: "Invenotry item details deleted succesfully",
          "status": true,
           "data": [],
           "errors": []   
          });
        }
     });
   }
 }

    else {
      res.json({ 
        message: "Please enter valid AuctionID", 
        "status": false,
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


























// Upload xml file and store into database

async getData(req, res) {

  //console.log(req.body);
  console.log(req.file.filename);

  //var data=require('../uploads/xmlfiles/`req.file.filename`');
  //console.log(data);

 
  const IsPublished= "false";
  const IsSold= "false";
   
  fs.readFile(`./uploads/xmlfiles/${req.file.filename}`,function(err,data){
      if(!err) {
         
          parser.parseString(data, function(error, result) {
              if(error === null) {

                
                  
                // console.log(JSON.stringify(result.feed.item[0].images));


                 //console.log(JSON.stringify(result.feed.item[1].attributes));
                 //res.send("ok");

              
                
               
         
                 
                 
                 let sqlp=`select *  from  users where UserID=` + req.body.UserID ;

                  connection.query(sqlp, function(errord, resultss) {
                 

                    if(resultss.length>0){
                      if (error) {
                        console.log(errord);
                        res.send({
                          "code":400,
                          "failed":{'error':errord, 'con':connection_more.test}
                        })
                      } 

                      else{
                      
                        var sql = "INSERT INTO `auction_data`(`UserID`,`title`,`link`,`description`,`modified`,`customerId`,`customer`,`address1`,`address2`,`address3`,`country`,`state`,`city`,`zip`,`phone`,`email`,`companyurl`,`companylogo`) VALUES ('" + req.body.UserID + "','" + result.feed.title + "','" + result.feed.link + "','" + result.feed.description + "','" + result.feed.modified + "','" + result.feed.customerId + "','" + result.feed.customer + "','" + result.feed.address1 + "','" + result.feed.address2 + "','" + result.feed.address3 + "','" + result.feed.country + "','" + result.feed.state + "','" + result.feed.city + "','" + result.feed.zip + "','" + result.feed.phone + "','" + result.feed.email + "','" + result.feed.companyurl + "','" + result.feed.companylogo + "')";"SELECT LAST_INSERT_ID();"
                 
                  connection.query(sql, function(errorr, resultp){

                      if (errorr) {
                          console.log(errorr);
                          res.send({
                            "code":400,
                            "failed":{'error':errorr, 'con':connection_more.test}
                          })
                        } 

                        else {
                          
                          console.log(resultp.insertId);
                          

                          let queryParams = [];
                          for (var i = 0; i < result.feed.item.length; i++) {
                            const auctionid=resultp.insertId;
                            const userid=req.body.UserID;
                            const id= result.feed.item[i].id;
                            const ispublished=IsPublished;
                            const issold=IsSold;
                            const title = result.feed.item[i].title;
                            const link= result.feed.item[i].link;
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
                            const images= JSON.stringify(result.feed.item[i].images);
                            const Attributes= JSON.stringify(result.feed.item[i].attributes)
                           
                        
                            let param = [
                              auctionid,
                              userid,
                              id,
                              ispublished,
                              issold,
                              title,
                              link,
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
                              miles,
                              images,
                              Attributes
                           ];
                        
                            queryParams.push(param);
                          }
                   
                       
                       


                           

                  var sqll = "INSERT INTO `auction_feeddata`(`AuctionID`,`UserID`,`ItemID`,`IsPublished`,`IsSold`,`Itemtitle`,`Itemlink`,`ItemDescription`,`Price`,`PriceType`,`StockNumber`,`Vin`,`Manufacturer`,`Year`,`Color`,`ModelType`,`ModelTypeStyle`,`ModelName`,`TrimName`,`TrimColor`,`Conditions`,`Usages`,`Location`,`Updated`,`Miles`,`Images`,`Attributes`) VALUES ?";

                  const query = connection.query(sqll, [queryParams], function(err, resulty){
                      if (err) {
                          res.send({
                            "code":400,
                            "failed":{'error':err, 'con':connection_more.test}
                          })
                        } 
                   
                        else {
                               
                          res.json({ 
                            message: "Inventory details successfully added",
                            "status": true,
                            "data": [],
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
                        message: "Please enter valid UserID", 
                        "status": false,
                        "data": [],
                        "errors": [] 
                      
                      });
                    }
                });
             }

              else {
                  res.json({ 
                      message: "Invalid xml files", 
                      "status": false,
                      
                      "data": [],
                      "errors": [] 
                    
                    });
                }
          });
      }
      else {
        console.log(err);
          res.json({ 
               message: "Invalid xml file", 
              "status": false,
              
              "data": [],
              "errors": [] 
            
             });
          }
       })
    }
 }