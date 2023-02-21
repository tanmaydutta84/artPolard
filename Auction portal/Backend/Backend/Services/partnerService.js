/*
 * Summary:     partnerService file for handling all Partner - CMS related actions.
 * Author:      Openxcell(empCode-473)
 */

/**require NPM-modules,models and constants for configuration */
const partner = require("../Database/models").tbl_partner;
const partnerdemo = require("../Database/models").tbl_demo;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const constant = require("../Configs/constant");
const imageupload = require("../Middleware/multer_aws_upload");
const imageDelete = require("../Middleware/multer_aws_delete");

module.exports = {



    async addPartnerdemo(req, res) {

     
        let addPartner = await partnerdemo.create({
          name: req.body.name,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          website: req.body.website
        });
        res.send("added");

        return addPartner;
       

    
    },






  /* Add Partner*/
  async addPartner(req, res) {
    let addPartner = await partner.create({
      name: req.body.name,
      icon: null,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      website: req.body.website
    });
    await partner.update(
      {
        icon: addPartner.partnerId + "_" + req.file.originalname
      },
      {
        where: {
          partnerId: addPartner.partnerId
        }
      }
    );
    await imageupload(
      req.file,
      "GunsBidCMS/partner/" + addPartner.partnerId + "_" + req.file.originalname
    );
    return addPartner;
  },

  /* Delete Partner*/
  async deletePartner(req, res) {
    let findPartner = await partner.findOne({
      where: {
        partnerId: req.body.partnerId
      }
    });
    await imageDelete("GunsBidCMS/partner/" + findPartner.dataValues.icon);
    return await partner.destroy({
      where: {
        partnerId: req.body.partnerId
      }
    });
  },

  /* View Partner*/
  async getPartnerById(req, res) {
    let getPartner = await partner.findOne({
      where: {
        partnerId: req.params.partnerId
      },
      attributes: [
        "partnerId",
        "name",
        "icon",
        "email",
        "phoneNumber",
        "website",
        "isActive"
      ]
    });
    getPartner.dataValues.icon = `https://gunsbid-dev.s3-us-west-2.amazonaws.com/GunsBidCMS/partner/${getPartner.dataValues.icon}`;
    return getPartner;
  },

  /* Update Partner*/
  async updatePartner(req, res) {
    let findPartner = await partner.findOne({
      where: {
        partnerId: req.body.partnerId
      }
    });
    if(req.file){
      //delete old icon
      await imageDelete("GunsBidCMS/partner/" + findPartner.dataValues.icon);
      //upload new image
      await partner.update(
        {
          icon: findPartner.partnerId + "_" + req.file.originalname
        },
        {
          where: {
            partnerId: findPartner.partnerId
          }
        }
      );
      await imageupload(
        req.file,
        "GunsBidCMS/partner/" + findPartner.partnerId + "_" + req.file.originalname
      );
    }
    return await partner.update(
      {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        website: req.body.website
      },
      {
        where: {
          partnerId: req.body.partnerId
        }
      }
    );
  },

  /* List Partner*/
  async listPartner(req, res) {
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
            name: {
              [Op.like]: `%${search}%`
            }
          },
          {
            email: {
              [Op.like]: `%${search}%`
            }
          },
          {
            website: {
              [Op.like]: `%${search}%`
            }
          }
        ]
      }
    };
    if (req.body.isActive === "true") {
      searchObj.where.isActive = true;
    } else if (req.body.isActive === "false") {
      searchObj.where.isActive = false;
    }
    let list_partner = await partner.findAndCountAll({
      where: searchObj.where,
      logging: console.log,
      subQuery: false,
      order: [[Sequelize.literal(`${sortBy}`), `${order}`]],
      attributes: [
        "partnerId",
        "name",
        "icon",
        "email",
        "phoneNumber",
        "website",
        "isActive",
        "createdAt"
      ],
      offset: offset,
      limit: limit
    });
    list_partner.rows.forEach(result => {
      // delete result.dataValues.category_image;
      result.dataValues.icon = `https://gunsbid-dev.s3-us-west-2.amazonaws.com/GunsBidCMS/partner/${result.dataValues.icon}`;
    });
    list_partner.total_records = list_partner.count;
    delete list_partner.count;
    return list_partner;
  },

  /* Change Status of Partner*/
  async updatePartnerStatus(req, res) {
    //status = true/false
    return await partner.update(
      {
        isActive: req.body.isActive
      },
      {
        where: {
          [Op.or]: [{ partnerId: req.body.partnerId }]
        }
      }
    );
  }
};
