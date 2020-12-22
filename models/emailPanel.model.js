const mongoose = require('mongoose');
const { TE, to } = require('../services/util.service');
const validate = require('mongoose-validator');
const Schema = require('mongoose').Schema;
let EmailPanelSchema = new mongoose.Schema({
    reciver: { type: String },
    subject: { type: String },
    message: { type: String },
    senderid: { type: String },
    reciverid: { type: String }
});

EmailPanelSchema.methods.toWeb = function() {
    let json = this.toJSON();
    json.id = this._id; //this is for the front end
    return json;
};

let emailPanel = module.exports = mongoose.model('EmailPanel', EmailPanelSchema);