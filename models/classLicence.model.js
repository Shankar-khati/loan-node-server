const mongoose = require('mongoose');
const { TE, to } = require('../services/util.service');
const Schema = require('mongoose').Schema;
let ClassLicenceSchema = mongoose.Schema({
    className: { type: String },
    country: { type: Schema.Types.ObjectId, ref: 'Countries' }

}, { timestamps: true });

ClassLicenceSchema.methods.toWeb = function() {
    let json = this.toJSON();
    json.id = this._id; //this is for the front end
    return json;
};


let classLicence = module.exports = mongoose.model('ClassLicence', ClassLicenceSchema);