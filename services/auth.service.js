const {
    User,
    Borrowers,
    Employee
} = require('../models');
const validator = require('validator');
const {
    to,
    TE
} = require('../services/util.service');

const getUniqueKeyFromBody = function(body) { // this is so they can send in 3 options unique_key, email, or phone and it will work
    let unique_key = body.unique_key;
    if (typeof unique_key === 'undefined') {
        if (typeof body.userEmail != 'undefined') {
            unique_key = body.userEmail
        } else if (typeof body.userPhone != 'undefined') {
            unique_key = body.userPhone
        } else {
            unique_key = null;
        }
    }

    return unique_key;
}
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;

const createUser = async function(userInfo) {
    console.log(userInfo);
    console.log("00000000000000");
    console.log(userInfo)
    let unique_key, auth_info, err, borrowers, user, employee;

    auth_info = {}
    auth_info.status = 'create';

    unique_key = getUniqueKeyFromBody(userInfo);
    if (!unique_key) TE('An email or phone number was not entered.');
    if (validator.isEmail(unique_key)) {
        auth_info.method = 'email';
        userInfo.userEmail = unique_key;
    } else if (validator.isMobilePhone(unique_key, 'any')) { //checks if only phone number was sent
        auth_info.method = 'phone';
        userInfo.phone = unique_key;
    } else {
        TE('A valid email or phone number was not entered.');
    }
    if (userInfo.userRole == 'borrowers') {
        if (userInfo.account != '' && userInfo.account) {
            console.log(userInfo);
            [err, borrowers] = await to(Borrowers.create({
                "email": userInfo.userEmail,
                "borrower": userInfo.borrower,
                "account": userInfo.account,
                "address": userInfo.address,
                "agent": userInfo.agent,
                "amount": userInfo.amount,
                "amounttoPay": userInfo.amounttoPay,
                "balance": userInfo.balance,
                "description": userInfo.description,
                "guarantor": userInfo.guarantor,
                "paymentDate": userInfo.paymentDate,
                "phoneNumber": userInfo.phoneNumber,
                "realationship": userInfo.realationship,
                "release": userInfo.release,
                "remarks": userInfo.remarks,
                "remarksid": userInfo.remarksid,
                "tellerBy": userInfo.tellerBy

            }));
            if (err) TE("user already exists with that DL");
            if (borrowers != '' && borrowers != undefined) {
                [err, user] = await to(User.create(userInfo));
                if (err) {
                    borrowers.remove();
                    if (auth_info.method == 'email')
                        TE('user already exists with that email');
                    else
                        TE('user already exists with that phone number');
                }
                borrowers.set({
                    "user": user._id
                });
                borrowers.save();
                [err, user] = await to(User.findOne({ "_id": user._id }));
            }
        } else {
            TE('user driving licence required');
        }
    } else if (userInfo.userRole == 'employee') {
        // if (userInfo.employerCompanyName == '' || userInfo.employerCompanyName == undefined)
        //     TE('Business name required');
        [err, employee] = await to(Employee.create({
            "borrower": userInfo.borrower,
            "confirmPassword": userInfo.confirmPassword,
            "country": userInfo.country,
            "password": userInfo.password,
            "cityname": userInfo.cityname,
            "comment": userInfo.comment,
            "emailname": userInfo.emailname,
            "firstname": userInfo.firstname,
            "imagename": userInfo.imagename,
            "phone": userInfo.phone,
            "statename": userInfo.statename,
            "textarea": userInfo.textarea,
            "textarea1": userInfo.textarea1,
            "username": userInfo.username,
            "zipcode": userInfo.zipcode,

        }))
        if (err) TE("Employee already exists with that name");
        if (employee != '' && employee != undefined) {
            [err, user] = await to(User.create(userInfo));
            if (err) {
                employee.remove();
                if (auth_info.method == 'email')
                    TE('user already exists with that email');
                else
                    TE('user already exists with that phone number');
            }
            employee.set({
                "user": user._id
            });
            employee.save();
            [err, user] = await to(User.findOne({ "_id": user._id }));
        }

    } else if (userInfo.userRole == 'Borrowers') {
        console.log("Borrowers");
        [err, user] = await to(User.create(userInfo));

    } else if (userInfo.userRole == 'Employee') {
        console.log("Employee");
        [err, user] = await to(User.create(userInfo));
    } else {
        TE('user role is required');
    }
    return user;
}
module.exports.createUser = createUser;

const authUser = async function(userInfo) { //returns token
    let unique_key;
    let auth_info = {};
    auth_info.status = 'login';
    unique_key = getUniqueKeyFromBody(userInfo);
    // TE('eeeeeeeeeeeeeee')
    if (!unique_key) TE('Please enter an email or phone number to login');


    if (!userInfo.userPassword) TE('Please enter a password to login');

    let user;

    if (validator.isEmail(unique_key)) {
        auth_info.method = 'email';

        [err, user] = await to(User.findOne({
            userEmail: unique_key
        }));
        if (err) TE(err.message);

    } else if (validator.isMobilePhone(unique_key, 'any')) { //checks if only phone number was sent
        auth_info.method = 'phone';

        [err, user] = await to(User.findOne({
            userPhone: unique_key
        }));
        if (err) TE(err.message);

    } else {
        TE('A valid email or phone number was not entered');
    }

    if (!user) TE('Not registered');

    [err, user] = await to(user.comparePassword(userInfo.userPassword));

    if (err) TE(err.message);

    return user;

}
module.exports.authUser = authUser;