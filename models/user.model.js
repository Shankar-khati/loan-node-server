const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');
const Company = require('./company.model');
const validate = require('mongoose-validator');
const { TE, to } = require('../services/util.service');
const CONFIG = require('../config/config');
const Schema = require('mongoose').Schema;
let UserSchema = mongoose.Schema({
    userFirstName: { type: String },
    userLastName: { type: String },
    userPhone: {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
        unique: true,
        sparse: true, //sparse is because now we have two possible unique keys that are optional
        validate: [validate({
            validator: 'isNumeric',
            arguments: [7, 20],
            message: 'Not a valid phone number.',
        })]
    },
    userEmail: {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
        unique: true,
        sparse: true,
        validate: [validate({
            validator: 'isEmail',
            message: 'Not a valid email.',
        }), ]
    },
    userPassword: { type: String },
    userResetToken: { type: String },
    userLastLogin: { type: Date },
    userRole: { type: String },
    userOTP: { type: String },
    userOTPGenerationTime: { type: Date },
    gender: { type: String },
    selfieImage: { type: String },
    userAddress: { type: String },
    userStatus: { type: String },
    userState: { type: String },
    user_id: { type: String }

}, { timestamps: true });

UserSchema.virtual('companies', {
    ref: 'Company',
    localField: '_id',
    foreignField: 'users.user',
    justOne: false,
});

UserSchema.pre('save', async function(next) {

    if (this.isModified('password') || this.isNew) {

        let err, salt, hash;
        [err, salt] = await to(bcrypt.genSalt(10));
        if (err) TE(err.message, true);

        [err, hash] = await to(bcrypt.hash(this.userPassword, salt));
        if (err) TE(err.message, true);

        this.userPassword = hash;

    } else {
        return next();
    }
})

UserSchema.methods.comparePassword = async function(pw) {
    let err, pass;
    if (!this.userPassword) TE('password not set');

    [err, pass] = await to(bcrypt_p.compare(pw, this.userPassword));
    if (err) TE(err);

    if (!pass) TE('invalid password');

    return this;
}

UserSchema.methods.Companies = async function() {
    let err, companies;
    [err, companies] = await to(Company.find({ 'users.user': this._id }));
    if (err) TE('err getting companies');
    return companies;
}

UserSchema.virtual('full_name').set(function(name) {
    var split = name.split(' ');
    this.userLastName = split[0];
    this.userLastName = split[1];
});

UserSchema.virtual('full_name').get(function() { //now you can treat as if this was a property instead of a function
    if (!this.userFirstName) return null;
    if (!this.userLastName) return this.userFirstName;

    return this.userFirstName + ' ' + this.userLastName;
});

UserSchema.methods.getJWT = function() {
    let expiration_time = parseInt(CONFIG.jwt_expiration);
    return "Bearer " + jwt.sign({ user_id: this._id }, CONFIG.jwt_encryption, { expiresIn: expiration_time });
};

UserSchema.methods.toWeb = function() {
    let json = this.toJSON();
    json.id = this._id; //this is for the front end
    return json;
};

let User = module.exports = mongoose.model('User', UserSchema);