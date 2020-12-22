const { User, Employer } = require('../models');
const authService = require('../services/auth.service');
const { to, ReE, ReS, upload } = require('../services/util.service');
const fileType = require('file-type')
const fs = require('fs')


const uploadImage = function(req, res) {
    let user = req.user;
    upload(req, res, function(err) {

        if (err) {
            res.status(400).json({ message: err.message })

        } else {
            if (user.userRole == 'CorporateEmployer') {
                Employer.findOne({ "user": user._id }, function(err, employer) {
                    employer.set({ 'employerCompanyLogo': req.file.filename });
                    employer.save();
                });
            } else if (user.userRole == 'IndividualEmployer') {
                user.set({ 'selfieImage': req.file.filename });
                user.save();

            }

            let path = `/images/${req.file.filename}`
            return ReS(res, { message: 'Image Uploaded Successfully !', path: path }, 201);

        }
    })
};
module.exports.uploadImage = uploadImage;

const uploadEmployerImage = function(req, res) {
    let user = req.user;
    upload(req, res, function(err) {

        if (err) {
            res.status(400).json({ message: err.message })

        } else {
            Employer.findOne({ "user": user._id }, function(err, employer) {
                employer.set({ 'employerCompanyLogo': req.file.filename });
                employer.save();
            });

            let path = `/images/${req.file.filename}`
            return ReS(res, { message: 'Image Uploaded Successfully !', path: path }, 201);

        }
    })
};
module.exports.uploadEmployerImage = uploadEmployerImage;

const getImage = function(req, res) {
    let imagename = req.params.imagename
    let imagepath = __dirname + "/../images/" + imagename
    let image = fs.readFileSync(imagepath)
    let mime = fileType(image).mime
    res.writeHead(200, { 'Content-Type': mime })
    res.end(image, 'binary')
}
module.exports.getImage = getImage;