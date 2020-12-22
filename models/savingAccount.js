const mongoose = require('mongoose');
const { TE, to } = require('../services/util.service');

let SavingAccountSchema = mongoose.Schema({
    AmountDeposit: { type: Number },
    SelectAccount: { type: Number },
    AcctNo: { type: Number },
    Amount: { type: Number },
    DateTime: { type: String },
    Email: { type: String },
    FName: { type: String },
    LName: { type: String },
    Phone: { type: Number },
    T_Type: { type: String },
    TaxId: { type: String }

}, { timestamps: true });

SavingAccountSchema.methods.toWeb = function() {
    let json = this.toJSON();
    json.id = this._id; //this is for the front end
    return json;
};

let SavingAccount = module.exports = mongoose.model('SavingAccount', SavingAccountSchema);