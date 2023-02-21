var multer = require('multer');



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //console.log(file.filePath);
       cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
       cb(null, file.originalname);
      
    },
 });

 exports.singleUpload = multer({
	storage: storage
}).single('logo');