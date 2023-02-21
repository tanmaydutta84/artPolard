/*
 * Summary:     adminAuthentiation file for handling aunthentication process of all requests and response - CMS
 * Author:      Openxcell(empCode-473)
 */

/* NPM-modules,Messages,status code and model require for authentication */
const adminToken = require("../Database/models").tbl_admin_token;
const status = require("../Configs/statusCode").status;
const message = require("../Configs/cmsMessage").cmsMessage;
const JwtToken = require("jsonwebtoken");
const constant = require("../Configs/constant").JWTOBJCMS;

/*Verify Token*/
module.exports = {
  /* Authentication middleware */
  async authentication(req, res, next) {
    try {
      let accessToken = req.headers["access-token"];
      if (accessToken) {
        JwtToken.verify(
          accessToken,
          constant.secret,
          {
            // expiresIn: ConstantVal.JWTOBJCMS.expiresIn,
            algorithm: constant.algo
          },
          function(err, result) {
            err
              ? res.status(status.UNAUTHORIZED).send({
                  message: message.invalidHeaders,
                  status: status.SERVER_ERROR
                })
              : adminToken
                  .findOne({
                    where: {
                      accessToken: accessToken,
                      adminId: result.adminId
                    }
                  })
                  .then(tokenFound => {
                    if (tokenFound) {
                      req.tokenFound = tokenFound;
                      next();
                    } else {
                      res.status(status.UNAUTHORIZED).send({
                        data: [],
                        message: message.invalidHeaders,
                        status: status.SERVER_ERROR
                      });
                    }
                  })
                  .catch(error => {
                    res.status(status.SERVER_ERROR).send({
                      data: [],
                      message: message.internalServerError,
                      status: status.SERVER_ERROR
                    });
                  });
          }
        );
      } else {
        res.status(status.SUCCESS).send({
          data: [],
          message: message.tokenRequired,
          status: status.SERVER_ERROR
        });
      }
    } catch (error) {
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  }
};
