const mongoose = require('mongoose');
const { TE, to } = require('../services/util.service');

let MessageSchema = mongoose.Schema({
    description: { type: String },
    employee: { type: String },
    subject: { type: String },
    date: { type: String },
    senderName: { type: String }


}, { timestamps: true });

MessageSchema.methods.toWeb = function() {
    let json = this.toJSON();
    json.id = this._id; //this is for the front end
    return json;
};

let company = module.exports = mongoose.model('Message', MessageSchema);