/*
 * Summary:     categoryBannerServices file for handling all CATEGORY BANNER - CMS related actions.
 * Author:      Openxcell(empCode-473)
 */

/**require NPM-modules,models and constants for configuration */
const category = require("../Database/models").tbl_category;
const template_page =require("../Database/models").page_template;
const categoryBannerImages = require("../Database/models")
  .tbl_category_banner_image;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const QueryTypes = Sequelize.QueryTypes;
const constant = require("../Configs/constant");
const imageupload = require("../Middleware/multer_aws_upload");
const imageDelete = require("../Middleware/multer_aws_delete");
const db = require("../Database/models/index");
const mysql= require("mysql");
var connection_more =require('./../config/config');
var connection = mysql.createConnection(connection_more.test);

module.exports = {


  /* Add template details for page*/

  async addtemp(req, res) {

    try{
      //req.body.image=req.file.originalname;
      var data=req.body;
      if(req.files['logo']){
        data["logo"]=req.files["logo"][0].filename;
        
      }
      if(req.files['banner_image']){
        data["banner_image"]=req.files["banner_image"][0].filename;
      }

       console.log(data);
   

    
     var sql = "INSERT INTO `page_template`(`logo`,`banner_title`,`banner_subtitle`,`description`, `banner_image` ,`font`,`font_size`, `color`) VALUES ('" + data['logo'] + "','" + data.banner_title + "','" + data.banner_subtitle + "','" + data.description + "','" + data['banner_image'] + "','" + data.font + "','" + data.font_size + "','" + data.color + "')";
 
    						 connection.query(sql, function(error, result) {
    							 
                  if (error) {
                    res.send({
                      "code":400,
                      "failed":{'error':error, 'con':connection_more.test}
                    })
                  } else {
                     res.json({ 
                       message: "Template details successfully added",
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












  // gettemplate by id 
  async getTemplate(req, res) {

    try{
      var sqlte = "select * from page_template where id =" + req.params.id;
           
          
      connection.query(sqlte, function(errorte, resultte) {

        if(resultte.length>0){

          if (errorte) {

            res.send({
               "code":400,
                "failed":{'error':errorte, 'con':connection_more.test}
              })
             }

             else{

              res.json({ 
                message: "Template details are",
                "status": true, 
                "data": resultte,
                "errors": [] 
     
                  });


             }


        }
        else{

          res.json({ 
            message: "please enter valid template id",
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






  /* View all Template details */
  async viewTemplate(req, res) {

    try{
     
      var sql = "select * from page_template";
           
          
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









/* Update Template details */

  async editTemplate(req, res) {

    try{
      var data=req.body;
      if(req.files['logo']){
        data["logo"]=req.files["logo"][0].filename;
        
      }
      if(req.files['banner_image']){
        data["banner_image"]=req.files["banner_image"][0].filename;
      }

     

      console.log(data);
      console.log(req.params.id);

      let sqt=`select * from page_template where id=` + req.params.id;
      connection.query(sqt, function(error, resultpps) {

       

        if(resultpps.length>0){
       
          let sqlpu = `UPDATE page_template set  logo = '${data['logo']}', banner_title = '${data.banner_title}', banner_subtitle = '${data.banner_subtitle}',  description = '${data.description}',  banner_image = '${data['banner_image']}',  font = '${data.font}', font_size = '${data.font_size}', color = '${data.color}' where id=` + req.params.id ;
          connection.query(sqlpu , function(error, resultts) {
  
     
                if (error) {
                  res.send({
                  "code":400,
                  "failed":{'error':error, 'con':connection_more.test}
                })
               } 
               else {
                 res.json({ 
                  message: "Template details updated succesfully",
                  "status": true,
                   "data": [],
                   "errors": []   
                  });
                 }
               });
             }
            else{

              res.json({ 
                message: "please enter valid template id",
                "status": false, 
                "data": [],
                "errors": [] 
     
                  });
              }
         });
     // res.send("ok");

    }
    catch(error){
      console.log(error);
    }
 },











  /* Add Category Banner*/
  async addCategoryBanner(req, res) {
    try {
      let { files } = req;
      let categoryId = req.params.categoryId;

      let bannerList = [];
      if (files && files.length > 0) {
        await Promise.all(
          await files.map(async (banner) => {
            await imageupload(
              banner,
              constant.AWSS3PROJECTFOLDER +
                constant.AWSS3CATEGORYBANNERIMAGEFOLDER +
                categoryId +
                "_" +
                banner.originalname
            );
            bannerList.push({
              categoryId: categoryId,
              name: categoryId + "_" + banner.originalname,
            });
            return 1;
          })
        );
        await categoryBannerImages.bulkCreate(bannerList);
      }

      return 1;
    } catch (error) {
      console.log("addBanner---" + error);
    }
  },

  /* Delete Category Banner*/
  async deleteCategoryBanner(req, res) {
    try {
      let bannerList = await categoryBannerImages.findAll({
        where: {
          categoryId: req.params.categoryId,
        },
        attributes: ["name"],
      });

      await Promise.all(
        await bannerList.map(async (banner) => {
          await imageDelete(
            constant.AWSS3PROJECTFOLDER +
              constant.AWSS3CATEGORYBANNERIMAGEFOLDER +
              banner.name
          );
          return 1;
        })
      );

      await categoryBannerImages.destroy({
        where: { categoryId: req.params.categoryId },
      });
      return 1;
    } catch (error) {
      console.log("deleteBanner---" + error);
    }
  },

  /* Get Category List*/
  async getCategoryList() {
    let cat_list = await category.findAll({
      where: {
        isActive: 1,
      },
      attributes: ["categoryId", "name"],
    });
    return cat_list;
  },

  /* Update status of Category Banner*/
  async updateBannerStatus(req, res) {
    try {
      // await categoryBannerImages.update(
      //   {
      //     isActive: req.body.isActive,
      //   },
      //   {
      //     where: {
      //       categoryId: req.body.categoryId,
      //     },
      //   }
      // );

      await category.update(
        {
          bannerStatus: req.body.isActive,
        },
        {
          where: {
            categoryId: req.body.categoryId,
          },
        }
      );
      return 1;
    } catch (error) {
      console.log("updateBannerStatus---" + error);
    }
  },

  /* View Category Banner*/
  async viewBanner(req, res) {
    try {
      let bannerList = await categoryBannerImages.findAll({
        where: {
          categoryId: req.params.categoryId,
        },
        attributes: ["categoryBannerImageId", "name"],
      });

      let categoryName = await category.findOne({
        where: {
          categoryId: req.params.categoryId,
        },
        attributes: ["name", "categoryId"],
      });

      let list = await bannerList.map((banner) => {
        return {
          categoryBannerImageId: banner.categoryBannerImageId,
          name:
            "https://gunsbid-dev.s3-us-west-2.amazonaws.com/" +
            constant.AWSS3PROJECTFOLDER +
            constant.AWSS3CATEGORYBANNERIMAGEFOLDER +
            banner.name,
        };
      });
      return {
        categoryName: categoryName.name,
        categoryId: categoryName.categoryId,
        banner: list,
      };
    } catch (error) {
      console.log("viewBanner---" + error);
    }
  },

  /* Update Category Banner*/
  async updateBanner(req, res) {
    try {
      let { files } = req;
      let banners = req.body.banners ? JSON.parse(req.body.banners) : null;
      if (banners && banners.length > 0) {
        let bannerList = await categoryBannerImages.findAll({
          where: {
            categoryBannerImageId: {
              [Op.in]: banners,
            },
          },
          attributes: ["name"],
        });

        await banners.forEach(async (banner) => {
          await categoryBannerImages.destroy({
            where: {
              categoryBannerImageId: banner,
            },
          });
        });

        await Promise.all(
          await bannerList.map(async (banner) => {
            await imageDelete(
              constant.AWSS3PROJECTFOLDER +
                constant.AWSS3CATEGORYBANNERIMAGEFOLDER +
                banner.name
            );
            return 1;
          })
        );
      }

      if (files && files.length > 0) {
        let bannerList = [];
        await Promise.all(
          await files.map(async (banner) => {
            await imageupload(
              banner,
              constant.AWSS3PROJECTFOLDER +
                constant.AWSS3CATEGORYBANNERIMAGEFOLDER +
                req.params.categoryId +
                "_" +
                banner.originalname
            );
            bannerList.push({
              categoryId: req.params.categoryId,
              name: req.params.categoryId + "_" + banner.originalname,
            });
            return 1;
          })
        );
        await categoryBannerImages.bulkCreate(bannerList);
      }
      return 1;
    } catch (error) {
      console.log("updateBanner---" + error);
    }
  },

  /* List Category Banner*/
  async listBanner(req, res) {
    let { sortBy, order, search, page } = req.body;
    const offset = page ? (page - 1) * constant.LIMIT : 0;
    const limit = constant.LIMIT;
    search = search === undefined ? "" : search;
    order = order === undefined ? "ASC" : order;
    sortBy = sortBy === undefined ? "createdAt" : sortBy;

    let cat_list = await db.sequelize.query(
      `SELECT DISTINCT category.categoryId,category.name,category.bannerStatus FROM tbl_categories AS category RIGHT JOIN tbl_category_banner_images AS banners ON category.categoryId = banners.categoryId WHERE banners.categoryId AND category.name LIKE '%${search}%' ORDER BY category.${sortBy} ${order} LIMIT ${offset}, ${limit}`,
      { type: QueryTypes.SELECT }
    );

    await Promise.all(
      await cat_list.map(async (result) => {
        let createdAt = await categoryBannerImages.max("createdAt", {
          where: {
            categoryId: result.categoryId,
          },
        });

        result.createdAt = createdAt;

        return result;
      })
    );

    const count = await categoryBannerImages.count({
      distinct: true,
      col: "categoryId",
      include: {
        model: category,
        as: "category",
        where: {
          name: {
            [Op.like]: `%${search}%`,
          },
        },
      },
    });
    // let searchObj =
    //   req.body.isActive !== undefined
    //     ? {
    //         isActive: req.body.isActive,
    //       }
    //     : {
    //         [Op.or]: [
    //           {
    //             isActive: true,
    //           },
    //           {
    //             isActive: false,
    //           },
    //         ],
    //       };

    // let cat_list = await category.findAndCountAll({
    //   where: {
    //     name: {
    //       [Op.like]: `%${search}%`,
    //     },
    //   },
    //   order: [[`${sortBy}`, `${order}`]],
    //   attributes: ["categoryId", "name"],
    //   subQuery: false,
    //   distinct: true,
    //   col: "categoryId",
    //   offset: offset,
    //   limit: limit,
    //   logging: console.log,
    //   include: [
    //     {
    //       model: categoryBannerImages,
    //       where: searchObj,
    //       as: "categoryBannerImage",
    //       required: true,
    //       subQuery: false,
    //       attributes: [
    //         "categoryBannerImageId",
    //         "name",
    //         "isActive",
    //         "createdAt",
    //         "updatedAt",
    //       ],
    //     },
    //   ],
    // });

    // await cat_list.rows.forEach(async (cat) => {
    //   await cat.categoryBannerImage.forEach((banner) => {
    //     cat.isActive = banner.isActive;
    //     banner.name = `https://gunsbid-dev.s3-us-west-2.amazonaws.com/GunsBidCMS/category-banner-image/${banner.name}`;
    //   });
    // });
    return { list: cat_list, count: count };
  },
};
