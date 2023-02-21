/*
 * Summary:     partnerController file for handling all requests and response of PARTNER  - CMS
 * Author:      Openxcell(empCode-473)
 */

/*Messages,status code and services require*/
const status = require("../Configs/statusCode").status;
const message = require("../Configs/cmsMessage").cmsMessage;
const partnerService = require("../Services/partnerService");

module.exports = {



  async addPartnerDemo(req, res) {
    try {
      await partnerService.addPartnerdemo(req, res);
      //response of add partner
      res.status(status.SUCCESS).send({
        data: [],
        message: message.partnerAdded,
        status: status.SUCCESS
      });
    } catch (error) {
      //console.log("addPartner -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },







  /* Add Partner */
  async addPartner(req, res) {
    try {
      await partnerService.addPartner(req, res);
      //response of add partner
      res.status(status.SUCCESS).send({
        data: [],
        message: message.partnerAdded,
        status: status.SUCCESS
      });
    } catch (error) {
      console.log("addPartner -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },

  /* Delete Partner */
  async deletePartner(req, res) {
    try {
      //response on delete partner
      let delete_partner = await partnerService.deletePartner(req, res);
      if (delete_partner) {
        res.status(status.SUCCESS).send({
          data: [],
          message: message.partnerDeleted,
          status: status.SUCCESS
        });
      }
    } catch (error) {
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },

  /* View Partner */
  async getPartnerById(req, res) {
    try {
      let view_partner = await partnerService.getPartnerById(req, res);
      if (view_partner) {
        //respnse of view partner
        res.status(status.SUCCESS).send({
          data: view_partner,
          message: message.success,
          status: status.SUCCESS
        });
      } else {
        res.status(status.SUCCESS).send({
          data: [],
          message: message.noRecordFound,
          status: status.SERVER_ERROR
        });
      }
    } catch (error) {
      console.log("TCL: getPartnerById -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },

  /* Update Partner*/
  async updatePartner(req, res) {
    try {
      await partnerService.updatePartner(req, res);
      //response of update partner
      res.status(status.SUCCESS).send({
        data: [],
        message: message.partnerUpdated,
        status: status.SUCCESS
      });
    } catch (error) {
      console.log("updatePartner -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },

  /* List Partner */
  async listPartner(req, res) {
    try {
      let partner_List = await partnerService.listPartner(req, res);

      if (partner_List) {
        //response of list partner
        res.status(status.SUCCESS).send({
          data: partner_List,
          message: message.success,
          status: status.SUCCESS
        });
      } else {
        res.status(status.SUCCESS).send({
          data: [],
          message: message.noRecordFound,
          status: status.SUCCESS
        });
      }
    } catch (error) {
      console.log("TCL: listPartner -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },

  /* Update status of Partner */
  async updatePartnerStatus(req, res) {
    try {
      await partnerService.updatePartnerStatus(req, res);
      //response on status change
      res.status(status.SUCCESS).send({
        data: [],
        message: message.partnerStatusUpdated,
        status: status.SUCCESS
      });
    } catch (error) {
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  }
};
