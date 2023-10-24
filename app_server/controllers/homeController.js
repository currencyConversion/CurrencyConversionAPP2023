/* GET home page */
const index = function(req, res){
  res.render('index', { title: 'Express' });
};

const register = function(req, res, next) {
  res.render('register', { title: 'Express' });
};

const login = function(req, res, next) {
  res.render('login', { title: 'Express' });
};

const homepage = function(req, res, next) {
  res.render('homepage', { 
    title: 'HomePage',
    pageHeader: {
      title: 'HomePage',
    },
    sidebar: {
      context: 'Review of the products',
      callToAction: 'Please leave a review'
    },
    product: [{
      name: 'Protein Powder',
      rating: 3,
      features: ['Powder','White','Protein'],
      reviews: [{
        author: 'Conor Dawson',
        rating: 5,
        timestamp: '16 july 2013',
        reviewText: 'Great product!'
    }]
  },
  {
      name: 'Protein Bar',
      rating: 4,
      features: ['Natural','Tasty','Protein'],
      reviews: [{
        author: 'Conor Dawson',
        rating: 5,
        timestamp: '16 july 2013',
        reviewText: 'Great product!'
    }]
   }]
})};

module.exports = {
  index,
  register,
  homepage,
  login
};