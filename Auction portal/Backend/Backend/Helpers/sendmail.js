const ejs = require('ejs');
const nodemailer = require('nodemailer');
const constant = require('../Configs/constant');
const message = require('../Configs/cmsMessage').cmsMessage;
const status = require('../Configs/statusCode').status;
var sendmail = async function(res, email, subject, mailbody, attachments = '') {
	try {
		var transporter = nodemailer.createTransport({
			service: constant.MAIL_SERVICE,
			host: constant.MAIL_HOST,
			port: constant.MAIL_PORT,
			secure: constant.MAIL_SECURE,
			auth: {
				user: constant.MAIL_FROM,
				pass: constant.MAIL_PASSWORD
			}
		});
		let html_data = await ejs.renderFile(__dirname + '/email.ejs', {
			TITLE: subject,
			HTML_BODY: mailbody
		});

		let mailoption = {
			from: constant.MAIL_FROM,
			to: email,
			html: html_data,
			subject: subject
		};

		if (attachments != '') {
			mailoption.attachments = attachments;
		}
		let mailresponse = await transporter.sendMail(mailoption);
	} catch (error) {
		console.log('TCL: error', error);
		res.status(status.SERVER_ERROR).send({
			message: message.internalServerError,
			status: status.SERVER_ERROR
		});
	}
};
exports.sendmail = sendmail;
