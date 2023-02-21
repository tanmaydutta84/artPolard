/*
 * Summary:     newsController file for handling all requests and response of News  - CMS
 * Author:      Openxcell(empCode-470)
 */

/*Messages,status code and services require*/
const status = require("../Configs/statusCode").status;
const message = require("../Configs/cmsMessage").cmsMessage;
const newsService = require("../Services/newsService");

module.exports = {
  /* Add News */
  async addNews(req, res) {
    try {
      let addNews = await newsService.addNews(req, res);
      if (addNews) {
        //response of add news
        res.status(status.SUCCESS).send({
          data: [],
          message: message.newsAdded,
          status: status.SUCCESS,
        });
      }
    } catch (error) {
      console.log("addNews -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR,
      });
    }
  },

  async deleteNews(req, res) {
    try {
      let deleteNews = await newsService.deleteNews(req, res);
      if (deleteNews) {
        //response of delete news
        res.status(status.SUCCESS).send({
          data: [],
          message: message.newsDeleted,
          status: status.SUCCESS,
        });
      }
    } catch (error) {
      console.log("deleteNews -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR,
      });
    }
  },

  async getNewsById(req, res) {
    try {
      let viewNews = await newsService.getNewsById(req, res);
      if (viewNews) {
        //response of view news
        res.status(status.SUCCESS).send({
          data: viewNews,
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
      console.log("viewNews -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR,
      });
    }
  },

  async updateNewsStatus(req, res) {
    try {
      await newsService.updateNewsStatus(req, res);
      //response on status change
      res.status(status.SUCCESS).send({
        data: [],
        message: message.newsStatusUpdated,
        status: status.SUCCESS,
      });
    } catch (error) {
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR,
      });
    }
  },

  async updateNews(req, res) {
    try {
      await newsService.updateNews(req, res);
      //response of update news
      res.status(status.SUCCESS).send({
        data: [],
        message: message.newsUpdated,
        status: status.SUCCESS,
      });
    } catch (error) {
      console.log("updateNews -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR,
      });
    }
  },

  async listNews(req, res) {
    try {
      let news_List = await newsService.listNews(req, res);

      if (news_List) {
        //response of list admin
        res.status(status.SUCCESS).send({
          data: news_List,
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
      console.log("TCL: listNews -> error", error);
      //response on internal server error
      res.status(status.SERVER_ERROR).send({
        data: [],
        message: message.internalServerError,
        status: status.SERVER_ERROR,
      });
    }
  },
};
