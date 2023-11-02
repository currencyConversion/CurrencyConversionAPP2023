const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    phone: String
});


const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
