/* GET home page */
const index = function(req, res){
  res.render('index', {   title: 'Index'})
};

const mainpage = function(req, res) {
  const isLoggedIn = true;
  const accounts = findAllAccounts(req.session.userId);
  const currencies = findAllCurrencies();

    res.render('mainpage', { title: 'Homepage', isLoggedIn, accounts, currencies });
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

const models = require('../models/locations');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

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
    res.render('addfunds', { title: 'AddFunds', currencies});
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

  const st = true;
  const newUser = new models.CustomerModel({
    username,
    phone,
    password,
    email,
    createdOn: Date.now(),
    st
  });

  newUser
    .save()
    .then(() => {
      console.log('User registered successfully');

      res.render('Login', { title: 'Login'});
    })
    .catch((err) => {
      console.error('Error saving user:', err);
      res.status(500).json({ error: 'Failed to register user' });
    });
};

const Decimal128 = require('mongodb').Decimal128;


//login

const findAllAccounts = async (userId) => {
  try {
    const accounts = await models.AccountModel.find({ customer_id: userId });
    return accounts;
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return null;
  }
};

const updateOrAddCurrencies = async function (req, res) {
  const currencies = [
    {
      currency: 'EUR',
      rates: new Decimal128('1.00')
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

const loginUser = async function (req, res) {
  const { username, password } = req.body;
  const isLoggedIn = true;
  const invalid = true;


  try {
    const user = await models.CustomerModel.findOne({ username, password });

    if (!user) {
      res.render('login', { title: 'login', invalid});
      return;
    }
    req.session.userId = null;
    req.session.userId = user._id;

    const accounts = await findAllAccounts(req.session.userId);
    const currencies = await findAllCurrencies();

    res.render('mainpage', { title: 'Homepage', isLoggedIn, username, accounts, currencies });
    
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Login failed' });
  }
};

const updateoraddBalance = async function (req, res) {
  try {
    const { amount, currency } = req.body;
    const Decimal128 = require('mongodb').Decimal128;
    const decimalAmount = new Decimal128(amount);

    const foundCurrency = await models.AccountModel.findOne({ customer_id: req.session.userId, currency: currency });

    if (foundCurrency) {
      foundCurrency.balance = Number(foundCurrency.balance) + Number(decimalAmount);
      await foundCurrency.save();
    } else {
      const newBalance = new models.AccountModel({
        customer_id: req.session.userId,
        currency: currency,
        balance: decimalAmount,
        createdOn: Date.now(),
      });

      await newBalance.save();
    }

    const currencies = await findAllCurrencies();
    const accounts = await findAllAccounts(req.session.userId);

    console.log('Balance added or updated successfully');
    
    res.render('mainpage', { title: 'Homepage', accounts, currencies });
  } catch (err) {
    console.error('Error updating or adding balance:', err);
    res.status(500).json({ error: 'Failed to update or add balance' + err });
  }
};


const Withdrawfunds = async function (req, res) {
  try {
    const { amount, currencies } = req.body;
    const Decimal128 = require('mongodb').Decimal128;
    const decimalAmount = new Decimal128(amount);
    const notenoughmoney = true;
    const foundCurrency = await models.AccountModel.findOne({ customer_id: req.session.userId, currency: currencies });
    if(Number(foundCurrency.balance) < Number(decimalAmount) || foundCurrency === null){
      const currencies = await findAllCurrencies();
      res.render('withdraw', { title: 'Withdraw',  currencies, notenoughmoney });
    }else{
      // Currency already exists, update it
      foundCurrency.balance =  Number(foundCurrency.balance) - Number(decimalAmount);
      await foundCurrency.save();
      const accounts = await findAllAccounts(req.session.userId);
      const currencies = await findAllCurrencies();
      const isLoggedIn = true;
      const username ="banana";

      res.render('mainpage', { title: 'Homepage', isLoggedIn, username, accounts, currencies });
    }
  }
  catch (err) {
    console.error('Error withdrawing:', err);
    res.status(500).json({ error: 'Failed to withdraw' });
  }
};

const convertCurrency = async function (req, res){
  try{
    const { amount, Tocurrency, Fromcurrency } = req.body;
    const isLoggedIn = true;
    const username = "Banana";

    const FirstCurrency = await models.AccountModel.findOne({ customer_id: req.session.userId, currency: Fromcurrency });
    const LastCurrency = await models.AccountModel.findOne({ customer_id: req.session.userId, currency: Tocurrency });

    if (FirstCurrency && Number(FirstCurrency.balance) >= Number(amount)) {
      let finalbalance;
      if (Fromcurrency === "EUR") {
        const usdcon = await models.CurrencyModel.findOne({ currency: Tocurrency });
        finalbalance = Number(amount) * Number(usdcon.rates);
      } else {
        const cur = await models.CurrencyModel.findOne({ currency: Fromcurrency });
        const usdcon = await models.CurrencyModel.findOne({ currency: Tocurrency });
        const firstnumber = Number(amount) / Number(cur.rates);
        finalbalance = firstnumber * Number(usdcon.rates);
      }
    
      if (LastCurrency) {
      }

      const roundedFinalBalance = (finalbalance).toFixed(2); 
      const finalBalanceAsNumber = Number(roundedFinalBalance); 

      const currencies = await findAllCurrencies();
      const accounts = await findAllAccounts(req.session.userId);
      res.render('mainpage', { title: 'Homepage', isLoggedIn, username, accounts, finalBalanceAsNumber, currencies });
    } else {
      const accounts = await findAllAccounts(req.session.userId);
      const currencies = await findAllCurrencies();
      res.render('mainpage', { title: 'Homepage', isLoggedIn, username, accounts, currencies });
    }
    
  }
  catch (err) {
    console.error('Error Converting:', err);
    res.status(500).json({ error: 'Failed to convert'+ err });
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
  Withdrawfunds,
  convertCurrency
};