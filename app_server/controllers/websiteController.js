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
const withdraw = function(req, res) {
  res.render('withdraw', {   title: 'Withdraw'})
};

//registration

const UserModel = require('../models/locations');

const addUsers = function (req, res) {
  const { username, email, password, phone } = req.body;

  const newUser = new UserModel({
    username,
    email,
    password,
    phone,
  });

  newUser
    .save()
    .then(() => {
      console.log('User registered successfully');
      res.render('account.pug')
    })
    .catch((err) => {
      console.error('Error saving user:', err);
      res.status(500).json({ error: 'Failed to register user' });
    });
};

//login

const loginUser = function (req, res) {
  const { username, password } = req.body;
  const isLoggedIn = true;

  UserModel.findOne({ username, password }) 
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
  loginUser
};