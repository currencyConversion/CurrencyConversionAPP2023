const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    membershipStatus: String, 
    phone: String
});

const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    rating: Number,
    price: Number,
    features: [String], 
    reviews: [{
        name: String,
        rating: Number,
        datePosted: Date, 
        reviewText: String
    }]
});


const membershipSchema = new mongoose.Schema({
    type: String,
    length: String,
    startdate: Date,
    enddate: Date,   
    customerId: String
});

const UserModel = mongoose.model('User', userSchema);
const ProductModel = mongoose.model('Product', productSchema);
const MembershipModel = mongoose.model('Membership', membershipSchema);