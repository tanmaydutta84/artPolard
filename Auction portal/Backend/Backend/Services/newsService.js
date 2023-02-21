/*
 * Summary:     newsService file for handling all News - CMS related actions.
 * Author:      Openxcell(empCode-470)
 */

/**require NPM-modules,models and constants for configuration */
const news = require("../Database/models").tbl_news;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const imageupload = require("../Middleware/multer_aws_upload");
const imageDelete = require("../Middleware/multer_aws_delete");
const constant = require("../Configs/constant");

module.exports = {
  /*Add News*/
  async addNews(req, res) {
    let addNews = await news.create({
      title: req.body.title,
      description: req.body.description,
      image: null,
    });

    if (req.file) {
      await imageupload(
        req.file,
        "GunsBidCMS/news/" + addNews.newsId + "_" + req.file.originalname
      );
      await news.update(
        {
          image: addNews.newsId + "_" + req.file.originalname,
        },
        {
          where: {
            newsId: addNews.newsId,
          },
        }
      );
    }

    return addNews;
  },

  async deleteNews(req, res) {
    let findNews = await news.findOne({
      where: {
        newsId: req.body.newsId,
      },
    });
    if (findNews.image) {
      await imageDelete("GunsBidCMS/news/" + findNews.image);
    }
    return await news.destroy({
      where: {
        newsId: req.body.newsId,
      },
    });
  },

  async getNewsById(req, res) {
    let getNews = await news.findOne({
      where: {
        newsId: req.params.newsId,
      },
      attributes: ["newsId", "title", "description", "image", "isActive"],
    });
    if (getNews) {
      if (getNews.image) {
        getNews.image = `https://gunsbid-dev.s3-us-west-2.amazonaws.com/GunsBidCMS/news/${getNews.image}`;
      }
    }

    return getNews;
  },

  async updateNewsStatus(req, res) {
    //status = true/false
    return await news.update(
      {
        isActive: req.body.isActive,
      },
      {
        where: {
          newsId: req.body.newsId,
        },
      }
    );
  },

  async updateNews(req, res) {
    let findNews = await news.findOne({
      where: {
        newsId: req.body.newsId,
      },
    });
    if (req.file) {
      //delete old image
      await imageDelete("GunsBidCMS/news/" + findNews.dataValues.image);
      //upload new image
      await news.update(
        {
          image: findNews.newsId + "_" + req.file.originalname,
        },
        {
          where: {
            newsId: findNews.newsId,
          },
        }
      );
      await imageupload(
        req.file,
        "GunsBidCMS/news/" + findNews.newsId + "_" + req.file.originalname
      );
    }
    return await news.update(
      {
        title: req.body.title,
        description: req.body.description,
      },
      {
        where: {
          newsId: req.body.newsId,
        },
      }
    );
  },

  async listNews(req, res) {
    let { sortBy, order, search, page } = req.body;
    const offset = (page - 1) * constant.LIMIT;
    const limit = constant.LIMIT;
    let searchObj;
    search = search === undefined ? "" : search;
    order = order === undefined ? "ASC" : order;
    sortBy = sortBy === undefined ? "createdAt" : sortBy;
    searchObj = {
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            description: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
    };
    if (req.body.isActive === "true") {
      searchObj.where.isActive = true;
    } else if (req.body.isActive === "false") {
      searchObj.where.isActive = false;
    }
    let list_news = await news.findAndCountAll({
      where: searchObj.where,
      logging: console.log,
      subQuery: false,
      order: [[Sequelize.literal(`${sortBy}`), `${order}`]],
      attributes: [
        "newsId",
        "title",
        "description",
        "image",
        "isActive",
        "createdAt",
      ],
      offset: offset,
      limit: limit,
    });
    list_news.rows.forEach((result) => {
      if (result.dataValues.image) {
        result.dataValues.image = `https://gunsbid-dev.s3-us-west-2.amazonaws.com/GunsBidCMS/news/${result.dataValues.image}`;
      }
    });
    list_news.total_records = list_news.count;
    delete list_news.count;
    return list_news;
  },
};
