/*
 * Summary:     itemService file for handling all item - CMS related actions.
 * Author:      Openxcell(empCode-473)
 */

/**require NPM-modules,models and constants for configuration */
const item = require("../Database/models").tbl_item;
const category = require("../Database/models").tbl_category;
const layout = require("../Database/models").tbl_layout;
const user = require("../Database/models").tbl_user;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const constant = require("../Configs/constant");
const imageupload = require("../Middleware/multer_aws_upload");
const imageDelete = require("../Middleware/multer_aws_delete");

var connection_more =require('./../config/config');
var mysql= require('mysql');
var connection = mysql.createConnection(connection_more.test);

module.exports = {


/*
  async addProduct(req, res) {
    var d=req.body;
    console.log(d);
   
    console.log(req.files[0].filename);

    

    if(req.files){
      var path='';
      req.files.forEach(function(files,index,arr){
        path=path+files.filename+',';

      });
      path=path.substring(0,path.lastIndexOf(","));
     
    }
    var r=path.split(',');
    //console.log(r);
    //console.log(r[0]);

    try{
  
      //var d=req.body;
      //console.log(d);
      const c="false";


      let sqlv=`select * from users where UserID=` + d.UserID ;

      connection.query(sqlv, function(error, resultt) {

        if (error) {

          res.send({
             "code":400,
              "failed":{'error':error, 'con':connection_more.test}
            })
           }
           
           if(resultt.length>0){

            var sql = "INSERT INTO `product`(`Product_Name`,`Description`,`Price`,`PriceType`,`StockNumber`, `Vin` ,`Manufacturer`,`Year`, `Color`,`ModelType`,`ModelTypeStyle`,`ModelName`,`TrimName`,`TrimColor`,`Conditions`,`Usages`,`Location`,`Updated`,`Miles`,`image`,`isBidding`,`UserID`) VALUES ('" + d.Product_Name + "','" + d.Description + "','" + d.Price + "','" + d.PriceType + "','" + d.StockNumber + "','" + d.Vin + "','" + d.Manufacturer+ "','" + d.Year + "','" + d.Color + "','" + d.ModelType + "','" + d.ModelTypeStyle + "','" + d.ModelName + "','" + d.TrimName + "','" + d.TrimColor + "','" + d.Conditions + "','" + d.Usages + "','" + d.Location + "','" + d.Updated + "','" + d.Miles + "','" + r + "','" + c + "','" + d.UserID + "')";
 
            connection.query(sql, function(error, result) {
              if (error) {
                res.send({
                  "code":400,
                  "failed":{'error':error, 'con':connection_more.test}
                })
              } else {
                      res.json({ 
                      message: "Product details successfully added",
                      "status": true,
                      "data": [],
                      "errors": []
                     
                     });
                
                   }
              });
           }

           else{
            res.json({ 
              message: "PLease Enter Valid user id",
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

  */



  async addProduct(req, res) {
    var d=req.body;
    console.log(d);
    console.log(req);
   
    console.log(req.files[0].filename);

    

    if(req.files){
      /*
      var p=[];
      req.files.forEach(function(files,index,arr){
        p=p+files.filename+',';

      });
      */

      var path=[];
      req.files.forEach(function(files,index,arr){
        //path[index]=path+files.filename;
        path.push(files.filename);

      });
      //path=path.substring(0,path.lastIndexOf(","));
     
    }
    //var r=path.split(',');
    var r=JSON.stringify([{imgurl:path}]);
    console.log(r);


    let len = 20, str = "";
    while(str.length < len) str += Math.random().toString(36).substr(2);
    str = str.substr(0, len);
    //console.log(str);
    console.log(r);
    //console.log(r[0]);

    try{

 
  

      const c="false";
      const IsPublished= "false";
      const IsSold= "false";

      let sqlv=`select * from users where UserID=` + d.UserID ;

      connection.query(sqlv, function(error, resultt) {

        if (error) {

          res.send({
             "code":400,
              "failed":{'error':error, 'con':connection_more.test}
            })
           }
           
           if(resultt.length>0){


            
            //var sqlauction = "INSERT INTO `auction_data`(`UserID`,`title`,`link`,`description`,`modified`,`customerId`,`customer`,`address1`,`address2`,`address3`,`country`,`state`,`city`,`zip`,`phone`,`email`,`companyurl`,`companylogo`) VALUES ('" + req.body.UserID + "','" + req.body.title  + "','" + req.body.link + "','" + req.body.description + "','" + req.body.modified  + "','" + req.body.customerId + "','" + req.body.customer  + "','" + req.body.address1  + "','" + req.body.address2  + "','" + req.body.address3  + "','" + req.body.country  + "','" + req.body.state  + "','" + req.body.city  + "','" + req.body.zip  + "','" + req.body.phone  + "','" + req.body.email  + "','" + req.body.companyurl  + "','" + req.body.companylogo  + "')";"SELECT LAST_INSERT_ID();"
             
            var sqlauction="INSERT INTO `auction_data`(`UserID`) values ('" + req.body.UserID + "')";"SELECT LAST_INSERT_ID();"
            connection.query(sqlauction, function(errorauction, resultauction){

             // var sql = "INSERT INTO `product`(`Product_Name`,`Description`,`Price`,`PriceType`,`StockNumber`, `Vin` ,`Manufacturer`,`Year`, `Color`,`ModelType`,`ModelTypeStyle`,`ModelName`,`TrimName`,`TrimColor`,`Conditions`,`Usages`,`Location`,`Updated`,`Miles`,`image`,`isBidding`,`UserID`) VALUES ('" + d.Product_Name + "','" + d.Description + "','" + d.Price + "','" + d.PriceType + "','" + d.StockNumber + "','" + d.Vin + "','" + d.Manufacturer+ "','" + d.Year + "','" + d.Color + "','" + d.ModelType + "','" + d.ModelTypeStyle + "','" + d.ModelName + "','" + d.TrimName + "','" + d.TrimColor + "','" + d.Conditions + "','" + d.Usages + "','" + d.Location + "','" + d.Updated + "','" + d.Miles + "','" + r + "','" + c + "','" + d.UserID + "')";
 
            
             if (errorauction) {
              console.log(errorauction);
              res.send({
                "code":400,
                "failed":{'error':errorauction, 'con':connection_more.test}
              })
            } 

            else{



              
        let catup=`select *  from  category where Category_ID = ${req.body.Category}`;
        
        connection.query(catup, function(errocatup, resultcatup) {

          if (errocatup) {
            res.send({
              "code":400,
              "failed":{'error':errocatup, 'con':connection_more.test}
            })
          } 

          else{


            var sql= "INSERT INTO `auction_feeddata`(`AuctionID`,`UserID`,`ItemID`,`CategoryName`,`Availability`,`IsPublished`,`IsSold`,`Itemtitle`,`Itemlink`,`ItemDescription`,`Price`,`PriceType`,`StockNumber`,`Vin`,`Manufacturer`,`Year`,`Color`,`ModelType`,`ModelTypeStyle`,`ModelName`,`TrimName`,`TrimColor`,`Conditions`,`Usages`,`Location`,`Updated`,`Miles`,`Images`) VALUES ('" + resultauction.insertId + "','" + req.body.UserID  + "','" + str + "','" + resultcatup[0].CategoryName + "','" + req.body.Availability  + "','" + IsPublished + "','" + IsSold  + "','" + req.body.Itemtitle + "','" + req.body.Itemlink  + "','" + req.body.ItemDescription + "','" + req.body.Price  + "','" + req.body.PriceType  + "','" + req.body.StockNumber  + "','" + req.body.Vin  + "','" + req.body.Manufacturer + "','" + req.body.Year  + "','" + req.body.Color  + "','" + req.body.ModelType  + "','" + req.body.ModelTypeStyle  + "','" + req.body.ModelName  + "','" + req.body.TrimName + "','" + req.body.TrimColor  + "','" + req.body.Conditions  + "','" + req.body.Usages  + "','" + req.body.Location  + "','" + req.body.Updated  + "','" + req.body.Miles + "','" +  r  + "')";
             
            connection.query(sql, function(error, result) {
              if (error) {
                res.send({
                  "code":400,
                  "failed":{'error':error, 'con':connection_more.test}
                })
              } else {
                      res.json({ 
                      message: "Product details successfully added",
                      "status": true,
                      "data": [],
                      "errors": []
                     
                     });
                
                   }
              });




          }


        });


          
              }  



            });




    
           }

           else{
            res.json({ 
              message: "PLease Enter Valid user id",
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






  

















  async viewProducts(req, res) {

    try{
      var sql = "select * from product";
           
          
      connection.query(sql, function(error, results) {
            //results.image=results.image.split(',');
            //console.log(results[0].image);

          if (error) {
            

              res.send({
                 "code":400,
                  "failed":{'error':error, 'con':connection_more.test}
                })
               }


           else {

              return res.json({

                  message: "All Product details",
                  "status": true,
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









  async viewproductByid(req, res) {
    try{
     

      let id=req.params.id;
      console.log(id);

      if (id){

       let sqlv=`select * from product where Product_id=` + req.params.id ;

      connection.query(sqlv, function(error, resultt) {
          
       if (error) {
       res.send({
         "code":400,
          "failed":{'error':error, 'con':connection_more.test}
        })
       }

       if(resultt.length>0){

          resultt[0].image=resultt[0].image.split(',');

          console.log(resultt);
          res.json({

               message: "Single Product details", 
              "status": true,
              "data": resultt,
              "errors": []
          
          });
       }
       
       else
        {
          res.json({ 

            message: "PLease Enter Valid productid", 
            "status": false,
            "data": [],
            "errors": [] 
          
          });
          
          }
        });
      }
       else{

        res.json({ 
           
          message: "PLease provide productid",
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












  async updateproductByid(req, res) {

    try{


      var d=req.body;
      console.log(d);
      console.log(d.Product_Name);


     
  
      let sqt=`select * from product where Product_id=` + req.params.id ;
      connection.query(sqt, function(error, resultps) {
       
        if(resultps.length>0){
         
          let sqlpu = `UPDATE product set Product_Name = '${d.Product_Name}',Description = '${d.Description}',Price = '${d.Price}',PriceType = '${d.PriceType}',StockNumber = '${d.StockNumber}',Vin = '${d.Vin}',Manufacturer = '${d.Manufacturer}',Year = '${d.Year}',Color = '${d.Color}',ModelType = '${d.ModelType}',ModelTypeStyle = '${d.ModelTypeStyle}',ModelName = '${d.ModelName}',TrimName = '${d.TrimName}',TrimColor = '${d.TrimColor}',Conditions = '${d.Conditions}',Usages = '${d.Usages}',Location = '${d.Location}',Updated = '${d.Updated}',Miles = '${d.Miles}'   where Product_id=` + req.params.id;
          connection.query(sqlpu , function(error, resultts) {
  
     
                if (error) {
                  res.send({
                  "code":400,
                  "failed":{'error':error, 'con':connection_more.test}
                })
               } 
               else {
                 res.json({ 

                  message: "Product details updated succesfully",
                  "status": true,
                   "data": [],
                   "errors": []   
                  });
                 }
               });
            }
          else{
  
           return res.json({ 

             message: "please enter valid Product id",
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












  async deleteProduct(req, res) {

    /*
    let len = 20, str = "";
    while(str.length < len) str += Math.random().toString(36).substr(2);
    str = str.substr(0, len);
    console.log(str);
    */
    
    try{
      
      let sq=`select * from product where Product_id=` + req.params.id ;
      connection.query(sq, function(error, results) {

       if(results.length>0){

       
       let sqlld = `delete from product where Product_id =` + req.params.id ;
       connection.query(sqlld, function(error, result) {

             if (error) {
               res.send({
              "code":400,
               "failed":{'error':error, 'con':connection_more.test}
             })
            } else {
             res.json({ 
               message: "Product details succesfully deleted", 
               "status": true,
               "data": [],
               "errors": [] 
             
             });
             }
            });
         }
         else{
           res.json({ 
            message: "please enter valid product id",
            "status": false, 
            "data": [],
            "errors": [] 
           
           });
         }
        });

    }
    catch(error){
      console.log(error)
    }


  },




























  /* Add Item*/
  async addItem(req, res) {
    let addItem = await item.create({
      name: req.body.name,
      image: null,
      price: req.body.price,
      bidCount: req.body.bidCount,
      availability: req.body.availability,
      quantity: req.body.quantity,
      categoryId: req.body.categoryId,
      ratingCount: req.body.availability,
      sellerId: req.body.sellerId,
      manufactureId: req.body.manufactureId,
      itemDescription: req.body.itemDescription,
      itemCharcteristics: req.body.itemCharcteristics
    });
    await item.update(
      {
        image: addItem.itemId + "_" + req.file.originalname
      },
      {
        where: {
          itemId: addItem.itemId
        }
      }
    );
    await imageupload(
      req.file,
      "GunsBidCMS/item/" + addItem.itemId + "_" + req.file.originalname
    );
    return addItem;
  },

  /* Delete Item*/
  async deleteItem(req, res) {
    let findItem = await item.findOne({
      where: {
        itemId: req.body.itemId
      }
    });
    await imageDelete("GunsBidCMS/item/" + findItem.dataValues.image);
    return await item.destroy({
      where: {
        itemId: req.body.itemId
      }
    });
  },






  /* View Item*/
  async getItemById(req, res) {
    let getItem = await item.findOne({
      where: {
        itemId: req.params.itemId
      },
      attributes: [
        "itemId",
        "name",
        "image",
        "price",
        "bidCount",
        "availability",
        "quantity",
        "ratingCount",
        "itemDescription",
        "itemCharacteristics",
        "isActive"
      ],
      include: [
        {
          model: category,
          attributes: [
            "categoryId",
            "name",
            "parentCategoryId",
            "mainCategoryId",
            "layoutId",
            "position"
          ],
          as: "category",
          include: [
            {
              model: category,
              attributes: ["categoryId", "name"],
              as: "parentCategory"
            },
            {
              model: category,
              attributes: ["categoryId", "name"],
              as: "mainCategory"
            },
            {
              model: layout,
              attributes: ["layoutId", "name", "noOfImages"],
              as: "layout"
            }
          ]
        },
        {
          model: user,
          attributes: ["userId", "userName", "email", "profileImage"],
          as: "seller"
        },
        {
          model: user,
          attributes: ["userId", "userName", "email", "profileImage"],
          as: "manufacturer"
        }
      ]
    });
    getItem.dataValues.image = `https://gunsbid-dev.s3-us-west-2.amazonaws.com/GunsBidCMS/item/${getItem.dataValues.image}`;
    return getItem;
  },

  /* Update Item*/
  async updateItem(req, res) {
    let findItem = await item.findOne({
      where: {
        itemId: req.body.itemId
      }
    });
    if (req.file) {
      //delete old image
      await imageDelete("GunsBidCMS/item/" + findItem.dataValues.image);
      //upload new image
      await item.update(
        {
          image: findItem.itemId + "_" + req.file.originalname
        },
        {
          where: {
            itemId: findItem.itemId
          }
        }
      );
      await imageupload(
        req.file,
        "GunsBidCMS/item/" + findItem.itemId + "_" + req.file.originalname
      );
    }
    return await item.update(
      {
        name: req.body.name && req.body.name,
        price: req.body.price && req.body.price,
        bidCount: req.body.bidCount && req.body.bidCount,
        availability: req.body.availability && req.body.availability,
        quantity: req.body.quantity && req.body.quantity,
        categoryId: req.body.categoryId && req.body.category,
        ratingCount: req.body.availability && req.body.ratingCount,
        sellerId: req.body.sellerId && req.body.sellerId,
        manufactureId: req.body.manufactureId && req.body.manufactureId,
        itemDescription: req.body.itemDescription && req.body.itemDescription,
        itemCharcteristics: req.body.itemCharcteristics && req.body.itemCharcteristics
      },
      {
        where: {
          itemId: req.body.itemId
        }
      }
    );
  },

   /* List Item*/
   async listItem(req, res) {
    let { sortBy, order, search, page } = req.body;
    const offset = (page - 1) * constant.LIMIT;
    const limit = constant.LIMIT;
    let searchObj;
    search = search === undefined ? "" : search;
    order = order === undefined ? "ASC" : order;
    sortBy = sortBy === undefined ? "createdAt" : sortBy;
    searchObj = {
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${search}%`
            }
          },
          {
            itemCharacteristics: {
              [Op.like]: `%${search}%`
            }
          },
          {
            itemDescription: {
              [Op.like]: `%${search}%`
            }
          }
        ]
      }
    };
    if (req.body.isActive === "true") {
      searchObj.where.isActive = true;
    } else if (req.body.isActive === "false") {
      searchObj.where.isActive = false;
    }
    let list_item = await item.findAndCountAll({
      where: searchObj.where,
      logging: console.log,
      subQuery: false,
      order: [[Sequelize.literal(`${sortBy}`), `${order}`]],
      attributes: [
        "itemId",
        "name",
        "image",
        "price",
        "bidCount",
        "availability",
        "quantity",
        "ratingCount",
        "itemDescription",
        "itemCharacteristics",
        "isActive",
        "createdAt"
      ],
      include: [
        {
          model: category,
          attributes: [
            "categoryId",
            "name",
            "parentCategoryId",
            "mainCategoryId",
            "layoutId",
            "position"
          ],
          as: "category",
          include: [
            {
              model: category,
              attributes: ["categoryId", "name"],
              as: "parentCategory"
            },
            {
              model: category,
              attributes: ["categoryId", "name"],
              as: "mainCategory"
            },
            {
              model: layout,
              attributes: ["layoutId", "name", "noOfImages"],
              as: "layout"
            }
          ]
        },
        {
          model: user,
          attributes: ["userId", "userName", "email", "profileImage"],
          as: "seller"
        },
        {
          model: user,
          attributes: ["userId", "userName", "email", "profileImage"],
          as: "manufacturer"
        }
      ],
      offset: offset,
      limit: limit
    });
    list_item.rows.forEach(result => {
      // delete result.dataValues.category_image;
      result.dataValues.image = `https://gunsbid-dev.s3-us-west-2.amazonaws.com/GunsBidCMS/item/${result.dataValues.image}`;
    });
    list_item.total_records = list_item.count;
    delete list_item.count;
    return list_item;
  },

  /* Change Status of Item*/
  async updateItemStatus(req, res) {
    //status = true/false
    return await item.update(
      {
        isActive: req.body.isActive
      },
      {
        where: {
          itemId: req.body.itemId 
        }
      }
    );
  },








  


  






  async csvUpload(req, res) {
    /*
    console.log(req.body)

    try{
     /*
     csvToDb(__dirname + '/uploads/csv' + req.file.filename){
      let stream = fs.createReadStream(__dirname + '/uploads/csv' + req.file.filename)
      let collectionCsv = []
      let csvFileStream = csv
        .parse()
        .on('data', function (data) {
          collectionCsv.push(data)
        })
        .on('end', function () {
          collectionCsv.shift()
          db.connect((error) => {
            if (error) {
              console.error(error)
            } else {
              let query = 'INSERT INTO uploadcsv (id, name, email) VALUES ?'
              db.query(query, [collectionCsv], (error, res) => {
                console.log(error || res)
              })
            }
          })
          fs.unlinkSync(csvUrl)
        })
      stream.pipe(csvFileStream)

     }
     res.json({
     msg: 'File successfully inserted!',
     file: req.file,
  })

      res.send("ok");

    }
    catch(error){
      console.log(error);
    }
    */

  },



  




};
