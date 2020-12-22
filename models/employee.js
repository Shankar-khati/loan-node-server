const mongoose = require('mongoose');
const { TE, to } = require('../services/util.service');

let EmployeeSchema = mongoose.Schema({
    borrower: { type: String },
    confirmPassword: { type: String },
    country: { type: String },
    password: { type: String },
    cityname: { type: String },
    comment: { type: String },
    emailname: { type: String },
    firstname: { type: String },
    imagename: { type: String },
    phone: { type: Number },
    statename: { type: String },
    textarea: { type: String },
    textarea1: { type: String },
    username: { type: String },
    zipcode: { type: String },
}, { timestamps: true });

EmployeeSchema.methods.toWeb = function() {
    let json = this.toJSON();
    json.id = this._id; //this is for the front end
    return json;
};

let employee = module.exports = mongoose.model('Employee', EmployeeSchema);