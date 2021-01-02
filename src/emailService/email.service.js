const AWS = require('aws-sdk');
const awsConfig = require('./awsConfig');

AWS.config.update({
	accessKeyId: awsConfig.key,
	secretAccessKey: awsConfig.secret,
	region: awsConfig.ses.region,
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

module.exports = {
	sendMail(to, subject, message, from) {
		const params = {
			Destination: {
				ToAddresses: to,
			},
			Message: {
				Body: {
					Html: {
						Charset: 'UTF-8',
						Data: message,
					},
				},
				Subject: {
					Charset: 'UTF-8',
					Data: subject,
				},
			},
			ReturnPath: from || awsConfig.ses.from.default,
			Source: from || awsConfig.ses.from.default,
		};
		return new Promise((resolve, reject) => {
			ses.sendEmail(params, (err, data) => {
				if (err) {
					reject(err, err.stack);
				} else {
					resolve(data);
				}
			});
		});
	},
};
