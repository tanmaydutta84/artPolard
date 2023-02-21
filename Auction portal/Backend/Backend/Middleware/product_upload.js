var multer = require('multer');



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, "./uploads/product");
    },
    filename: function (req, file, cb) {
       cb(null, file.originalname);
      
    },
 });
  


 exports.singleUpload = multer({
	storage: storage
}).fields([
	{name : "logo", maxCount : 1},
	{name : "banner_image", maxCount : 1}
]);