/* GET home page */
const index = function(req, res){
  res.render('index', { title: 'Index' });
};

const register = function(req, res, next) {
  res.render('register', { title: 'Register' });
};

const login = function(req, res, next) {
  res.render('login', { title: 'Login' });
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
    product: products
})};

const products = [
  {
    id: 1,
    name: 'Protein Powder',
    image: '/images/proteinpowder.jpg',
    rating: 3,
    price: 15.99,
    features: ['Powder', 'White', 'Protein'],
    reviews: [
      {
        author: 'Conor Dawson',
        rating: 5,
        timestamp: '16 July 2013',
        reviewText: 'Great product!'
      },
      {
        author: 'Conor Dawson',
        rating: 5,
        timestamp: '16 July 2013',
        reviewText: 'Great product!'
      }
    ]
  },
  {
    id: 2,
    name: 'Protein Bar',
    image: '/images/proteinbar.jpg',
    rating: 4,
    price: 2.99,
    features: ['Natural', 'Tasty', 'Protein'],
    reviews: [
      {
        author: 'Conor Dawson',
        rating: 5,
        timestamp: '16 July 2013',
        reviewText: 'Great product!'
      }
    ]
  },
  {
    id: 3,
    name: 'Creatine',
    image: '/images/creatine.jpg',
    rating: 4,
    price: 299.99,
    features: ['White', 'Powder or Pills', 'Supplement'],
    reviews: [
      {
        author: 'Conor Dawson',
        rating: 5,
        timestamp: '16 July 2013',
        reviewText: 'Great product!'
      }
    ]
  }
];


const productdetail = function(req, res, next) {
  const productId = req.params.id;
  const productA = products.find(products => products.id == productId);
  res.render('product-detail', { productId, productA });
};

module.exports = {
  index,
  register,
  homepage,
  login,
  productdetail
};