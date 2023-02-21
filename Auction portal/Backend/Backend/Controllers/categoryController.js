/*
 * Summary:     categoryController file for handling all requests and response of CATEGORY  - CMS
 * Author:      Openxcell(empCode-473)
 */

/*Messages,status code and services require*/
const status = require("../Configs/statusCode").status;
const message = require("../Configs/cmsMessage").cmsMessage;
const categoryService = require("../Services/categoryService");

module.exports = {
  /* Add Category And Sub-category */
  async addCategory(req, res) {
    try {
      const { layoutId, position } = req.body;
      //if layoutId is present
      if (layoutId) {
        //position is right or not
        let check_position = await categoryService.checkPosition(
          layoutId,
          position
        );
        if (check_position) {
          //finding image with same position and layoutId
          let find_image = await categoryService.findImage(req, res);
          if (find_image) {
            console.log("Category Image with same layoutId and position: ");
            return res.status(status.SERVER_ERROR).send({
              data: [],
              message: message.layoutPresent,
              status: status.error
            });
          }
        } else {
          console.log("Position not correct: ");
          return res.status(status.SERVER_ERROR).send({
            data: [],
            message: message.checkPosition,
            status: status.error
          });
        }
      }
      //response of add category And Sub-category
      let add_category = await categoryService.addCategory(req, res);
      if (add_category === 0) {
        res.status(status.SUCCESS).send({
          data: [],
          message: message.categoryTypeNotValid,
          status: status.success,
        });
      } else {
        res.status(status.SUCCESS).send({
          data: [],
          message: message.categoryAdded,
          status: status.success,
        });
      }
    } catch (error) {
      console.log("addCategory -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        error:error,
        message: message.internalServerError,
        status: status.error,
      });
    }
  },

  /* Delete Category */
  async deleteCategory(req, res) {
    try {
      //response on delete category (soft-delete)
      let delete_cat = await categoryService.deleteCategory(req, res);
      if (delete_cat) {
        res.status(status.SUCCESS).send({
          data: [],
          message: message.categoryDeleted,
          status: status.SUCCESS,
        });
      }
    } catch (error) {
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR,
      });
    }
  },

  /* View Category */
  async getCategoryById(req, res) {
    try {
      let view_cat = await categoryService.getCategoryById(req, res);
      if (view_cat) {
        //respnse of view category And Sub-category
        res.status(status.SUCCESS).send({
          data: view_cat,
          message: message.success,
          status: status.SUCCESS,
        });
      } else {
        res.status(status.SUCCESS).send({
          data: [],
          message: message.noRecordFound,
          status: status.SERVER_ERROR,
        });
      }
    } catch (error) {
      console.log("TCL: getCategoryById -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR,
      });
    }
  },

  /* Update Category And Sub-category */
  async updateCategory(req, res) {
    try {
      const { layoutId, position } = req.body;
      //if layoutId is present
      if (layoutId) {
        //position is right or not
        let check_position = await categoryService.checkPosition(
          layoutId,
          position
        );
        if (check_position) {
          //finding image with same position and layoutId
          let find_image = await categoryService.findImage(req, res);
          if (find_image) {
            console.log("Category Image with same layoutId and position: ");
            return res.status(status.SERVER_ERROR).send({
              data: [],
              message: message.layoutPresent,
              status: status.error
            });
          }
        } else {
          console.log("Position not correct: ");
          return res.status(status.SERVER_ERROR).send({
            data: [],
            message: message.checkPosition,
            status: status.error
          });
        }
      }
      await categoryService.updateCategory(req, res);
      //response of update category And Sub-category
      res.status(status.SUCCESS).send({
        data: [],
        message: message.categoryUpdated,
        status: status.SUCCESS,
      });
    } catch (error) {
      console.log("updateCategory -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR,
      });
    }
  },

  /* List Category */
  async listCategory(req, res) {
    try {
      let category_List = await categoryService.listCategory(req, res);

      if (category_List) {
        //response of list category And Sub-category
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
      console.log("TCL: listCategory -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR,
      });
    }
  },

  /* Update status of Category And Sub-category */
  async updateCategoryStatus(req, res) {
    try {
      let update_cat_status = await categoryService.updateCategoryStatus(
        req,
        res
      );
      if (update_cat_status) {
        //response on status change
        res.status(status.SUCCESS).send({
          data: [],
          message: message.categoryStatusUpdated,
          status: status.SUCCESS,
        });
      } else {
        res.status(status.SUCCESS).send({
          data: [],
          message: message.parentCatIsInactive,
          status: status.SERVER_ERROR,
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

  /* Category Dropdown */
  async categoryDropdown(req, res) {
    try {
      let category_List = await categoryService.categoryDropdown(req, res);

      if (category_List) {
        //respnse of Dropdown of category And Sub-category
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
      console.log("dropdown category -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR,
      });
    }
  },

  /* Main Category Dropdown */
  async mainCategoryDropdown(req, res) {
    try {
      let main_category_list = await categoryService.mainCategoryDropdown(
        req,
        res
      );

      if (main_category_list) {
        //respnse of Dropdown of category
        res.status(status.SUCCESS).send({
          data: main_category_list,
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
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR,
      });
    }
  },

  /* Parent Category Dropdown */
  async parentCategoryDropdown(req, res) {
    try {
      let parent_category_list = await categoryService.parentCategoryDropdown(
        req,
        res
      );

      if (parent_category_list) {
        //respnse of Dropdown of category And Sub-category
        res.status(status.SUCCESS).send({
          data: parent_category_list,
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
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR,
      });
    }
  },

  /* Parent Category Dropdown */
  async subCategoryDropdown(req, res) {
    try {
      let sub_category_list = await categoryService.subCategoryDropdown(
        req,
        res
      );

      if (sub_category_list) {
        //respnse of Dropdown of category And Sub-category
        res.status(status.SUCCESS).send({
          data: sub_category_list,
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
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR,
      });
    }
  },
};
