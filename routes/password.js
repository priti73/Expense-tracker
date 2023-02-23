const path = require('path');

const express = require('express');

const passwordController = require('../controllers/password');
const router = express.Router();

 router.post('/password/forgotpassword', passwordController.forgotpassword);

module.exports = router;