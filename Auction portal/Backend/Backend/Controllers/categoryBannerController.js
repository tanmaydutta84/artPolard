/*
 * Summary:     categoryBannerController file for handling all requests and response of CATEGORY BANNER  - CMS
 * Author:      Openxcell(empCode-473)
 */

/*Messages,status code and services require*/
const status = require("../Configs/statusCode").status;
const message = require("../Configs/cmsMessage").cmsMessage;
const categoryBannerService = require("../Services/categoryBannerService");

module.exports = {

  


  /* Add template for page */
  
  async addtemplatedetails(req, res) {
    try {
      //response of add category And Sub-category
      let add_category_banner = await categoryBannerService.addtemp(
        req,
        res
      );
      if (add_category_banner) {
        res.send("Success");
      }
    }
     catch (error) {
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },








  async gettemplate(req, res) {
    try {
      //response of add category And Sub-category
      let gettem = await categoryBannerService.getTemplate(req, res );
      if (gettem) {
        res.send("Success");
      }
    }
     catch (error) {
      //response on internal server error
       console.log(error);
    }

  },





  async viewtemplate(req, res) {
    try {
      //response of add category And Sub-category
      let v_category_banner = await categoryBannerService.viewTemplate(
        req,
        res
      );
      if (v_category_banner) {
        res.send("Success");
      }
    }
     catch (error) {
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },







  async edittemplatedetails(req, res) {
    try {
      //response of add category And Sub-category
      let e_category_banner = await categoryBannerService.editTemplate(
        req,
        res
      );
      if (e_category_banner) {
        res.send("Success");
      }
    }
     catch (error) {
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },








  /* Add Category Banner */
  async addCategoryBanner(req, res) {
    try {
      //response of add category And Sub-category
      let add_category_banner = await categoryBannerService.addCategoryBanner(
        req,
        res
      );
      res.status(status.SUCCESS).send({
        data: [],
        message: message.categoryBannerAdded,
        status: status.success,
      });
    } catch (error) {
      console.log("addCategoryBanner -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        error: error,
        message: message.internalServerError,
        status: status.error,
      });
    }
  },

  /* Delete Category Banner*/
  async deleteCategoryBanner(req, res) {
    try {
      //response on delete category banner image
      let delete_cat = await categoryBannerService.deleteCategoryBanner(
        req,
        res
      );
      if (delete_cat) {
        res.status(status.SUCCESS).send({
          data: [],
          message: message.categoryBannerDeleted,
          status: status.SUCCESS,
        });
      }
    } catch (error) {
      console.log("deleteCategoryBanner -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR,
      });
    }
  },

  /* Get Category List*/
  async getCategoryList(req, res) {
    try {
      //response on delete category banner image
      let cat_list = await categoryBannerService.getCategoryList();
      if (cat_list) {
        res.status(status.SUCCESS).send({
          data: cat_list,
          message: message.categoryList,
          status: status.SUCCESS,
        });
      }
    } catch (error) {
      console.log("deleteCategoryBanner -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR,
      });
    }
  },

  /* Update status of Category Banner */
  async updateBannerStatus(req, res) {
    try {
      let update_cat_status = await categoryBannerService.updateBannerStatus(
        req,
        res
      );
      if (update_cat_status) {
        //response on status change
        res.status(status.SUCCESS).send({
          data: [],
          message: message.categoryBannerStatusUpdated,
          status: status.SUCCESS,
        });
      }
    } catch (error) {
      console.log("UpdateCategoryStatus-->error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR,
      });
    }
  },

  /* View Category Banner */
  async viewBanner(req, res) {
    try {
      //response of add category And Sub-category
      let banner = await categoryBannerService.viewBanner(req, res);
      res.status(status.SUCCESS).send({
        data: banner,
        message: message.categoryBannerViewed,
        status: status.success,
      });
    } catch (error) {
      console.log("viewCategoryBanner -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        error: error,
        message: message.internalServerError,
        status: status.error,
      });
    }
  },

  /* Update Category Banner */
  async updateBanner(req, res) {
    try {
      let update_cat = await categoryBannerService.updateBanner(req, res);

      //response on status change
      res.status(status.SUCCESS).send({
        data: [],
        message: message.categoryBannerUpdated,
        status: status.SUCCESS,
      });
    } catch (error) {
      console.log("UpdateCategory-->error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR,
      });
    }
  },

  /* List Category Banner*/
  async listBanner(req, res) {
    try {
      let category_List = await categoryBannerService.listBanner(req, res);

      if (category_List) {
        //response of list category banner
        res.status(status.SUCCESS).send({
          data: category_List,
          message: message.success,
          status: status.SUCCESS,
        });
      } else {
        res.status(status.SUCCESS).send({
          data: [],
          message: message.noRecordFound,
          status: status.SUCCESS,
        });
      }
    } catch (error) {
      console.log("TCL: listBanner -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR,
      });
    }
  },
};
