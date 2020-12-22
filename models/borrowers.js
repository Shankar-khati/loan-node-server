const mongoose = require('mongoose');
const { TE, to } = require('../services/util.service');
const validate = require('mongoose-validator');
const Schema = require('mongoose').Schema;
let BorrowersSchema = new mongoose.Schema({

    Country: { type: String },
    account: { type: Number },
    cityname: { type: String },
    emailname: { type: String },
    comment: { type: String },
    firstname: { type: String },
    imagename: { type: String },
    lastname: { type: String },
    phone: { type: Number },
    statename: { type: String },
    textarea: { type: String },
    textarea1: { type: String },
    zipcode: { type: Number },



});

BorrowersSchema.methods.toWeb = function() {
    let json = this.toJSON();
    json.id = this._id; //this is for the front end
    return json;
};

let borrower = module.exports = mongoose.model('Borroweres', BorrowersSchema);