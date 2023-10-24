const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/homeController');

/* GET home page. */
router.get('/', ctrlMain.index);
router.get('/register', ctrlMain.register);
router.get('/login', ctrlMain.login);
router.get('/homepage', ctrlMain.homepage);
router.get('/product/:id',ctrlMain.productdetail);

module.exports = router;
