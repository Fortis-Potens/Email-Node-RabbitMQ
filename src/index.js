const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const sendEmailRoute = require('./routes/sendEmail');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/email', sendEmailRoute);

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
	return response
		.status(200)
		.json({
			success: true,
			message: 'Welcome to Email Message Queue with RabbitMQ',
		});
});

app.listen(PORT, () => {
	console.log(`app running on port: ${process.env.PORT}`);
});
