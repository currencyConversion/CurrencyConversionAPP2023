const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/homeController');

/* GET home page. */
router.get('/', ctrlMain.index);
router.get('/register', ctrlMain.register);
router.get('/login', ctrlMain.login);
router.get('/homepage', ctrlMain.homepage);

module.exports = router;
