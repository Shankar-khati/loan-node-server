const mongoose = require('mongoose');
const { TE, to } = require('../services/util.service');

let CompanySchema = mongoose.Schema({
    companyname: { type: String },
    companyregistrationnumber: { type: Number },
    country: { type: String },
    companyregistrationaddress: { type: String },
    defaultcurrency: { type: String }
}, { timestamps: true });

CompanySchema.methods.toWeb = function() {
    let json = this.toJSON();
    json.id = this._id; //this is for the front end
    return json;
};

let company = module.exports = mongoose.model('Company', CompanySchema);