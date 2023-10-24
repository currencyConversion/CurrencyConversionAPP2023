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

const homepage = function(req, res) {
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
      id: 1,
      name: 'Protein Powder',
      image: '/images/proteinpowder.jpg',
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
      id: 2,
      name: 'Protein Bar',
      image: '/images/proteinbar.jpg',
      rating: 4,
      features: ['Natural','Tasty','Protein'],
      reviews: [{
        author: 'Conor Dawson',
        rating: 5,
        timestamp: '16 july 2013',
        reviewText: 'Great product!'
    }]
   },
   {
    id: 3,
    name: 'Tren',
    image: '/images/creatine.jpg',
    rating: 4,
    features: ['juicy','Big Quickly','Small Testes'],
    reviews: [{
      author: 'Conor Dawson',
      rating: 5,
      timestamp: '16 july 2013',
      reviewText: 'Great product!'
  }]
 }]
})};

const getProductById = (productId) => {
  return products.find((product) => product.id === productId);
};

const productdetail = function(req, res, next){
  const productId = req.params.id;
  const product = getProductById(productId);
  res.render('product-detail', { product });
};


module.exports = {
  index,
  register,
  homepage,
  login,
  productdetail,
  getProductById
};