const path = require('path');

const express = require('express');

const passwordController = require('../controllers/password');
const router = express.Router();

  router.post('/password/forgotpassword', passwordController.postForgotPassword);
  router.get('/password/resetpassword/:id',passwordController.resetPassword);
  router.get('/password/updatepassword/:resetpasswordid',passwordController.updatepassword);

module.exports = router;