const mongoose = require('mongoose');
const { TE, to } = require('../services/util.service');
const validate = require('mongoose-validator');
const Schema = require('mongoose').Schema;
let DriverSchema = mongoose.Schema({
    driverLicence: {type: String,
                    lowercase: true,
                    trim: true,
                    index: true,
                    unique: true,
                    sparse: true
                },
    driverLicenceFront: { type: String },
    driverLicenceBack: { type: String },
    driverDob: { type: Date },
    driverIssueDate: { type: Date },
    driverExpiryDate: { type: Date },
    classLicenceID: { type: Schema.Types.ObjectId, ref: 'ClassLicence' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    country: { type: Schema.Types.ObjectId, ref: 'Countries' },
    state: { type: Schema.Types.ObjectId, ref: 'States' }

}, { timestamps: true,versionKey: false  });

DriverSchema.methods.toWeb = function() {
    let json = this.toJSON();
    json.id = this._id; //this is for the front end
    return json;
};

let driver = module.exports = mongoose.model('Driver', DriverSchema);
