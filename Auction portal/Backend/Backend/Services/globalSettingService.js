const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const constant = require("../Configs/constant");
const globalSettings = require("../Database/models").tbl_global_data_settings;
const globalDocumentNames = require("../Database/models")
  .tbl_global_document_names;
const globalDocumentTypes = require("../Database/models")
  .tbl_global_document_types;
const globalChargesSelectedColours = require("../Database/models")
  .tbl_global_charges_selected_colours;
const globalBidIncrements = require("../Database/models")
  .tbl_global_bid_increment_setting;

module.exports = {
  /* Add Category And Sub-category*/
  async addGlobalSettings(req) {
    let { body } = req;
    let settingsObj = {
      bannerRotationSpeed: body.bannerRotationSpeed,
    };

    let addGlobalSettingsRes = await globalSettings.create(settingsObj);

    return addGlobalSettingsRes;
  },

  /* View global settings*/
  async viewGlobalSettings(req, res) {
    let viewGlobalSettings = await globalSettings.findOne({
      where: {
        globalSettingsId: 1,
      },
      include: [
        {
          model: globalDocumentNames,
          as: "documentNames",
        },
        {
          model: globalDocumentTypes,
          as: "documentTypes",
        },
        {
          model: globalBidIncrements,
          as: "bidIncrements",
        },
        {
          model: globalChargesSelectedColours,
          as: "selectedColours",
        },
      ],
    });
    if (viewGlobalSettings) {
      return viewGlobalSettings;
    } else {
      return 0;
    }
  },

  /* Update Global Settings*/
  async updateGlobalSettings(req) {
    let { body } = req;
    console.log(body);
    let updateGlobalSettingsObj = {
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
      field: body.field || null,
      noOfColumnsWeb: body.noOfColumnsWeb || body.noOfColumnsWeb,
      noOfColumnsMobile: body.noOfColumnsMobile || body.noOfColumnsMobile,
      information: body.information || null,
      bannerRotationSpeed: body.bannerRotationSpeed && body.bannerRotationSpeed,
      showBidButton: body.showBidButton && body.showBidButton,
      showViewCount: body.showViewCount && body.showViewCount,
    };
    //updating document types
    body.documentType.length > 0 &&
      body.documentType.forEach(async (result) => {
        let documentTypeObj = {};
        documentTypeObj.documentTypeName = result;
        documentTypeObj.settingsId = 1;
        await globalDocumentTypes.create(documentTypeObj);
      });

    body.deletedDocumentTypeId &&
      body.deletedDocumentTypeId.length > 0 &&
      (await globalDocumentTypes.destroy({
        where: {
          globalDocumentTypeId: { [Op.in]: [body.deletedDocumentTypeId] },
        },
      }));

    //updating document names

    body.documentCategoryName.length > 0 &&
      body.documentCategoryName.forEach(async (result) => {
        let documentCategoryNameObj = {};
        documentCategoryNameObj.documentCategoryName = result;
        documentCategoryNameObj.settingsId = 1;
        await globalDocumentNames.create(documentCategoryNameObj);
      });

    body.deletedDocumentCategoryNameId &&
      body.deletedDocumentCategoryNameId.length > 0 &&
      (await globalDocumentNames.destroy({
        where: {
          globalDocumentNameId: { [Op.in]: [body.deletedDocumentCategoryNameId] },
        },
      }));

    //update selected colours
    //body.selectedColours &&
    body.selectedColours.length > 0 &&
      body.selectedColours.forEach(async (result) => {
        let selectedColourObj = {};
        selectedColourObj.selectedColour = result.color;
        selectedColourObj.settingsId = 1;
        await globalChargesSelectedColours.create(selectedColourObj);
      });

    body.deleteSelectedColourId &&
      body.deleteSelectedColourId.length > 0 &&
      (await globalChargesSelectedColours.destroy({
        where: {
          globalchargesSelectedColourId: {
            [Op.in]: [body.deleteSelectedColourId],
          },
        },
      }));

    //bid increment update
    let bidIncrement = body.bidIncrement && JSON.parse(body.bidIncrement);
    bidIncrement &&
      bidIncrement.length > 0 &&
      (await globalBidIncrements.bulkCreate(bidIncrement, {
        updateOnDuplicate: [
          "globalBidIncrementSettingId",
          "settingsId",
          "amount",
          "flag",
          "increment",
        ],
      }));
    body.deleted_bidIncrementId &&
      body.deleted_bidIncrementId.length > 0 &&
      (await globalBidIncrements.destroy({
        where: {
          globalBidIncrementSettingId: { [Op.in]: body.deleted_bidIncrementId },
        },
      }));

    return await globalSettings.update(updateGlobalSettingsObj, {
      where: {
        globalSettingsId: 1,
      },
    });
  },
};
