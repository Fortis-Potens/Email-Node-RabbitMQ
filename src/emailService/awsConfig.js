const AWS = require('aws-sdk');
const dotenv = require('dotenv');

dotenv.config();

AWS.config.update({
	accessKeyId: process.env.AWSAccessKeyId,
	secretAccessKey: process.env.AWSSecretKey,
});

module.exports = {
	key: process.env.AWSAccessKeyId,
	secret: process.env.AWSSecretKey,
	ses: {
		from: {
			default: '"Fortis Potens" <fortispotens@gmail.com>',
		},
		region: 'us-west-2',
	},
};
