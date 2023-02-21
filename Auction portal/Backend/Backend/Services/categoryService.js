/*
 * Summary:     categoryServices file for handling all CATEGORY - CMS related actions.
 * Author:      Openxcell(empCode-473)
 */

/**require NPM-modules,models and constants for configuration */
const category = require("../Database/models").tbl_category;
const categoryImages = require("../Database/models").tbl_category_banner_image;
const categoryCharges = require("../Database/models").tbl_category_charges;
const categoryChargeSelectedColours = require("../Database/models")
  .tbl_category_charges_selected_colour;
const categoryMedia = require("../Database/models").tbl_category_media;
const categoryDocumentType = require("../Database/models")
  .tbl_category_document_type;
const categoryDocumentName = require("../Database/models")
  .tbl_category_document_name;
const categorySalesType = require("../Database/models").tbl_category_sales_type;
const categoryFields = require("../Database/models").tbl_category_field;
const categoryInformationGrid = require("../Database/models")
  .tbl_category_information_grid;
const layout = require("../Database/models").tbl_layout;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const constant = require("../Configs/constant");
const imageupload = require("../Middleware/multer_aws_upload");
const imageDelete = require("../Middleware/multer_aws_delete");

module.exports = {
  /* Add Category And Sub-category*/
  async addCategory(req, res) {
    let { body, files } = req;
    let categoryObj = {
      name: body.name,
      singularName: body.singularName && body.singularName,
      pluralName: body.pluralName && body.pluralName,
      showBorder: body.showBorder && body.showBorder,
      borderWeight: body.borderWeight && body.borderWeight,
      categoryKeyId: Math.floor(100000 + Math.random() * 900000),
    };
    //selecting category type
    if (body.categoryType === "MainCategory") {
      categoryObj.mainCategoryId = null;
      categoryObj.parentCategoryId = null;
      categoryObj.categoryType = body.categoryType;
      categoryObj.percentageOnExtraAmount = body.percentageOnExtraAmount || 5;
      categoryObj.discountOnProductListing =
        body.discountOnProductListing || 10;
    } else if (body.categoryType === "ParentCategory") {
      categoryObj.mainCategoryId = body.mainCategoryId;
      categoryObj.parentCategoryId = null;
      categoryObj.categoryType = body.categoryType;
      categoryObj.percentageOnExtraAmount = body.percentageOnExtraAmount || 10;
      categoryObj.discountOnProductListing =
        body.discountOnProductListing || 20;
    } else if (body.categoryType === "ChildCategory") {
      categoryObj.mainCategoryId = body.mainCategoryId;
      categoryObj.parentCategoryId = body.parentCategoryId;
      categoryObj.categoryType = body.categoryType;
      categoryObj.percentageOnExtraAmount = body.percentageOnExtraAmount || 15;
      categoryObj.discountOnProductListing =
        body.discountOnProductListing || 10;
    } else {
      return 0;
    }

    //image place
    if (body.mainLayoutImagePlace === "Icon") {
      categoryObj.mainLayoutImagePlace = body.mainLayoutImagePlace;
      categoryObj.layoutId = null;
      categoryObj.position = null;
    } else if (body.mainLayoutImagePlace === "SlideShow") {
      categoryObj.mainLayoutImagePlace = body.mainLayoutImagePlace;
      categoryObj.layoutId = body.layoutId;
      categoryObj.position = body.position;
    } else {
      categoryObj.mainLayoutImagePlace = null;
      categoryObj.layoutId = null;
      categoryObj.position = null;
    }
    let addCategoryRes = await category.create(categoryObj);

    //category image and main layout image
    files &&
      files.length > 0 &&
      files.forEach(async (result) => {
        if (result.fieldname === "image") {
          await category.update(
            {
              image: addCategoryRes.categoryId + "_" + result.originalname,
            },
            {
              where: {
                categoryId: addCategoryRes.categoryId,
              },
            }
          );
          await imageupload(
            result,
            constant.AWSS3PROJECTFOLDER +
              constant.AWSS3CATEGORYFOLDER +
              constant.AWSS3CATEGORYIMAGEFOLDER +
              addCategoryRes.categoryId +
              "_" +
              result.originalname
          );
        } else if (result.fieldname === "mainLayoutImage") {
          await category.update(
            {
              mainLayoutImage:
                addCategoryRes.categoryId + "i_" + result.originalname,
            },
            {
              where: {
                categoryId: addCategoryRes.categoryId,
              },
            }
          );
          await imageupload(
            result,
            constant.AWSS3PROJECTFOLDER +
              constant.AWSS3CATEGORYFOLDER +
              constant.AWSS3MAINLAYOUTIMAGEFOLDER +
              addCategoryRes.categoryId +
              "i_" +
              result.originalname
          );
        }
      });

    //category charges obj
    let categoryChargesObj = {
      categoryId: addCategoryRes.categoryId,
      boldFaceTitle: body.boldFaceTitle || null,
      coloredTitle: body.coloredTitle || null,
      featuredListing: body.featuredListing || null,
      highLightedListing: body.highLightedListing || null,
      scheduledListing: body.scheduledListing || null,
      showcaseListing: body.showcaseListing || null,
      subTitleListing: body.subTitleListing || null,
      viewCounter: body.viewCounter || null,
      insertionFee: body.insertionFee || null,
      auctionListing: body.auctionListing || null,
      fixedPriceListing: body.fixedPriceListing || null,
      contactSellerListing: body.contactSellerListing || null,
      inquiryListing: body.inquiryListing || null,
      maxFee: body.maxFee || null,
      autoRenewListing: body.autoRenewListing || null,
    };

    let charges = await categoryCharges.create(categoryChargesObj);
    if (body.selectedColours && JSON.parse(body.selectedColours).length > 0) {
      JSON.parse(body.selectedColours).forEach(async (result) => {
        let colourObj = {};
        colourObj.selectedColour = result.color;
        colourObj.categoryChargesId = charges.categoryChargesId;
        colourObj.categoryId = addCategoryRes.categoryId;
        await categoryChargeSelectedColours.create(colourObj);
      });
    }

    //category media obj
    let categoryMediaObj = {
      categoryId: addCategoryRes.categoryId,
      imageAvailable: body.imageAvailable,
      noOfFreeImages: body.noOfFreeImages || null,
      maxImages: body.maxImages || null,
      pricePerImage: body.pricePerImage || null,
      documentAvailable: body.documentAvailable,
      documentName: body.documentName || null,
      maxDocuments: body.maxDocuments || null,
      videoAvailable: body.videoAvailable,
      maxTitleLength: body.maxTitleLength || null,
      maxDescriptionLength: body.maxDescriptionLength || null,
      maxFreeVideos: body.maxFreeVideos || null,
      maxVideos: body.maxVideos || null,
      pricePerVideo: body.pricePerVideo || null,
      maxVideoSize: body.maxVideoSize || null,
    };
    await categoryMedia.create(categoryMediaObj);

    //accepted document types
    /*let documentTypeArr = [];
      if (
      JSON.parse(body.documentType) &&
      JSON.parse(body.documentType).length > 0
    ) {
      let data = JSON.parse(body.documentType);
      data.forEach((result) => {
        let documentTypeObj = {};
        documentTypeObj.documentTypeName = result;
        documentTypeObj.categoryId = addCategoryRes.categoryId;
        documentTypeArr.push(documentTypeObj);
      });
      await categoryDocumentType.bulkCreate(documentTypeArr);
    }

    //required document names
    let documentCategoryNameArr = [];
    if (
      JSON.parse(body.mediaDocumentCategoryName) &&
      JSON.parse(body.mediaDocumentCategoryName).length > 0
    ) {
      let data = JSON.parse(body.mediaDocumentCategoryName);
      data.forEach((result) => {
        let documentCategoryNameObj = {};
        documentCategoryNameObj.documentCategoryName = result;
        documentCategoryNameObj.categoryId = addCategoryRes.categoryId;
        console.log(documentCategoryNameObj);
        documentCategoryNameArr.push(documentCategoryNameObj);
      });
      await categoryDocumentName.bulkCreate(documentCategoryNameArr);
    }
 */
    //for local testing
    //accepted document types
    let documentTypeArr = [];
    if (body.documentType && body.documentType.length > 0) {
      let data = JSON.parse(body.documentType);
      data.forEach((result) => {
        let documentTypeObj = {};
        documentTypeObj.documentTypeName = result;
        documentTypeObj.categoryId = addCategoryRes.categoryId;
        documentTypeArr.push(documentTypeObj);
      });
      await categoryDocumentType.bulkCreate(documentTypeArr);
    }

    //required document names
    let documentCategoryNameArr = [];
    if (
      body.mediaDocumentCategoryName &&
      body.mediaDocumentCategoryName.length > 0
    ) {
      let data = JSON.parse(body.mediaDocumentCategoryName);
      data.forEach((result) => {
        let documentCategoryNameObj = {};
        documentCategoryNameObj.documentCategoryName = result;
        documentCategoryNameObj.categoryId = addCategoryRes.categoryId;
        console.log(documentCategoryNameObj);
        documentCategoryNameArr.push(documentCategoryNameObj);
      });
      await categoryDocumentName.bulkCreate(documentCategoryNameArr);
    }

    //category sales type obj
    let categorySalesTypeObj = {
      categoryId: addCategoryRes.categoryId,
      auctionAvailable: body.auctionAvailable,
      buyItOption: body.buyItOption,
      baseFee: body.baseFee || null,
      percentageOfBasePrice: body.percentageOfBasePrice || null,
      percentageOfIncrease: body.percentageOfIncrease || null,
      maxFee: body.auctionMaxFee || null,
      buyersPremium: body.buyersPremium,
      fixedPriceAvailable: body.fixedPriceAvailable,
      priceToList: body.priceToList || null,
      percentageOfFixedPrice: body.percentageOfFixedPrice || null,
      maxFeeOfFixedPrice: body.maxFeeOfFixedPrice || null,
      contactSellerAvailable: body.contactSellerAvailable,
      displayPrice: body.displayPrice,
      displaySellerPhoneNumber: body.displaySellerPhoneNumber,
      displaySellerName: body.displaySellerName,
      displayContactForm: body.displayContactForm,
      priceToListForContact: body.priceToListForContact || null,
      percentageOfPriceForContact: body.percentageOfPriceForContact || null,
      maxFeeForContact: body.maxFeeForContact || null,
      pricePerInquiry: body.pricePerInquiry || null,
    };
    await categorySalesType.create(categorySalesTypeObj);

    //category description fields obj
    if (body.field) {
      let categoryFieldObj = {
        categoryId: addCategoryRes.categoryId,
        field: JSON.parse(body.field) || null,
      };
      await categoryFields.create(categoryFieldObj);
    }

    if (body.information) {
      //category information grids obj
      let categoryInformationGridObj = {
        categoryId: addCategoryRes.categoryId,
        noOfColumnsWeb: body.noOfColumnsWeb,
        noOfColumnsMobile: body.noOfColumnsMobile,
        information: JSON.parse(body.information) || null,
      };
      await categoryInformationGrid.create(categoryInformationGridObj);
    }

    return addCategoryRes;
  },

  /*check position in layout*/
  async checkPosition(layoutId, position) {
    let findLayout = await layout.findOne({
      where: { layoutId: layoutId },
    });
    if (position <= findLayout.dataValues.noOfImages) {
      return true;
    } else {
      return false;
    }
  },

  /* find Image with same position and layout*/
  async findImage(req, res) {
    return await category.findOne({
      where: {
        [Op.and]: [
          { layoutId: req.body.layoutId },
          { position: req.body.position },
        ],
      },
    });
  },

  /* Delete Category And Sub-category*/
  async deleteCategory(req, res) {
    let findCategory = await category.findOne({
      where: {
        categoryId: req.body.categoryId,
      },
    });

    let findSubCategories, findCategoryImages;
    let categoryIdArray = [];

    if (findCategory.categoryType === "MainCategory") {
      findSubCategories = await category.findAll({
        where: {
          mainCategoryId: req.body.categoryId,
        },
      });

      findSubCategories.forEach((result) => {
        categoryIdArray.push(result.dataValues.categoryId);
      });

      findCategoryImages = await categoryImages.findAll({
        where: {
          [Op.or]: [
            { categoryId: req.body.categoryId },
            {
              categoryId: { [Op.in]: categoryIdArray },
            },
          ],
        },
      });

      findCategoryImages &&
        findCategoryImages.length > 0 &&
        findCategoryImages.forEach(async (result) => {
          await imageDelete(
            constant.AWSS3PROJECTFOLDER +
              constant.AWSS3CATEGORYFOLDER +
              result.name
          );
        });

      if (findCategory.bannerImage) {
        await imageDelete(
          constant.AWSS3PROJECTFOLDER +
            constant.AWSS3CATEGORYFOLDER +
            constant.AWSS3BANNERIMAGEFOLDER +
            findCategory.bannerImage
        );
      }
      if (findCategory.icon) {
        await imageDelete(
          constant.AWSS3PROJECTFOLDER +
            constant.AWSS3CATEGORYFOLDER +
            constant.AWSS3ICONFOLDER +
            findCategory.icon
        );
      }

      return await category.destroy({
        where: {
          [Op.or]: [
            { categoryId: req.body.categoryId },
            { categoryId: { [Op.in]: categoryIdArray } },
          ],
        },
      });
    } else if (findCategory.categoryType === "ParentCategory") {
      findSubCategories = await category.findAll({
        where: {
          parentCategoryId: req.body.categoryId,
        },
      });

      findSubCategories.forEach((result) => {
        categoryIdArray.push(result.dataValues.categoryId);
      });

      findCategoryImages = await categoryImages.findAll({
        where: {
          [Op.or]: [
            { categoryId: req.body.categoryId },
            {
              categoryId: { [Op.in]: categoryIdArray },
            },
          ],
        },
      });

      findCategoryImages &&
        findCategoryImages.length > 0 &&
        findCategoryImages.forEach(async (result) => {
          await imageDelete(
            constant.AWSS3PROJECTFOLDER +
              constant.AWSS3CATEGORYFOLDER +
              result.name
          );
        });

      if (findCategory.bannerImage) {
        await imageDelete(
          constant.AWSS3PROJECTFOLDER +
            constant.AWSS3CATEGORYFOLDER +
            constant.AWSS3BANNERIMAGEFOLDER +
            findCategory.bannerImage
        );
      }
      if (findCategory.icon) {
        await imageDelete(
          constant.AWSS3PROJECTFOLDER +
            constant.AWSS3CATEGORYFOLDER +
            constant.AWSS3ICONFOLDER +
            findCategory.icon
        );
      }

      return await category.destroy({
        where: {
          [Op.or]: [
            { categoryId: req.body.categoryId },
            { categoryId: { [Op.in]: categoryIdArray } },
          ],
        },
      });
    } else if (findCategory.categoryType === "ChildCategory") {
      findCategoryImages = await categoryImages.findAll({
        where: {
          categoryId: req.body.categoryId,
        },
      });
      findCategoryImages &&
        findCategoryImages.length > 0 &&
        findCategoryImages.forEach(async (result) => {
          await imageDelete(
            constant.AWSS3PROJECTFOLDER +
              constant.AWSS3CATEGORYFOLDER +
              result.name
          );
        });
      if (findCategory.bannerImage) {
        await imageDelete(
          constant.AWSS3PROJECTFOLDER +
            constant.AWSS3CATEGORYFOLDER +
            constant.AWSS3BANNERIMAGEFOLDER +
            findCategory.bannerImage
        );
      }
      if (findCategory.icon) {
        await imageDelete(
          constant.AWSS3PROJECTFOLDER +
            constant.AWSS3CATEGORYFOLDER +
            constant.AWSS3ICONFOLDER +
            findCategory.icon
        );
      }
      return await category.destroy({
        where: {
          categoryId: req.body.categoryId,
        },
      });
    }

    /*   findCategoryImages &&
      findCategoryImages.length > 0 &&
      findCategoryImages.forEach(async (result) => {
        await imageDelete(
          constant.AWSS3PROJECTFOLDER +
            constant.AWSS3CATEGORYFOLDER +
            result.name
        );
      });
    if (findCategory.bannerImage) {
      await imageDelete(
        constant.AWSS3PROJECTFOLDER +
          constant.AWSS3CATEGORYFOLDER +
          constant.AWSS3BANNERIMAGEFOLDER +
          findCategory.bannerImage
      );
    }
    if (findCategory.icon) {
      await imageDelete(
        constant.AWSS3PROJECTFOLDER +
          constant.AWSS3CATEGORYFOLDER +
          constant.AWSS3ICONFOLDER +
          findCategory.icon
      );
    }
    await categoryCharges.destroy({
      where: {
        categoryId: req.body.categoryId,
      },
    });
    return await category.destroy({
      where: {
        [Op.and]: [
          { categoryId: req.body.categoryId },
          { categoryId: { [Op.in]: findSubCategories } },
        ],
      },
    }); */
  },

  /* View Category And Sub-category*/
  async getCategoryById(req, res) {
    let getCategory = await category.findOne({
      where: {
        categoryId: req.params.categoryId,
      },
      attributes: [
        "categoryId",
        "name",
        "singularName",
        "pluralName",
        "categoryKeyId",
        "image",
        "mainLayoutImage",
        "mainLayoutImagePlace",
        "position",
        "borderWeight",
        "showBorder",
        "categoryType",
        "percentageOnExtraAmount",
        "discountOnProductListing",
        "isActive",
      ],
      distinct: true,
      include: [
        {
          model: category,
          attributes: ["categoryId", "name"],
          as: "parentCategory",
        },
        {
          model: category,
          attributes: ["categoryId", "name"],
          as: "mainCategory",
        },
        {
          model: layout,
          attributes: ["layoutId", "noOfImages"],
          as: "layout",
        },
        {
          model: categoryCharges,
          attributes: [
            "boldFaceTitle",
            "coloredTitle",
            "featuredListing",
            "highLightedListing",
            "scheduledListing",
            "showcaseListing",
            "subTitleListing",
            "viewCounter",
            "insertionFee",
            "auctionListing",
            "fixedPriceListing",
            "contactSellerListing",
            "inquiryListing",
            "maxFee",
            "autoRenewListing",
          ],
          as: "categoryCharges",
          include: [
            {
              model: categoryChargeSelectedColours,
              as: "selectedColours",
            },
          ],
        },
        {
          model: categoryMedia,
          attributes: [
            "imageAvailable",
            "noOfFreeImages",
            "maxImages",
            "pricePerImage",
            "documentAvailable",
            "documentName",
            "maxDocuments",
            "videoAvailable",
            "maxTitleLength",
            "maxDescriptionLength",
            "maxFreeVideos",
            "maxVideos",
            "pricePerVideo",
            "maxVideoSize",
          ],
          as: "categoryMedia",
        },
        {
          model: categoryDocumentType,
          attributes: ["categoryDocumentTypeId", "documentTypeName"],
          as: "categoryDocumentType",
        },
        {
          model: categoryDocumentName,
          attributes: ["categoryDocumentNameId", "documentCategoryName"],
          as: "categoryMediaDocumentCategoryName",
        },
        {
          model: categorySalesType,
          attributes: {
            exclude: [
              "categorySalesTypeId",
              "categoryId",
              "createdAt",
              "updatedAt",
            ],
          },
          as: "categorySalesType",
        },
        {
          model: categoryFields,
          attributes: ["categoryFieldId", "field"],
          as: "categoryFields",
        },
        {
          model: categoryInformationGrid,
          attributes: [
            "categoryInformationGridId",
            "noOfColumnsWeb",
            "noOfColumnsMobile",
            "information",
          ],
          as: "categoryInformationGrids",
        },
      ],
    });
    getCategory.dataValues.image = `https://gunsbid-dev.s3-us-west-2.amazonaws.com/GunsBidCMS/category/image/${getCategory.dataValues.image}`;
    getCategory.dataValues.mainLayoutImage = `https://gunsbid-dev.s3-us-west-2.amazonaws.com/GunsBidCMS/category/main_layout_image/${getCategory.dataValues.mainLayoutImage}`;
    return getCategory;
  },

  /* Update Category And Sub-category*/
  async updateCategory(req, res) {
    let { body, files } = req;
    let findCategory = await category.findOne({
      where: {
        categoryId: req.body.categoryId,
        isActive: true,
      },
    });
    if (findCategory) {
      //category updation
      let updateCategoryObj = {
        name: body.name && body.name,
        singularName: body.singularName && body.singularName,
        pluralName: body.pluralName && body.pluralName,
        showBorder: body.showBorder && body.showBorder,
        borderWeight: body.borderWeight && body.borderWeight,
        percentageOnExtraAmount:
          body.percentageOnExtraAmount && body.percentageOnExtraAmount,
        discountOnProductListing:
          body.discountOnProductListing && body.discountOnProductListing,
        mainCategoryId: body.mainCategoryId && body.mainCategoryId,
        parentCategoryId: body.parentCategoryId && body.parentCategoryId,
      };

      //category type updation
      if (body.categoryType) {
        if (body.categoryType === "MainCategory") {
          updateCategoryObj.mainCategoryId = null;
          updateCategoryObj.parentCategoryId = null;
          updateCategoryObj.categoryType = body.categoryType;
        } else if (body.categoryType === "ParentCategory") {
          updateCategoryObj.mainCategoryId = body.mainCategoryId;
          updateCategoryObj.parentCategoryId = null;
          updateCategoryObj.categoryType = body.categoryType;
        } else if (body.categoryType === "ChildCategory") {
          updateCategoryObj.mainCategoryId = body.mainCategoryId;
          updateCategoryObj.parentCategoryId = body.parentCategoryId;
          updateCategoryObj.categoryType = body.categoryType;
        }
      }

      //image place updation
      if (body.mainLayoutImagePlace === "Icon") {
        updateCategoryObj.mainLayoutImagePlace = body.mainLayoutImagePlace;
        updateCategoryObj.layoutId = null;
        updateCategoryObj.position = null;
      } else if (body.mainLayoutImagePlace === "SlideShow") {
        updateCategoryObj.mainLayoutImagePlace = body.mainLayoutImagePlace;
        updateCategoryObj.layoutId = body.layoutId;
        updateCategoryObj.position = body.position;
      } else {
        updateCategoryObj.mainLayoutImagePlace = null;
        updateCategoryObj.layoutId = null;
        updateCategoryObj.position = null;
      }

      await category.update(updateCategoryObj, {
        where: { categoryId: body.categoryId },
        logging: console.log,
      });

      //charges updation
      let updateCategoryChargesObj = {
        boldFaceTitle: body.boldFaceTitle || null,
        coloredTitle: body.coloredTitle || null,
        featuredListing: body.featuredListing || null,
        highLightedListing: body.highLightedListing || null,
        scheduledListing: body.scheduledListing || null,
        showcaseListing: body.showcaseListing || null,
        subTitleListing: body.subTitleListing || null,
        viewCounter: body.viewCounter || null,
        insertionFee: body.insertionFee || null,
        auctionListing: body.auctionListing || null,
        fixedPriceListing: body.fixedPriceListing || null,
        contactSellerListing: body.contactSellerListing || null,
        inquiryListing: body.inquiryListing || null,
        maxFee: body.maxFee || null,
        autoRenewListing: body.autoRenewListing || null,
      };

      let findCharges = await categoryCharges.findOne({
        where: {
          categoryId: findCategory.categoryId,
        },
      });
      await categoryCharges.update(updateCategoryChargesObj, {
        where: { categoryId: findCategory.categoryId },
        logging: console.log,
      });

      //update selected colours
      body.selectedColours &&
        findCharges &&
        JSON.parse(body.selectedColours).length > 0 &&
        JSON.parse(body.selectedColours).forEach(async (result) => {
          let selectedColourObj = {};
          selectedColourObj.selectedColour = result.color;
          selectedColourObj.categoryId = body.categoryId;
          selectedColourObj.categoryChargesId = findCharges.categoryChargesId;
          await categoryChargeSelectedColours.create(selectedColourObj);
        });

      body.deleteSelectedColourId &&
        body.deleteSelectedColourId.length > 0 &&
        (await categoryChargeSelectedColours.destroy({
          where: {
            selectedColourId: { [Op.in]: [body.deleteSelectedColourId] },
          },
        }));

      //images updation
      if (files && files.length > 0) {
        files.forEach(async (result) => {
          if (result.fieldname === "image") {
            //delete an old image
            await imageDelete(
              constant.AWSS3PROJECTFOLDER +
                constant.AWSS3CATEGORYFOLDER +
                constant.AWSS3CATEGORYIMAGEFOLDER +
                findCategory.image
            );

            //upload a new image
            await category.update(
              {
                image: findCategory.categoryId + "_" + result.originalname,
              },
              {
                where: {
                  categoryId: findCategory.categoryId,
                },
              }
            );
            await imageupload(
              result,
              constant.AWSS3PROJECTFOLDER +
                constant.AWSS3CATEGORYFOLDER +
                constant.AWSS3CATEGORYIMAGEFOLDER +
                findCategory.categoryId +
                "_" +
                result.originalname
            );
          } else if (result.fieldname === "mainLayoutImage") {
            //delete an old icon
            await imageDelete(
              constant.AWSS3PROJECTFOLDER +
                constant.AWSS3CATEGORYFOLDER +
                constant.AWSS3MAINLAYOUTIMAGEFOLDER +
                findCategory.mainLayoutImage
            );

            //upload a new icon
            await category.update(
              {
                mainLayoutImage:
                  findCategory.categoryId + "i_" + result.originalname,
              },
              {
                where: {
                  categoryId: findCategory.categoryId,
                },
              }
            );
            await imageupload(
              result,
              constant.AWSS3PROJECTFOLDER +
                constant.AWSS3CATEGORYFOLDER +
                constant.AWSS3MAINLAYOUTIMAGEFOLDER +
                findCategory.categoryId +
                "i_" +
                result.originalname
            );
          }
        });
      }

      // category media updation
      let updateCategoryMediaObj = {
        imageAvailable: body.imageAvailable && body.imageAvailable,
        noOfFreeImages: body.noOfFreeImages || null,
        maxImages: body.maxImages || null,
        pricePerImage: body.pricePerImage || null,
        documentAvailable: body.documentAvailable && body.documentAvailable,
        documentName: body.documentName || null,
        maxDocuments: body.maxDocuments || null,
        videoAvailable: body.videoAvailable && body.videoAvailable,
        maxTitleLength: body.maxTitleLength || null,
        maxDescriptionLength: body.maxDescriptionLength || null,
        maxFreeVideos: body.maxFreeVideos || null,
        maxVideos: body.maxVideos || null,
        pricePerVideo: body.pricePerVideo || null,
        maxVideoSize: body.maxVideoSize || null,
      };

      await categoryMedia.update(updateCategoryMediaObj, {
        where: { categoryId: findCategory.categoryId },
        logging: console.log,
      });

      //updating document types
      let documentTypeArr = [];
      body.documentType &&
        body.documentType.length > 0 &&
        JSON.parse(body.documentType).forEach((result) => {
          let documentTypeObj = {};
          documentTypeObj.documentTypeName = result;
          documentTypeObj.categoryId = body.categoryId;
          documentTypeArr.push(documentTypeObj);
        });
      await categoryDocumentType.bulkCreate(documentTypeArr);

      /* //updating document types
      let documentTypeArr = [];
      JSON.parse(body.documentType) &&
        JSON.parse(body.documentType).length > 0 &&
        JSON.parse(body.documentType).forEach((result) => {
          let documentTypeObj = {};
          documentTypeObj.documentTypeName = result;
          documentTypeObj.categoryId = body.categoryId;
          documentTypeArr.push(documentTypeObj);
        });
      await categoryDocumentType.bulkCreate(documentTypeArr); */

      body.deletedDocumentTypeId &&
        body.deletedDocumentTypeId.length > 0 &&
        (await categoryDocumentType.destroy({
          where: {
            categoryDocumentTypeId: { [Op.in]: [body.deletedDocumentTypeId] },
          },
        }));

      //updating document category names
      let documentCategoryNameArr = [];
      body.documentCategoryName &&
        body.documentCategoryName.length > 0 &&
        JSON.parse(body.documentCategoryName).forEach((result) => {
          let documentCategoryNameObj = {};
          documentCategoryNameObj.documentCategoryName = result;
          documentCategoryNameObj.categoryId = body.categoryId;
          documentCategoryNameArr.push(documentCategoryNameObj);
        });
      await categoryDocumentName.bulkCreate(documentCategoryNameArr);

      /*  let documentName = body.documentNames && JSON.parse(body.documentNames);
      documentName &&
        documentName.length > 0 &&
        (await categoryDocumentName.bulkCreate(documentName));
 */
      console.log(body.deletedDocumentNameId);
      body.deletedDocumentNameId &&
        body.deletedDocumentNameId.length > 0 &&
        (await categoryDocumentName.destroy({
          where: {
            categoryDocumentNameId: { [Op.in]: [body.deletedDocumentNameId] },
          },
        }));
    }

    // category sales type updation
    let updateCategorySalesTypeObj = {
      auctionAvailable: body.auctionAvailable && body.auctionAvailable,
      buyItOption: body.buyItOption && body.buyItOption,
      baseFee: body.baseFee || null,
      percentageOfBasePrice: body.percentageOfBasePrice || null,
      percentageOfIncrease: body.percentageOfIncrease || null,
      maxFee: body.auctionMaxFee || null,
      buyersPremium: body.buyersPremium && body.buyersPremium,
      fixedPriceAvailable: body.fixedPriceAvailable && body.fixedPriceAvailable,
      priceToList: body.priceToList || null,
      percentageOfFixedPrice: body.percentageOfFixedPrice || null,
      maxFeeOfFixedPrice: body.maxFeeOfFixedPrice || null,
      contactSellerAvailable:
        body.contactSellerAvailable && body.contactSellerAvailable,
      displayPrice: body.displayPrice && body.displayPrice,
      displaySellerPhoneNumber:
        body.displaySellerPhoneNumber && body.displaySellerPhoneNumber,
      displaySellerName: body.displaySellerName && body.displaySellerName,
      displayContactForm: body.displayContactForm && body.displayContactForm,
      priceToListForContact: body.priceToListForContact || null,
      percentageOfPriceForContact: body.percentageOfPriceForContact || null,
      maxFeeForContact: body.maxFeeForContact || null,
      pricePerInquiry: body.pricePerInquiry || null,
    };

    await categorySalesType.update(updateCategorySalesTypeObj, {
      where: { categoryId: findCategory.categoryId },
      logging: console.log,
    });

    // category description fields updation

    let updateCategoryFieldObj = {
      field: body.field || null,
    };
    await categoryFields.update(updateCategoryFieldObj, {
      where: { categoryId: findCategory.categoryId },
      logging: console.log,
    });

    // category information grids updation

    let updateInformationGridObj = {
      noOfColumnsWeb: body.noOfColumnsWeb || body.noOfColumnsWeb,
      noOfColumnsMobile: body.noOfColumnsMobile || body.noOfColumnsMobile,
      information: body.information || null,
    };
    await categoryInformationGrid.update(updateInformationGridObj, {
      where: { categoryId: findCategory.categoryId },
      logging: console.log,
    });
  },

  /* List Category And Sub-category*/
  async listCategory(req, res) {
    try {
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
                [Op.like]: `%${search}%`,
              },
            },
            {
              "$parentCategory.name$": {
                [Op.like]: `%${search}%`,
              },
            },
            {
              "$mainCategory.name$": {
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
      if (req.body.type === "MainCategory") {
        searchObj.where = {
          [Op.and]: [{ parentCategoryId: null }, { mainCategoryId: null }],
        };
      } else if (req.body.type === "ParentCategory") {
        searchObj.where = {
          [Op.and]: [
            { parentCategoryId: null },
            { mainCategoryId: req.body.mainCategoryId },
          ],
        };
      } else if (req.body.type === "ChildCategory") {
        searchObj.where = {
          [Op.and]: [
            { parentCategoryId: req.body.parentCategoryId },
            { mainCategoryId: req.body.mainCategoryId },
          ],
        };
      }
      let list_cat = await category.findAndCountAll({
        where: searchObj.where,
        logging: console.log,
        subQuery: false,
        attributes: [
          "categoryId",
          "name",
          "singularName",
          "pluralName",
          "categoryKeyId",
          "image",
          "mainLayoutImage",
          "mainLayoutImagePlace",
          "position",
          "showBorder",
          "borderWeight",
          "categoryType",
          "percentageOnExtraAmount",
          "discountOnProductListing",
          "createdAt",
          "isActive",
        ],
        distinct: true,
        include: [
          {
            model: category,
            attributes: ["categoryId", "name"],
            as: "parentCategory",
            required: false,
          },
          {
            model: category,
            attributes: ["categoryId", "name"],
            as: "mainCategory",
            required: false,
          },
          {
            model: layout,
            attributes: ["layoutId", "noOfImages"],
            as: "layout",
          },
          {
            model: categoryCharges,
            attributes: [
              "boldFaceTitle",
              "coloredTitle",
              "featuredListing",
              "highLightedListing",
              "scheduledListing",
              "showcaseListing",
              "subTitleListing",
              "viewCounter",
              "insertionFee",
              "auctionListing",
              "fixedPriceListing",
              "contactSellerListing",
              "inquiryListing",
              "maxFee",
              "autoRenewListing",
            ],
            as: "categoryCharges",
            include: [
              {
                model: categoryChargeSelectedColours,
                as: "selectedColours",
              },
            ],
          },
          {
            model: categoryMedia,
            attributes: [
              "imageAvailable",
              "noOfFreeImages",
              "maxImages",
              "pricePerImage",
              "documentAvailable",
              "documentName",
              "maxDocuments",
              "videoAvailable",
              "maxTitleLength",
              "maxDescriptionLength",
              "maxFreeVideos",
              "maxVideos",
              "pricePerVideo",
              "maxVideoSize",
            ],
            as: "categoryMedia",
          },
          {
            model: categoryDocumentType,
            attributes: ["categoryDocumentTypeId", "documentTypeName"],
            as: "categoryDocumentType",
            separate: true,
          },
          {
            model: categoryDocumentName,
            attributes: ["categoryDocumentNameId", "documentCategoryName"],
            as: "categoryMediaDocumentCategoryName",
            separate: true,
          },
          {
            model: categorySalesType,
            attributes: {
              exclude: [
                "categorySalesTypeId",
                "categoryId",
                "createdAt",
                "updatedAt",
              ],
            },
            as: "categorySalesType",
          },
          {
            model: categoryFields,
            attributes: {
              exclude: ["categoryId", "createdAt", "updatedAt"],
            },
            as: "categoryFields",
          },
          {
            model: categoryInformationGrid,
            attributes: {
              exclude: ["categoryId", "createdAt", "updatedAt"],
            },
            as: "categoryInformationGrids",
          },
        ],
        offset: offset,
        limit: limit,
      });
      list_cat.rows.forEach((result) => {
        result.dataValues.image = `https://gunsbid-dev.s3-us-west-2.amazonaws.com/GunsBidCMS/category/image/${result.dataValues.image}`;
        result.dataValues.mainLayoutImage = `https://gunsbid-dev.s3-us-west-2.amazonaws.com/GunsBidCMS/category/main_layout_image/${result.dataValues.mainLayoutImage}`;
      });
      list_cat.total_records = list_cat.count;
      delete list_cat.count;
      return list_cat;
    } catch (error) {
      console.log("listCategory -> error", error);
    }
  },

  /* Change Status of Category And Sub-category*/
  async updateCategoryStatus(req, res) {
    //status = true/false
    find_cat = await category.findOne({
      where: { categoryId: req.body.categoryId },
    });
    if (
      find_cat.mainCategoryId === null &&
      find_cat.parentCategoryId === null
    ) {
      await category.update(
        {
          isActive: req.body.isActive,
        },
        {
          where: {
            [Op.or]: [
              { categoryId: req.body.categoryId },
              { mainCategoryId: req.body.categoryId },
            ],
          },
        }
      );
      return true;
    } else if (
      find_cat.parentCategoryId === null &&
      find_cat.mainCategoryId !== null
    ) {
      find_main_cat = await category.findOne({
        where: { categoryId: find_cat.mainCategoryId },
      });
      if (find_main_cat.isActive === true) {
        await category.update(
          {
            isActive: req.body.isActive,
          },
          {
            where: {
              [Op.or]: [
                { categoryId: req.body.categoryId },
                { parentCategoryId: req.body.categoryId },
              ],
            },
          }
        );
      }
      return find_main_cat.isActive;
    } else {
      find_parent_cat = await category.findOne({
        where: { categoryId: find_cat.parentCategoryId },
      });
      if (find_parent_cat.isActive === true) {
        await category.update(
          {
            isActive: req.body.isActive,
          },
          {
            where: {
              categoryId: req.body.categoryId,
            },
          }
        );
      }
      return find_parent_cat.isActive;
    }
  },

  /*Category Dropdown */
  async categoryDropdown(req, res) {
    let searchObj;
    console.log(req.body);
    if (req.body.type === "MainCategory") {
      //will show main category
      searchObj = {
        where: {
          parentCategoryId: null,
          mainCategoryId: null,
          isActive: true,
        },
      };
    } else if (req.body.type === "ParentCategory") {
      //will show parentCategory
      searchObj = {
        where: {
          mainCategoryId: req.body.mainCategoryId,
          parentCategoryId: null,
          isActive: true,
        },
      };
    } else if (req.body.type === "ChildCategory") {
      searchObj = {
        where: {
          mainCategoryId: req.body.mainCategoryId,
          parentCategoryId: req.body.parentCategoryId,
          isActive: true,
        },
      };
    }

    let dropdown_Cat = await category.findAll({
      where: searchObj.where,
      attributes: ["categoryId", "name"],
    });

    return dropdown_Cat;
  },

  /*main category Dropdown */
  async mainCategoryDropdown(req, res) {
    return await category.findAll({
      where: {
        parentCategoryId: null,
        mainCategoryId: null,
        isActive: true,
      },
      attributes: ["categoryId", "name", "icon"],
    });
  },

  /*parent category Dropdown */
  async parentCategoryDropdown(req, res) {
    return await category.findAll({
      where: {
        mainCategoryId: { [Op.ne]: null },
        parentCategoryId: null,
        isActive: true,
      },
      attributes: ["categoryId", "name", "icon"],
    });
  },

  /*sub category Dropdown */
  async subCategoryDropdown(req, res) {
    return await category.findAll({
      where: {
        parentCategoryId: { [Op.ne]: null },
        mainCategoryId: { [Op.ne]: null },
        isActive: true,
      },
      attributes: ["categoryId", "name", "icon"],
    });
  },
};
