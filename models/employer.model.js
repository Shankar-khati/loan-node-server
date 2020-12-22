const mongoose = require('mongoose');
const { TE, to } = require('../services/util.service');
const Schema = require('mongoose').Schema;
let EmployerSchema = mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    employerCompanyName: {type: String,
        lowercase: true,
        trim: true,
        index: true,
        unique: true,
        sparse: true
    },
    employerCompanyLogo: { type: String },
    companyRegistrationNo: { type: String },
    employerCompanyAddress: { type: String }

}, { timestamps: true });

EmployerSchema.methods.toWeb = function() {
    let json = this.toJSON();
    json.id = this._id; //this is for the front end
    return json;
};

let employer = module.exports = mongoose.model('Employer', EmployerSchema);