const mongoose = require('mongoose');
const { TE, to } = require('../services/util.service');
const Schema = require('mongoose').Schema;
let StatesSchema = mongoose.Schema({
    stateName: { type: String },
    country: { type: Schema.Types.ObjectId, ref: 'Countries' }

}, { timestamps: true });

StatesSchema.methods.toWeb = function() {
    let json = this.toJSON();
    json.id = this._id; //this is for the front end
    return json;
};

let states = module.exports = mongoose.model('States', StatesSchema);