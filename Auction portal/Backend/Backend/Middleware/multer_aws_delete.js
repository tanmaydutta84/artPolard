// Used to interact with AWS Service
var AWS = require("aws-sdk");
const fs = require("fs");
AWS.config.loadFromPath("./Configs/awsConfig.json");
var s3 = new AWS.S3({
  params: {
    Bucket: "gunsbid-dev",
  },
});

function s3Delete(path) {
  return s3.deleteObject(
    {
      Bucket: "gunsbid-dev",
      Key: path,
    },
    function (err, data) {
      if (err) {
        console.log("err", err);
      }
      // console.log("Successfully deleted image on Amazon S3 ", data);
    }
  );
}

module.exports = s3Delete;
