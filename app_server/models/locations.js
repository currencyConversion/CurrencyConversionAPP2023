const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    phone: String
});

const currencySchema = new Schema({
    currency: String,
    rates: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        default: mongoose.Types.Decimal128.fromString('0.00')
    }
});

const balanceSchema = new mongoose.Schema({
    currency: String,
    balance: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});


const UserModel = mongoose.model('User', userSchema);
const CurrencyModel = mongoose.model('Currency', currencySchema);
const BalanceModel = mongoose.model('Balance', balanceSchema);

module.exports = { UserModel, CurrencyModel, BalanceModel };
