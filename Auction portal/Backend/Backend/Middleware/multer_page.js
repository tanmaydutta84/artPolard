var multer = require('multer');



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, "./uploads/pages");
    },
    filename: function (req, file, cb) {
       cb(null, file.originalname);
      
    },
 });
  


 exports.singleUpload = multer({
	storage: storage
}).fields([
	{name : "html", maxCount : 1},
	{name : "css", maxCount : 1}
]);