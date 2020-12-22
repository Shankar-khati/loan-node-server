const mongoose = require('mongoose');
const { TE, to } = require('../services/util.service');

let PaymentsSchema = mongoose.Schema({
    Account: { type: Number },
    AmounttoPay: { type: Number },
    Customer: { type: String },
    CustomerAccount: { type: String },
    Loan: { type: String },
    date: { type: Number },
    Remarks: { type: String },
    Teller: { type: String }
}, { timestamps: true });

PaymentsSchema.methods.toWeb = function() {
    let json = this.toJSON();
    json.id = this._id; //this is for the front end
    return json;
};

let company = module.exports = mongoose.model('Payments', PaymentsSchema);