const express = require('express');
const sendEMail = require('../controllers/sendEmail');

const router = express.Router();

router.post('/', sendEMail);

module.exports = router;
