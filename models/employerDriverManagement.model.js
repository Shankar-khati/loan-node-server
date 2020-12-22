const mongoose = require('mongoose');
const { TE, to } = require('../services/util.service');
const Schema = require('mongoose').Schema;
let EmployerDriverManagementSchema = mongoose.Schema({
    employerDriver:{ type: Schema.Types.ObjectId, ref: 'EmployerDriver' },
    employer: { type: Schema.Types.ObjectId, ref: 'Employer' },
    driver: { type: Schema.Types.ObjectId, ref: 'Driver' },
    addedAt: { type: Date },
    removeAt:{type:Date}

}, { timestamps: true });

EmployerDriverManagementSchema.methods.toWeb = function() {
    let json = this.toJSON();
    json.id = this._id; //this is for the front end
    return json;
};

let employerDriverManagement = module.exports = mongoose.model('EmployerDriverManagement', EmployerDriverManagementSchema);