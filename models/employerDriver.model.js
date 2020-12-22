const mongoose = require('mongoose');
const { TE, to } = require('../services/util.service');
const Schema = require('mongoose').Schema;
let EmployerDriverSchema = mongoose.Schema({
    employer: { type: Schema.Types.ObjectId, ref: 'Employer' },
    driver: { type: Schema.Types.ObjectId, ref: 'Driver' },
    employerDriverStatus: { type: String }

}, { timestamps: true });

EmployerDriverSchema.methods.toWeb = function() {
    let json = this.toJSON();
    json.id = this._id; //this is for the front end
    return json;
};

let employerDriver = module.exports = mongoose.model('EmployerDriver', EmployerDriverSchema);