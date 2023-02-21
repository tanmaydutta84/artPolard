/*
 * Summary:     categoryBannerServices file for handling all CATEGORY BANNER - CMS related actions.
 * Author:      Openxcell(empCode-473)
 */

/**require NPM-modules,models and constants for configuration */

const db = require("../Database/models/index");
const mysql= require("mysql");
var connection_more =require('./../config/config');
var connection = mysql.createConnection(connection_more.test);

const nodemailer = require('nodemailer');
// declare vars
let fromMail = 'molay.giri@brainiuminfotech.com';
let toMail = 'molay.giri@gmail.com';

// let toMail = 'gnbaviskar2@gmail.com,gnbaviskar3@gmail.com';

let subject  = 'An email using nodejs app';
let text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." 


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'molay.giri@brainiuminfotech.com',
        pass: 'Molay0905##'
    }
});

// email options
let mailOptions = {
    from: fromMail,
    to: toMail,
    subject: subject,
    text: text
};

module.exports = {


  /* Add template details for page*/

  async sentmail(req, res) {

    try{

        transporter.sendMail(mailOptions, (error, res) => {
            if (error) {
                console.log(error);
            }
            console.log(res)
        });
      

    }
    catch(err){
      console.log(err);
    }


  },











};
