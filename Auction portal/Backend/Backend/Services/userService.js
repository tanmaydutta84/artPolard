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

  /*register user */
   
  async registeruser(req, res) {
 
  
    const password = req.body.password;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    const DA="pending";
    const v="NULL";
    

    if (req.body.Business_type===""){
      req.body.Business_type="NULL";
    }

                                
    
    let email = req.body.email;
    var userss={
      "firstName":req.body.firstName,
      "lastName":req.body.lastName,
      "phone":req.body.phone,
      "company" :req.body.company,
      "Business_type": req.body.Business_type,
      //"Service_type" : req.body.Service_type,
      "Website": req.body.Website,
      "Address1": req.body.Address1,
      "Address2": req.body.Address2,
      "city": req.body.city,
      "state":req.body.state,
      "postalcode":req.body.postalcode,
      "country":req.body.country,
      "email":req.body.email,
      "password":encryptedPassword,
      "Dealer_Account" : DA,
      "logo" : v,
      //"Previous_Data" : v
      "Inventory_Type" : req.body.Inventory_Type

      
      
      
  }

connection.query('SELECT * FROM users WHERE email = ? ', [email], function(error, rst, fields) {

  if(rst.length==0){

  connection.query('INSERT INTO users SET ?',userss, function (error, results, fields) {
    if (error) {
      res.send({
        "status": false,
        "data": [],
        "code":400,
        "failed":{'error':error, 'con':connection_more.test}
      })
    } else {
      
      res.json({ 
        message: "Registration successfully completed",
        "status": true,
        "data": [],
        "errors": []   
       });
      }
  });

    }
    else{
      res.json({ 
        message: "EmailId already exists",
        "status": false,
        "data": [],
        "errors": []   
       });

    }

 });
 },

 

 



    
  /*login User*/
 
  async loginuser(req, res) {
   

    let email = req.body.email;
    let password = req.body.password;
    let id=req.body.id;
    let Business_type=req.body.Business_type;
      console.log(req.body);
  
      if (email && Business_type) {
       
        connection.query('SELECT * FROM users WHERE email = ? and Business_type= ?', [email,Business_type], function(error, results, fields) {
        
          if (error) throw error;
       
        if(results.length>0){

          if(results[0].Dealer_Account=="Activate"){
          
        bcrypt.compare(password, results[0].password, function(err, isMatch) {
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
            console.log(results[0].UserID);
           
             
             
            const token = jsonwebtoken.sign({ id : results[0].UserID}, "jsonwebtokenfordemotest");
            return res
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
                           userid : results[0].UserID,
                           Business_type : results[0].Business_type,
                           Inventory_Type : results[0].Inventory_Type,
                           firstName : results[0].firstName,
                           lastName : results[0].lastName,
                           logo : results[0].logo

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
        
       else {
              

              res.json({ 
                message: "Please enter all details",
                "status": false,
                "data": [],
                "errors": []   
               });
              res.end();
            }
  
        },








    /* logout User */

    async logoutuser(req, res) {

     res.clearCookie("access_token").status(200).json({

            message: "Successfully logged out",
            "status": true,
            "data": [],
            "errors": []  
    
     });
 },







 /* update status */
 async updateStatus(req, res) {
  try{
    var d=req.body;
    console.log(d);
   

    let sqt=`select * from users where 	UserID=` + req.params.id;
    connection.query(sqt, function(error, resultps) {
     
      if(resultps.length>0){
       
        let sqlpu = `UPDATE users set  Dealer_Account = '${d.Dealer_Account}'  where UserID=` + req.params.id ;
        connection.query(sqlpu , function(error, resultts) {

   
              if (error) {
                res.send({
                "code":400,
                "failed":{'error':error, 'con':connection_more.test}
              })
             } 
             else {
               res.json({ 
                "status": true,
                 message: "User status updated succesfully",
                 "data": [],
                 "errors": []   
                });
               }
             });
          }
        else{

         return res.json({ 
           "status": false, 
           message: "please enter valid Customer Service id",
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








 /* upload previous data*/

 async uploadpreviousData(req, res) {

  try{
    
    console.log(req.params.id);
 
    

    let sq=`select * from users where UserID=` + req.params.id ;
    connection.query(sq, function(error, results) {
      
      
      if(results.length>0){
        
       
   let sqlu = `UPDATE users set  Previous_Data = '${req.file.filename}'  where UserID=` + req.params.id;
   connection.query(sqlu , function(error, result) {

    
     
     if (error) {
       return res.send({
       "code":400,
       "failed":{'error':error, 'con':connection_more.test}
     })
    } 
    else {
      
      res.json({ 
        message: "You have successfully updated previous data",
        "status": true,
        "data": [],
        "errors": []   
            });
         }
     });
   }

      else{
       
       return res.json({ 
              
        "status": false,
        message: "PLease Enter Valid user id", 
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

















  
/*
 async forgotpass(req, res) {
   
  try{
    let email=req.body.email;

    if (email) {
       
      connection.query('SELECT * FROM users WHERE email = ? ', [email], function(error, results, fields) {
        if (error) throw error;
       
        if(results.length>0){

          var token = randtoken.generate(20);
 
          sendEmail(email, token);

          res.send("valid");



        }

        else 
        {
          res.json({ 
            message: "emailid is not exists",
            "status": false,
            "data": [],
            "errors": []   
           });
    

        }
         



      })
   
    }

    else {
      res.json({ 
        message: "Please enter emailid",
        "status": false,
        "data": [],
        "errors": []   
       });

    }

  }
  catch(err){
    console.log(err);
  }


 },


*/




 // Change  password  //
 async changepassword(req, res) {
 
 
    try{
      console.log(req.body);
      let id=req.body.UserID;
      //let oldpassword=req.body.Old_Password;
      let newpassword=req.body.New_Password;
      let confirmpassword=req.body.Confirm_Password;
      const pass=await bcrypt.hash(newpassword, saltRounds);
      console.log(pass);
      console.log(req.cookies.access_token);
      console.log(req.userId);
     
      console.log(parseInt(id));

      
      

      // validate new password and confirmpassword are same or not //
      if(newpassword===confirmpassword ){

        
              //validate id is valid or not //
        var sqll = `select * from users where UserID=` + id ;
 
        connection.query(sqll, function(error, result) {
  
          if (error) {
            res.send({
              "code":400,
               "failed":{'error':error, 'con':connection_more.test}
             })
            }
            
            // 
            if(result.length>0 && req.userId===parseInt(id)){
                
                  
                  // oldpassword and password from database with respect to usedid checked//
                 
      
                  
                      // update bcrypt password //
                      let sqlu = `UPDATE users set  password = '${pass}'  where UserID=` + req.body.UserID ;
                      connection.query(sqlu , function(error, result) {
      
                        if (error) {
                          res.send({
                          "code":400,
                          "failed":{'error':error, 'con':connection_more.test}
                        })
                       } else {
                              res.json({ 
                               "status": true,
                                message: "You have successfully updated your password",
                                "data": [],
                                "errors": []   
                               
                               
                               });
                             }
                         });
                        }
              
      else {
              res.json({ 
              
                "status": false,
                message: "PLease Enter Valid user id", 
                "data": [],
                "errors": [] 
              
              });
            }
        });

          
      


    

      }

      else {
        res.json({ 
              
          "status": false,
          message: "Password and confirmpassword are not matched!", 
          "data": [],
          "errors": [] 
        
           });

       }

    }
    catch(error){
      console.log(error);
    }
  
},








  /* Delete User*/


  /* View User*/
  async getUserById(req, res) {
    let getUser = await user.findOne({
      where: {
        userId: req.params.userId,
      },
      attributes: [
        "userId",
        "firstName",
        "lastName",
        "userName",
        "email",
        "isActive",
        "profileImage",
      ],
      include: [
        {
          model: userDetail,
          attributes: ["userDetailId", "prefix", "address1", "address2"],
          as: "userDetail",
          include: [
            {
              model: city,
              attributes: ["cityId", "name"],
              as: "city",
            },
            {
              model: state,
              attributes: ["stateId", "name"],
              as: "state",
            },
            {
              model: country,
              attributes: ["countryId", "name"],
              as: "country",
            },
          ],
        },
        {
          model: userBusiness,
          attributes: [
            "userBusinessInfoId",
            "companyName",
            "address1",
            "address2",
            "postalCode",
            "dayTimePhone",
            "otherPhone",
            "faxNumber",
          ],
          as: "userBusiness",
          include: [
            {
              model: city,
              attributes: ["cityId", "name"],
              as: "city",
            },
            {
              model: state,
              attributes: ["stateId", "name"],
              as: "state",
            },
            {
              model: country,
              attributes: ["countryId", "name"],
              as: "country",
            },
          ],
        },
        {
          model: userSubscription,
          as: "userSubscription",
          include: [
            {
              model: subscription,
              attributes: ["subscriptionId", "name"],
              as: "subscription",
            },
          ],
        },
      ],
    });
    getUser.dataValues.profileImage = `https://gunsbid-dev.s3-us-west-2.amazonaws.com/GunsBidCMS/user/${getUser.dataValues.profileImage}`;
    return getUser;
  },

  /* Update User*/
  async updateUser1(req, res) {
    let findUser = await user.findOne({
      where: {
        userId: req.body.userId,
      },
    });
    if (req.file) {
      //delete old image
      await imageDelete("GunsBidCMS/user/" + findUser.dataValues.profileImage);
      //upload new image
      await user.update(
        {
          profileImage: findUser.userId + "_" + req.file.originalname,
        },
        {
          where: {
            userId: findUser.userId,
          },
        }
      );
      await imageupload(
        req.file,
        "GunsBidCMS/user/" + findUser.userId + "_" + req.file.originalname
      );
    }
    console.log("----------");
    return await user
      .update(
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          username: req.body.userName,
          email: req.body.email,
        },
        {
          where: {
            userId: req.body.userId,
          },
        }
      )
      .then(
        await userBusiness.update(
          {
            companyName: req.body.companyName,
            address1: req.body.businessAddress1,
            address2: req.body.businessAddress2,
            cityId: req.body.businessCityId,
            stateId: req.body.businessStateId,
            countryId: req.body.businessCountryId,
            daytimePhone: req.body.daytimePhone,
            otherPhone: req.body.otherPhone,
            faxNumber: req.body.faxNumber,
          },
          {
            where: {
              userId: req.body.userId,
            },
          }
        )
      )
      .then(
        await userDetail.update(
          {
            prefix: req.body.prefix,
            address1: req.body.detailsAddress1,
            address2: req.body.detailsAddress2,
            cityId: req.body.deatilsCityId,
            stateId: req.body.deatilsStateId,
            countryId: req.body.deatilsCountryId,
            postalCode: req.body.postalCode,
            dob: req.body.dob,
            //referredBy: req.body.referredBy,
            //promoCode: req.body.promoCode,
          },
          {
            where: {
              userId: req.body.userId,
            },
          }
        )
      )
      .then(
        await userSubscription.update(
          {
            subscriptionId: req.body.subscriptionId,
          },
          {
            where: {
              userId: req.body.userId,
            },
          }
        )
      );
  },

  async updateUser({ body, file }) {
    //finding user profile object
    let find_user = await user.findOne({
      where: {
        userId: body.userId,
      },
    });
    let find_user_profile = await userDetail.findOne({
      where: {
        userId: body.userId,
      },
    });
    let find_user_buisness = await userBusiness.findOne({
      where: {
        userId: body.userId,
      },
    });
    console.log(body);
    if (file) {
      //delete old image
      await imageDelete("GunsBidCMS/user/" + find_user.dataValues.profileImage);
      console.log(file)
      //upload new image
      await user.update(
        {
          profileImage: find_user.userId + "_" + file.originalname,
        },
        {
          where: {
            userId: find_user.userId,
          },
        }
      );
      await imageupload(
        file,
        "GunsBidCMS/user/" + find_user.userId + "_" + file.originalname
      );
    }
    if(find_user){
      let updateUserObj = {
        firstName: body.firstName && body.firstName,
        lastName: body.lastName && body.lastName,
        username: body.userName && body.userName,
        email: body.email && body.email
      };
      console.log(updateUserObj);
      await user.update(updateUserObj, {
        where: {
          userId: find_user.userId,
        },
        logging: console.log,
      });
    }
    if (find_user_profile) {
      let updateProfileObj = {
        prefix: body.prefix && body.prefix,
        address1: body.detailsAddress1 && body.detailsAddress1,
        address2: body.detailsAddress2 && body.detailsAddress2,
        cityId: body.detailsCityId && body.detailsCityId,
        stateId: body.detailsStateId && body.detailsStateId,
        countryId: body.detailsCountryId && body.detailsCountryId,
        postalCode: body.postalCode && body.postalCode,
        dob: body.dob && body.dob,
       // referredBy: body.referredBy || null,
       // promoCode: body.promoCode && body.promoCode,
      };

     await userDetail.update(updateProfileObj, {
        where: {
          userId: find_user_profile.userId,
        },
        logging: console.log,
      });
    }
    if (find_user_buisness) {
      let updateBuisnessObj = {
        companyName: body.companyName && body.companyName,
        address1: body.businessAddress1 && body.businessAddress1,
        address2: body.businessAddress2 && body.businessAddress2,
        cityId: body.businessCityId && body.businessCityId,
        stateId: body.businessStateId && body.businessStateId,
        countryId: body.businessCountryId && body.businessCountryId,
        daytimePhone: body.daytimePhone && body.daytimePhone,
        otherPhone: body.otherPhone && body.otherPhone,
        faxNumber: body.faxNumber && body.faxNumber,
      };

      await userBusiness.update(updateBuisnessObj, {
        where: {
          userId: find_user_buisness.userId,
        },
        logging: console.log,
      });
    }
    let subscriptions = body.subscriptions && JSON.parse(body.subscriptions);
    subscriptions &&
      subscriptions.length > 0 &&
      (await userSubscription.bulkCreate(subscriptions));
    body.deleted_subscription_id &&
      body.deleted_subscription_id.length > 0 &&
      (await userSubscription.destroy({
        where: {
          userSubscriptionId: { [Op.in]: body.deleted_subscription_id },
        },
      }));
  },

  /* List User*/
  async listUser(req, res) {
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
            firstName: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            lastName: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            userName: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            "$userBusiness.companyName$": {
              [Op.like]: `%${search}%`,
            },
          },
         /*  {
            "$userSubscription.subscription.name$": {
              [Op.like]: `%${search}%`,
            },
          }, */
        ],
      },
    };
    if (req.body.isActive === "true") {
      searchObj.where.isActive = true;
    } else if (req.body.isActive === "false") {
      searchObj.where.isActive = false;
    }
    let listUser = await user.findAndCountAll({
      where: searchObj.where,
      logging: console.log,
      subQuery: false,
      distinct: true,
      order: [[Sequelize.literal(`${sortBy}`), `${order}`]],
      attributes: [
        "userId",
        "firstName",
        "lastName",
        "userName",
        "email",
        "isActive",
        "profileImage",
        "createdAt",
      ],
      include: [
        {
          model: userDetail,
          attributes: ["userDetailId", "prefix", "address1", "address2","postalCode","phoneNumber","dob"],
          as: "userDetail",
          include: [
            {
              model: city,
              attributes: ["cityId", "name"],
              as: "city",
            },
            {
              model: state,
              attributes: ["stateId", "name"],
              as: "state",
            },
            {
              model: country,
              attributes: ["countryId", "name"],
              as: "country",
            }
          ], 
        },
        {
          model: userBusiness,
          attributes: [
            "userBusinessInfoId",
            "companyName",
            "address1",
            "address2",
            "postalCode",
            "dayTimePhone",
            "otherPhone",
            "faxNumber",
          ],
          as: "userBusiness",
          include: [
            {
              model: city,
              attributes: ["cityId", "name"],
              as: "city",
            },
            {
              model: state,
              attributes: ["stateId", "name"],
              as: "state",
            },
            {
              model: country,
              attributes: ["countryId", "name"],
              as: "country",
            },
           
          ],
        },
       /*  {
          model: userSubscription,
          as: "userSubscription",
          include: [
            {
              model: subscription,
              attributes: ["subscriptionId", "name"],
              as: "subscription",
            },
          ],
        }, */
      ],
      offset: offset,
      limit: limit,
    });
    listUser.rows.forEach((result) => {
      // delete result.dataValues.category_image;
      result.dataValues.profileImage = `https://gunsbid-dev.s3-us-west-2.amazonaws.com/GunsBidCMS/user/${result.dataValues.profileImage}`;
    });
    listUser.total_records = listUser.count;
    delete listUser.count;
    return listUser;
  },

  /* Change Status of User*/
  async updateUserStatus(req, res) {
    //status = true/false
    return await user
      .update(
        {
          isActive: req.body.isActive,
        },
        {
          where: {
            userId: req.body.userId,
          },
        }
      )
      .then(
        await userBusiness.update(
          {
            isActive: req.body.isActive,
          },
          {
            where: {
              userId: req.body.userId,
            },
          }
        )
      )
      .then(
        await userDetail.update(
          {
            isActive: req.body.isActive,
          },
          {
            where: {
              userId: req.body.userId,
            },
          }
        )
      )
      .then(
        await userSubscription.update(
          {
            isActive: req.body.isActive,
          },
          {
            where: {
              userId: req.body.userId,
            },
          }
        )
      );
  },

  /*Contry Dropdown */
  async countryDropdown(req, res) {
    return await country.findAll({
      where: { isActive: true },
      attributes: ["countryId", "name"],
    });
  },

  /*State Dropdown */
  async stateDropdown(req, res) {
    return await state.findAll({
      where: { isActive: true, countryId: req.body.countryId },
      attributes: ["stateId", "name"],
    });
  },

  /*City Dropdown */
  async cityDropdown(req, res) {
    return await city.findAll({
      where: { isActive: true, stateId: req.body.stateId },
      attributes: ["cityId", "name"],
    });
  },

  /*ReferredBy Dropdown */
  /* async referredByDropdown(req, res) {
    return await user.findAll({
      where: { isActive: true },
      attributes: ["userId", "firstName"],
    });
  }, */

  /*subscription Dropdown */
  async subscriptionDropdown(req, res) {
    return await subscription.findAll({
      where: { isActive: true },
      attributes: ["subscriptionId", "name"],
    });
  },
};
