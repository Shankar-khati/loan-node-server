const { Employer,User } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employer;
    // let user = req.user;

    let employer_info = req.body;
    console.log(employer_info);

    [err, employer] = await to(Employer.create(employer_info));
    if (err) return ReE(res, err, 422);

    return ReS(res, { employer: employer.toWeb() }, 201);
}
module.exports.create = create;

const getAllEmployers = async function(req, res) {

    res.setHeader('Content-Type', 'application/json');
    // let user = req.user;
   
    let err, employer;
    
        [err, employer] = await to(User.find({ userRole: { $in: ["IndividualEmployer", "CorporateEmployer"] } }).select(' -userAuthKey -userPassword').populate('country'))
    let employer_json = []
    for (let i in employer) {
        let employer_data = employer[i];
        employer_json.push(employer_data.toWeb())
    }
    return ReS(res, { employer: employer_json });
}
module.exports.getAllEmployers = getAllEmployers;


const getAll = async function(req, res) {

    res.setHeader('Content-Type', 'application/json');
    // let user = req.user;
   
    let err, employer;
    
        [err, employer] = await to(Employer.find().populate({"path":"user","select": '-userPassword -userAuthKey -userDeviceType'}));
    let employer_json = []
    for (let i in employer) {
        let employer_data = employer[i];
        employer_json.push(employer_data.toWeb())
    }
    return ReS(res, { employer: employer_json });
}
module.exports.getAll = getAll;

const get = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let employer = req.employer;
    return ReS(res, { employer: employer.toWeb() });
}
module.exports.get = get;

const update = async function(req, res) {
    let err, employer, data;
    employer = req.employer;
    data = req.body;
    employer.set(data);

    [err, employer] = await to(employer.save());
    if (err) {
        return ReE(res, err);
    }
    return ReS(res, { employer: employer.toWeb() });
}
module.exports.update = update;

const remove = async function(req, res) {
    let driver, err;
    employer = req.employer;

    [err, employer] = await to(employer.remove());
    if (err) return ReE(res, 'error occured trying to delete the employer');

    return ReS(res, { message: 'Deleted Employer' }, 204);
}
module.exports.remove = remove;