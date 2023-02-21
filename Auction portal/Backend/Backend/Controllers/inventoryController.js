/*
 * Summary:     userController file for handling all requests and response of user  - CMS
 * Author:      Openxcell(empCode-473)
 */

/*Messages,status code and services require*/
const status = require("../Configs/statusCode").status;
const message = require("../Configs/cmsMessage").cmsMessage;
const inventoryService = require("../Services/inventoryService");


module.exports = {




  async addpro(req, res) {
    try {
      //response on add user
      let getd = await inventoryService.addPro(req, res);
      if (getd) {
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










 // register user//
  async getdata(req, res) {
    try {
      //response on add user
      let getd = await inventoryService.getData(req, res);
      if (getd) {
        console.log("success");
      }
    }
     catch (error) {
      //response on internal server error
      console.log(error)
    }
  },






  async listdatabyidd(req, res) {
    try {
      //response on add user
      let getid = await inventoryService.listdataById(req, res);
      if (getid ) {
        console.log("success");
      }
    }
     catch (error) {
      //response on internal server error
      console.log(error)
    }
  },


  async listdatabyid(req, res) {
    try {
      //response on add user
      let getdd = await inventoryService.listdataByid(req, res);
      if (getdd) {
        console.log("success");
      }
    }
     catch (error) {
      //response on internal server error
      console.log(error)
    }
  },
 





  async viewcatcount(req, res) {
    try {
      //response on add user
      let viewctp = await inventoryService.viewcatCount(req, res);
      if (viewctp) {
        console.log("success");
      }
    }
     catch (error) {
      //response on internal server error
      console.log(error)
    }
  },




  async viewdatabyid(req, res) {
    try {
      //response on add user
      let viewdd = await inventoryService.viewdataByid(req, res);
      if (viewdd) {
        console.log("success");
      }
    }
     catch (error) {
      //response on internal server error
      console.log(error)
    }
  },




  async filteryear(req, res) {
    try {
      //response on add user
      let filterd = await inventoryService.filterYear(req, res);
      if (filterd) {
        console.log("success");
      }
    }
     catch (error) {
      //response on internal server error
      console.log(error)
    }
  },






  async filtermodel(req, res) {
    try {
      //response on add user
      let filterm = await inventoryService.filterbyModel(req, res);
      if (filterm) {
        console.log("success");
      }
    }
     catch (error) {
      //response on internal server error
      console.log(error)
    }
  },






 

  async filterlocation(req, res) {
    try {
      //response on add user
      let filterl = await inventoryService.filterLocation(req, res);
      if (filterl) {
        console.log("success");
      }
    }
     catch (error) {
      //response on internal server error
      console.log(error)
    }
  },



  
  async filterprice(req, res) {
    try {
      //response on add user
      let filterp = await inventoryService.filterprice(req, res);
      if (filterp) {
        console.log("success");
      }
    }
     catch (error) {
      //response on internal server error
      console.log(error)
    }
  },





  

  async filterdate(req, res) {
    try {
      //response on add user
      let filterd = await inventoryService.filterDate(req, res);
      if (filterd) {
        console.log("success");
      }
    }
     catch (error) {
      //response on internal server error
      console.log(error)
    }
  },




  async viewpublish(req, res) {
    try {
      //response on add user
      let viewdd = await inventoryService.viewPublish(req, res);
      if (viewdd) {
        console.log("success");
      }
    }
     catch (error) {
      //response on internal server error
      console.log(error)
    }
  },





  async updatedatabyid(req, res) {
    try {
      //response on add user
      let updated = await inventoryService.updatedataByid(req, res);
      if (updated) {
        console.log("success");
      }
    }
     catch (error) {
      //response on internal server error
      console.log(error)
    }
  },








  async updatepublish(req, res) {
    try {
      //response on add user
      let updatep = await inventoryService.updatePublish(req, res);
      if (updatep) {
        console.log("success");
      }
    }
     catch (error) {
      //response on internal server error
      console.log(error)
    }
  },




  async addsubcategoryitem(req, res) {
    try {
      //response on add user
      let subc = await inventoryService.addsubCategory(req, res);
      if (subc) {
        res.send("Success");
      }
    }
     catch (error) {
      //response on internal server error
       console.log(error);
    }
  },







  async getcat(req, res) {
    try {
      //response on add user
      let getct = await inventoryService.getCat(req, res);
      if (getct ) {
        console.log("success");
      }
    }
     catch (error) {
      //response on internal server error
      console.log(error)
    }
  },





  async deletecategory(req, res) {
    try {
      //response on add user
      let delcat = await inventoryService.deleteCategory(req, res);
      if (delcat) {
        console.log("success");
      }
    }
     catch (error) {
      //response on internal server error
      console.log(error)
    }
  },
  







  async viewcat(req, res) {
    try {
      //response on add user
      let viewct = await inventoryService.viewCat(req, res);
      if (viewct) {
        console.log("success");
      }
    }
     catch (error) {
      //response on internal server error
      console.log(error)
    }
  },








  async updatecategory(req, res) {
    try {
      //response on add user
      let updatecat = await inventoryService.updateCategory(req, res);
      if (updatecat) {
        console.log("success");
      }
    }
     catch (error) {
      //response on internal server error
      console.log(error)
    }
  },







  async filtercategory(req, res) {
    try {
      //response on add user
      let filterc = await inventoryService.filterCategory(req, res);
      if (filterc) {
        console.log("success");
      }
    }
     catch (error) {
      //response on internal server error
      console.log(error)
    }
  },
  





  
  async viewsold(req, res) {
    try {
      //response on add user
      let views = await inventoryService.viewSold(req, res);
      if (views) {
        console.log("success");
      }
    }
     catch (error) {
      //response on internal server error
      console.log(error)
    }
  },







  async sortdate(req, res) {
    try {
      //response on add user
      let sortd = await inventoryService.sortDate(req, res);
      if (sortd) {
        console.log("success");
      }
    }
     catch (error) {
      //response on internal server error
      console.log(error)
    }
  },






  
  async deletedatabyid(req, res) {
    try {
      //response on add user
      let deld = await inventoryService.deletedataByid(req, res);
      if (deld) {
        console.log("success");
      }
    }
     catch (error) {
      //response on internal server error
      console.log(error)
    }
  },






  async deleteitembyid(req, res) {
    try {
      //response on add user
      let delid = await inventoryService.deleteitemByid(req, res);
      if (delid) {
        console.log("success");
      }
    }
     catch (error) {
      //response on internal server error
      console.log(error)
    }
  },


  
  
};
