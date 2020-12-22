const mongoose = require('mongoose');
const { TE, to } = require('../services/util.service');

let CountriesSchema = mongoose.Schema({
    countryCode: { type: String },
    countryName: { type: String },
    countryLogo: { type: String },
    countryStatus: { type: String }
}, { timestamps: true });

CountriesSchema.methods.toWeb = function() {
    let json = this.toJSON();
    json.id = this._id; //this is for the front end
    return json;
};

let countries = module.exports = mongoose.model('Countries', CountriesSchema);