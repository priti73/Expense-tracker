const path = require('path');

const express = require('express');

const premiumController = require('../controllers/premium');
const auntheticateController=require('../middleware/auth');
const router = express.Router();

router.get('/premium/leaderboard',auntheticateController.authenticate,premiumController.getUserLeaderBoard);
module.exports = router;