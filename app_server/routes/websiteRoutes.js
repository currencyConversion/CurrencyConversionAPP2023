const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/websiteController');

/* GET home page. */
router.get('/', ctrlMain.index);
router.get('/mainpage', ctrlMain.mainpage);
router.get('/aboutus', ctrlMain.aboutus);
router.get('/account', ctrlMain.account);
router.get('/cardinfo', ctrlMain.cardinfo);
router.get('/login',ctrlMain.login);
router.get('/addfunds',ctrlMain.addfunds);
router.get('/register',ctrlMain.register);
router.get('/withdraw',ctrlMain.withdraw);
router.post('/register', ctrlMain.addUsers);
router.post('/login',ctrlMain.loginUser);
router.post('/addfunds',ctrlMain.updateoraddBalance);
router.post('/withdrawfunds',ctrlMain.Withdrawfunds);

module.exports = router;
