const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/websiteController');

/* GET home page. */
router.get('/', ctrlMain.mainpage);
router.get('/account', ctrlMain.account);
router.get('/addmoney', ctrlMain.addmoney);
router.get('/cardinfo', ctrlMain.cardinfo);
router.get('/login',ctrlMain.login);
router.get('/register',ctrlMain.register);
router.get('/withdraw',ctrlMain.withdraw);

module.exports = router;
