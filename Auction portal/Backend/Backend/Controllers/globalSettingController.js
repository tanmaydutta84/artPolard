const status = require("../Configs/statusCode").status;
const message = require("../Configs/cmsMessage").cmsMessage;
const globalSettingService = require("../Services/globalSettingService");

module.exports = {
  async addGlobalSettings(req, res) {
    try {
      //response of add settings
      let add_settings = await globalSettingService.addGlobalSettings(req, res);
      res.status(status.SUCCESS).send({
        data: [],
        message: message.settingsAdded,
        status: status.success,
      });
    } catch (error) {
      console.log("add_settings -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        error: error,
        message: message.internalServerError,
        status: status.error,
      });
    }
  },

  /* View Global Settings */
  async viewGlobalSettings(req, res) {
    try {
      let view_global_settings = await globalSettingService.viewGlobalSettings(
        req,
        res
      );
      if (view_global_settings === 0) {
        //respnse of view global settings
        res.status(status.SUCCESS).send({
          data: [],
          message: message.setSettings,
          status: status.SUCCESS,
        });
      } else {
        res.status(status.SUCCESS).send({
          data: view_global_settings,
          message: message.success,
          status: status.SUCCESS,
        });
      }
    } catch (error) {
      console.log("TCL: viewGlobalSettings -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR,
      });
    }
  },

  /* Update Global Settings*/
  async updateGlobalSettings(req, res) {
    try {
      await globalSettingService.updateGlobalSettings(req, res);
      //response of update partner
      res.status(status.SUCCESS).send({
        data: [],
        message: message.settingsUpdated,
        status: status.SUCCESS,
      });
    } catch (error) {
      console.log("updateGlobalSettings -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR,
      });
    }
  },
};
