const { EmployerDriver } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, employerDriver;
    // let user = req.user;

    let employer_driver_info = req.body;
    console.log(EmployerDriver,"dfdf");

    [err, employerDriver] = await to(EmployerDriver.create(employer_driver_info));
    if (err) return ReE(res, err, 422);

    return ReS(res, { employerDriver: employerDriver.toWeb() }, 201);
}
module.exports.create = create;

const getAll = async function(req, res) {

    res.setHeader('Content-Type', 'application/json');
    // let user = req.user;
   
    let err, employerDriver;
    
        [err, employerDriver] = await to(EmployerDriver.find()
        .populate('employer')
        .populate('driver')
     );
    let employer_driver_json = []
    for (let i in employerDriver) {
        let employer_driver_data = employerDriver[i];
        employer_driver_json.push(employer_driver_data.toWeb())
    }
    return ReS(res, { employerDriver: employer_driver_json });
}
module.exports.getAll = getAll;

const get = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let employerDriver = req.employerDriver;
    return ReS(res, { employerDriver: employerDriver.toWeb() });
}
module.exports.get = get;

const update = async function(req, res) {
    let err, employerDriver, data;
    employerDriver = req.employerDriver;
    data = req.body;
    employerDriver.set(data);

    [err, employerDriver] = await to(employerDriver.save());
    if (err) {
        return ReE(res, err);
    }
    return ReS(res, { employerDriver: employerDriver.toWeb() });
}
module.exports.update = update;

const remove = async function(req, res) {
    let employerDriver, err;
    employerDriver = req.employerDriver;

    [err, employerDriver] = await to(employerDriver.remove());
    if (err) return ReE(res, 'error occured trying to delete the employer driver');

    return ReS(res, { message: 'Deleted Employer driver' }, 204);
}
module.exports.remove = remove;