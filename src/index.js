const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const sendEmailRoute = require('./routes/sendEmail');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/email', sendEmailRoute);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
	console.log(`app running on port: ${process.env.PORT}`);
});
