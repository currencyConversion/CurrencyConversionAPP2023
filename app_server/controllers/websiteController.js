/* GET home page */
const mainpage = function(req, res) {
  res.render('mainpage', {   title: 'HomePage'})
};

const account = function(req, res) {
  res.render('account', {   title: 'Account'})
};

const register = function(req, res, next) {
  res.render('register', { title: 'Register' });
};

const login = function(req, res, next) {
  res.render('login', { title: 'Login' });
};

const addmoney = function(req, res) {
  res.render('addmoney', {   title: 'AddMoney'})
};

const cardinfo = function(req, res) {
  res.render('cardinfo', {   title: 'Cardinfo'})
};
const withdraw = function(req, res) {
  res.render('withdraw', {   title: 'Withdraw'})
};

const isLoggedIn = req.session && req.session.userId;
if (isLoggedIn) {
  // User is logged in
  // Perform actions for authenticated users
} else {
  // User is not logged in
  // Redirect to a login page or show a message
}

module.exports = {
  mainpage,
  account,
  register,
  login,
  addmoney,
  cardinfo,
  withdraw
};