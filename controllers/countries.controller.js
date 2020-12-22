const { Countries } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, countries;
    // let user = req.user;

    let countries_info = req.body;
    console.log(countries_info);

    [err, countries] = await to(Countries.create(countries_info));
    if (err) return ReE(res, err, 422);

    return ReS(res, { countries: countries.toWeb() }, 201);
}
module.exports.create = create;

const getAll = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    // let user = req.user;
    let err, countries;
    [err, countries] = await to(Countries.find({"countryStatus":"active"}));

    let countries_json = []
    for (let i in countries) {
        let country = countries[i];
        countries_json.push(country.toWeb())
    }
    return ReS(res, { countries: countries_json });
}
module.exports.getAll = getAll;

const get = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let countries = req.countries;
    return ReS(res, { countries: countries.toWeb() });
}
module.exports.get = get;

const update = async function(req, res) {
    let err, countries, data;
    countries = req.countries;
    data = req.body;
    console.log("update data", data);
    countries.set(data);

    [err, countries] = await to(countries.save());
    if (err) {
        return ReE(res, err);
    }
    return ReS(res, { countries: countries.toWeb() });
}
module.exports.update = update;

const remove = async function(req, res) {
    let countries, err;
    countries = req.countries;

    [err, countries] = await to(countries.remove());
    if (err) return ReE(res, 'error occured trying to delete the company');

    return ReS(res, { message: 'Deleted Company' }, 204);
}
module.exports.remove = remove;
