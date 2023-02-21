// Used to interact with AWS Service
var AWS = require('aws-sdk');
const fs = require('fs');
AWS.config.loadFromPath('./Configs/awsConfig.json');
var s3bucket = new AWS.S3({
	params: {
		Bucket: 'gunsbid-dev'
	}
});

// To Upload media on S3
function s3Upload(files, path) {
	return new Promise((resolve, reject) => {
		try {
			fs.readFile(files.path, (err, data) => {
				if (err) throw err;
				var params = {
					Bucket: 'gunsbid-dev',
					Key: path,
					Body: files,
					ContentType: files.mimetype,
					Body: data,
					ACL: 'public-read'
				};
				s3bucket.upload(params, function(err, rese) {
					if (err) {
						throw err;
					}
					resolve(rese.Location);
				});
			});
		} catch (e) {
			reject({ message: 'Could not upload image', err: e });
		}
	});
}

module.exports = s3Upload;
