const { publishMessage } = require('../emailService/emailWorker');

const sendEmail = (request, response) => {
	try {
		const {
			body: { email, subject, message },
		} = request;

		if (!email) {
			return response
				.status(400)
				.json({ success: false, message: 'Please enter a valid email' });
		}

		const defaultSubject = `Your Next Steps`;
		const defaultMessage = `
    <body>
     <p>Hi there,</p>
     <p>Thank you. We will reach out to your shortly</p>
    </body>
    `;

		const emailOptions = {
			mail: [email],
			subject: subject || defaultSubject,
			template: message || defaultMessage,
		};
		// call rabbitmq service to send email to queue
		publishMessage(emailOptions);
		return response
			.status(202)
			.json({ success: true, message: 'Email sent successfully' });
	} catch (error) {
		response.status(500).json({ success: false, error: error.message });
	}
};

module.exports = sendEmail;
