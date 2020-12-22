const mongoose = require('mongoose');
const { TE, to } = require('../services/util.service');
const Schema = require('mongoose').Schema;
let CitiesSchema = mongoose.Schema({
    cityName: { type: String },
    country: { type: Schema.Types.ObjectId, ref: 'Countries' },
    state: { type: Schema.Types.ObjectId, ref: 'States' }

}, { timestamps: true });

CitiesSchema.methods.toWeb = function() {
    let json = this.toJSON();
    json.id = this._id; //this is for the front end
    return json;
};

let cities = module.exports = mongoose.model('Cities', CitiesSchema);