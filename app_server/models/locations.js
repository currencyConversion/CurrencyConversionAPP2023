const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema
const customerSchema = new mongoose.Schema({
    // Customer ID
    username: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        // Needs encryption
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    accountcreation: {
            type: Date,
            'default': Date.now
        },
    status: {
            type: Boolean
    }
});

const currencySchema = new Schema({
    currency: String,
    rates: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        default: mongoose.Types.Decimal128.fromString('0.00')
    }
});

const accountSchema = new mongoose.Schema({
    customer_id: String,
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

const transactionSchema = new mongoose.Schema({
    // Account ID, Transaction ID
    currency: String,
    amount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    dateOfTransaction: {
        type: Date,
        'default': Date.now
    }
});


const CustomerModel = mongoose.model('Customer', customerSchema);
const CurrencyModel = mongoose.model('Currency', currencySchema);
const AccountModel = mongoose.model('Account', accountSchema);

module.exports = { CustomerModel, CurrencyModel, AccountModel };
