/*
 * Summary:     Multer is middleware for upload image
 * Author:      Openxcell(empCode-513)
 */
const path = require("path");
const os = require("os");
const fs = require("fs");
const tmpdir = os.tmpdir();
const multer = require("multer");
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, tmpdir);
	},
	filename: function (req, file, cb) {
		// console.log("---filename"+file.originalname);
		const imageName = Date.now()+ path.extname(file.originalname);
		const filepath = path.join(tmpdir, imageName);
		file.originalname = imageName;
		fs.mkdtemp(filepath, (err, folder) => {
			if (err) throw err;
			cb(null, imageName);
		});
	}
});

exports.singleUpload = multer({
	storage: storage
}).single('image');

exports.multiProfilePic = multer({
	storage: storage
}).any();
