var multer = require('multer');



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //console.log(file.filePath);
       cb(null, "./uploads/previousdata");
    },
    filename: function (req,file, cb) {
        const filetypes = /pdf/;
        const mimetype = filetypes.test(file.mimetype);
        if(mimetype){
            cb(null, file.originalname);
          } else {
            //res.send("Error");
            cb("Please upload only images.", false);
          }
     
      
    },
 });

 exports.singleUpload = multer({
	storage: storage
}).single('Previous_Data');