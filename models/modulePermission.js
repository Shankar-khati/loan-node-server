const mongoose = require('mongoose');
const { TE, to } = require('../services/util.service');

let ModulePermissionSchema = mongoose.Schema({
    companyname: { type: String },
    EmailPanel: { type: String },
    BorrowerDetails: { type: String },
    EmployeeDetails: { type: String },
    LoanDetails: { type: String },
    InternalMessage: { type: String },
    MissedPayment: { type: Number, },
    Payment: { type: Number },
    EmployeeDetails: { type: String },
    ModulePermission: { type: String },
    SavingAcoount: { type: String },
    GeneralSettings: { type: String }
}, { timestamps: true });

ModulePermissionSchema.methods.toWeb = function() {
    let json = this.toJSON();
    json.id = this._id; //this is for the front end
    return json;
};

let company = module.exports = mongoose.model('ModulePermission', ModulePermissionSchema);