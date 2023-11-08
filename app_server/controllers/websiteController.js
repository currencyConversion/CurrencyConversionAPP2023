/* GET home page */
const index = function(req, res){
  res.render('index', {   title: 'Index'})
};

const mainpage = function(req, res) {
  const isLoggedIn = true;
  res.render('mainpage', {   title: 'Mainpage', isLoggedIn})
};

const account = function(req, res) {
  const account = true;
  res.render('account', {   title: 'Account', account})
};

const aboutus = function(req, res) {
  const about = true;
  res.render('aboutus', {   title: 'aboutus', about})
};

const register = function(req, res, next) {
  res.render('register', { title: 'Register' });
};

const login = function(req, res, next) {
  res.render('login', { title: 'Login' });
};

const cardinfo = function(req, res) {
  res.render('cardinfo', {   title: 'Cardinfo'})
};

const { render } = require('pug');
const models = require('../models/locations');

const findAllCurrencies = async () => {
  try {
    const currencies = models.CurrencyModel.find({});
    return currencies;
  } catch (error) {
    console.error('Error fetching currencies:', error);
    return null;
  }
};

const addfunds = async function(req, res) { 
  try {
    const currencies = await findAllCurrencies();
    res.render('addfunds', { title: 'AddFunds', currencies });
  } catch (error) {
    console.error('Error rendering addfunds:', error);
    res.status(500).send('Internal Server Error');
  }
};

const withdraw = async function(req, res) {
  try {
    const currencies = await findAllCurrencies();
    res.render('withdraw', { title: 'Withdraw', currencies });
  } catch (error) {
    console.error('Error rendering addfunds:', error);
    res.status(500).send('Internal Server Error');
  }
};
//registration


const addUsers = function (req, res) {
  const { username, email, password, phone } = req.body;

  const newUser = new models.UserModel({
    username,
    email,
    password,
    phone,
  });

  newUser
    .save()
    .then(() => {
      console.log('User registered successfully');
      res.render('mainpage');
    })
    .catch((err) => {
      console.error('Error saving user:', err);
      res.status(500).json({ error: 'Failed to register user' });
    });
};

const Decimal128 = require('mongodb').Decimal128;

const updateOrAddCurrencies = async function (req, res) {
  const currencies = [
    {
      currency: 'USD',
      rates: new Decimal128('1.00')
    },
    {
      currency: 'EUR',
      rates: new Decimal128('0.88')
    },
    {
      currency: 'GBP',
      rates: new Decimal128('0.75')
    }
  ];

  try {
    for (const cur of currencies) {
      const foundCurrency = await models.CurrencyModel.findOne({ currency: cur.currency });

      if (foundCurrency) {
        // Currency already exists, update it
        await foundCurrency.updateOne({ rates: cur.rates });
      } else {
        // Currency doesn't exist, create it
        const newCurrency = new models.CurrencyModel({
          currency: cur.currency,
          rates: cur.rates
        });

        await newCurrency.save(); // Save the newly created currency
      }
    }

    console.log('Currencies updated/added successfully');
  } catch (err) {
    console.error('Error updating/adding currencies:', err);
    res.status(500).json({ error: 'Failed to update/add currencies' });
  }
};


//login

const loginUser = function (req, res) {
  const { username, password } = req.body;
  const isLoggedIn = true;

  updateOrAddCurrencies(req, res);

  models.UserModel.findOne({ username, password }) 
    .then((user) => {
      if (!user) {
        res.status(401).json({ error: 'Unauthorized' });
      } else {
        res.render('mainpage', {   title: 'Homepage', isLoggedIn});
      }
    })
    .catch((err) => {
      console.error('Error during login:', err);
      res.status(500).json({ error: 'Login failed' });
    });
};

const updateoraddBalance = async function (req, res) {
  try {
    const { amount, currencies } = req.body;
    const Decimal128 = require('mongodb').Decimal128;
    const decimalAmount = new Decimal128(amount);

    const foundCurrency = await models.BalanceModel.findOne({ currency: currencies });

    if (foundCurrency) {
      // Currency already exists, update it
      foundCurrency.balance =  Number(foundCurrency.balance) + Number(decimalAmount);
      await foundCurrency.save();
    } else {
      const newBalance = new models.BalanceModel({
        currency: currencies,
        balance: decimalAmount,
        createdOn: Date.now()
      });

      await newBalance.save();
    }

    console.log('Balance added or updated successfully');
    res.render('mainpage');
  } catch (err) {
    console.error('Error updating or adding balance:', err);
    res.status(500).json({ error: 'Failed to update or add balance' });
  }
};

const Withdrawfunds = async function (req, res) {
  try {
    const { amount, currencies } = req.body;
    const Decimal128 = require('mongodb').Decimal128;
    const decimalAmount = new Decimal128(amount);

    const foundCurrency = await models.BalanceModel.findOne({ currency: currencies });
    if(Number(foundCurrency.balance) < Number(decimalAmount)){
      const currencies = await findAllCurrencies();
      res.render('withdraw', { title: 'Withdraw',  currencies, notenoughmoney });
    }else{
      // Currency already exists, update it
      foundCurrency.balance =  Number(foundCurrency.balance) - Number(decimalAmount);
      await foundCurrency.save();
      res.render('mainpage', { title: 'mainpage' });
    }
  }
  catch (err) {
    console.error('Error withdrawing:', err);
    res.status(500).json({ error: 'Failed to withdraw' });
  }
};





module.exports = {
  index,
  mainpage,
  aboutus,
  account,
  register,
  login,
  cardinfo,
  withdraw,
  addUsers,
  loginUser,
  addfunds,
  updateoraddBalance,
  updateOrAddCurrencies,
  Withdrawfunds
};