/*
 * Summary:     itemController file for handling all requests and response of Controller  - CMS
 * Author:      Openxcell(empCode-473)
 */

/*Messages,status code and services require*/
const status = require("../Configs/statusCode").status;
const message = require("../Configs/cmsMessage").cmsMessage;
const itemService = require("../Services/itemService");

module.exports = {


  async addproduct(req, res) {
    try {
      await itemService.addProduct(req, res);
      //response of add item
     console.log("success");
    } catch (error) {
      
      //response on internal server error
    console.log(error);
    }
  },






  async viewproduct(req, res) {
    try {
      await itemService.viewProducts(req, res);
      //response of add item
     //console.log("success");
    } catch (error) {
      
      //response on internal server error
    console.log(error);
    }
  },







  async viewproductbyid(req, res) {
    try {
      await itemService.viewproductByid(req, res);
      //response of add item
     //console.log("success");
    } catch (error) {
      
      //response on internal server error
    console.log(error);
    }
  },








  async updateproductbyid(req, res) {
    try {
      await itemService.updateproductByid(req, res);
      //response of add item
     //console.log("success");
    } catch (error) {
      
      //response on internal server error
    console.log(error);
    }
  },









  async deleteproduct(req, res) {
    try {
      await itemService.deleteProduct(req, res);
      //response of add item
     //console.log("success");
    } catch (error) {
      
      //response on internal server error
    console.log(error);
    }
  },





  /* Add Item */
  async addItem(req, res) {
    try {
      await itemService.addItem(req, res);
      //response of add item
     //console.log("success");
    } catch (error) {
      
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },

  /* Delete Item */
  async deleteItem(req, res) {
    try {
      //response on delete item
      let deleteItem = await itemService.deleteItem(req, res);
      if (deleteItem) {
        res.status(status.SUCCESS).send({
          data: [],
          message: message.itemDeleted,
          status: status.SUCCESS
        });
      }
    } catch (error) {
      //response on internal server error
      console.log("deleteItem -> error", error);
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },

  /* View Item */
  async getItemById(req, res) {
    try {
      let viewItem = await itemService.getItemById(req, res);
      if (viewItem) {
        //response of view item
        res.status(status.SUCCESS).send({
          data: viewItem,
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
      console.log("getItemById -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },

  /* Update Item*/
  async updateItem(req, res) {
    try {
      await itemService.updateItem(req, res);
      //response of update Item
      res.status(status.SUCCESS).send({
        data: [],
        message: message.itemUpdated,
        status: status.SUCCESS
      });
    } catch (error) {
      console.log("updateItem -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },

  /* List Item */
  async listItem(req, res) {
    try {
      let item_list = await itemService.listItem(req, res);

      if (item_list) {
        //response of list item
        res.status(status.SUCCESS).send({
          data: item_list,
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
      console.log("TCL: listItem -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR
      });
    }
  },

  /* Update status of Item */
  async updateItemStatus(req, res) {
    try {
      await itemService.updateItemStatus(req, res);
      //response on status change
      res.status(status.SUCCESS).send({
        data: [],
        message: message.itemStatusUpdated,
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
  },









  async csvupload(req, res) {
    try {
      await itemService.csvUpload(req, res);
      //response on status change
      
  
    } catch (error) {
      //response on internal server error
       console.log(error);
    }
  }











};
