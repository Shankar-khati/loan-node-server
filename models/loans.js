const mongoose = require('mongoose');
const { TE, to } = require('../services/util.service');
const validate = require('mongoose-validator');
const Schema = require('mongoose').Schema;
let LoansSchema = new mongoose.Schema({
    borrower: { type: String },
    account: { type: Number },
    address: { type: String },
    agent: { type: String },
    amount: { type: Number },
    amounttoPay: { type: String },
    balance: { type: Number },
    description: { type: String },
    email: { type: String },
    guarantor: { type: String },
    passport: { type: String },
    paymentDate: { type: Number },
    phoneNumber: { type: Number },
    realationship: { type: String },
    release: { type: String },
    remarks: { type: String },
    remarksid: { type: String },
    status: { type: String },
    tellerBy: { type: String },
});

LoansSchema.methods.toWeb = function() {
    let json = this.toJSON();
    json.id = this._id; //this is for the front end
    return json;
};

let loans = module.exports = mongoose.model('Loans', LoansSchema);