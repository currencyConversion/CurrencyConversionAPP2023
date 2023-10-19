const express = require('express');

const router = express.Router();

//router.get('/', (req, res) => {
//    res.send('Currency Conversion Index');
//});

router.get('/', (req, res) => {
    res.render('MainPage');
});

module.exports = router;