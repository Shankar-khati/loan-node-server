const { ClassLicence } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, classLicence;
    let licence_info = req.body;
    console.log(licence_info);

    [err, classLicence] = await to(ClassLicence.create(licence_info));
    if (err) return ReE(res, err, 422);

    return ReS(res, { classLicences: classLicence.toWeb() }, 201);
}
module.exports.create = create;

const getAll = async function(req, res) {

    res.setHeader('Content-Type', 'application/json');
    let err, classLicences;
    const country_id = req.query.country_id;
    if (country_id != '' && country_id != undefined) {
        [err, classLicences] = await to(
            ClassLicence.find({ "country": country_id })
            .populate('country'));
    } else {
        [err, classLicences] = await to(
            ClassLicence.find()
            .populate('country'));
    }


    let class_licence_json = []
    for (let i in classLicences) {
        let licence = classLicences[i];
        class_licence_json.push(licence.toWeb())
    }
    return ReS(res, { classLicences: class_licence_json });
}
module.exports.getAll = getAll;

const get = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let classLicences = req.classLicences;
    return ReS(res, { cities: classLicences.toWeb() });
}
module.exports.get = get;


const update = async function(req, res) {
    let err, classLicences, data;
    classLicences = req.classLicences;
    data = req.body;

    classLicences.set(data);

    [err, classLicences] = await to(classLicences.save());
    if (err) {
        return ReE(res, err);
    }
    return ReS(res, { classLicences: classLicences.toWeb() });
}
module.exports.update = update;

const remove = async function(req, res) {
    let classLicences, err;
    classLicences = req.classLicences;

    [err, classLicences] = await to(classLicences.remove());
    if (err) return ReE(res, 'error occured trying to delete the class licence');

    return ReS(res, { message: 'Deleted class licence' }, 204);
}
module.exports.remove = remove;