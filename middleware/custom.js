const Company = require('../models/company.model');
const Countries = require('../models/countries.model');
const States = require('../models/states.model');
const Cities = require('../models/cities.model');
const { to, ReE, ReS } = require('../services/util.service');

let company = async function(req, res, next) {
    let company_id, err, company;
    company_id = req.params.company_id;

    [err, company] = await to(Company.findOne({ _id: company_id }));
    if (err) return ReE(res, "err finding company");

    if (!company) return ReE(res, "Company not found with id: " + company_id);
    let user, users_array;
    user = req.user;
    users_array = company.users.map(obj => String(obj.user));

    if (!users_array.includes(String(user._id))) return ReE(res, "User does not have permission to read app with id: " + app_id);

    req.company = company;
    next();
}
module.exports.company = company;

let countries = async function(req, res, next) {
    let countries_id, err, countries;
    countries_id = req.params.countries_id;

    [err, countries] = await to(Countries.findOne({ _id: countries_id }));
    if (err) return ReE(res, "err finding countries");

    if (!countries) return ReE(res, "Country not found with id: " + countries_id);
    req.countries = countries;
    next();
}
module.exports.countries = countries;

let states = async function(req, res, next) {
    let states_id, err, states;
    states_id = req.params.states_id;

    [err, states] = await to(States.findOne({ _id: states_id }));
    if (err) return ReE(res, "err finding states");

    if (!states) return ReE(res, "State not found with id: " + states_id);
    req.states = states;
    next();
}
module.exports.states = states;

let cities = async function(req, res, next) {
    let cities_id, err, cities;
    cities_id = req.params.cities_id;

    [err, cities] = await to(Cities.findOne({ _id: cities_id })
        .populate('country')
        .populate('state')
    );
    if (err) return ReE(res, "err finding states");

    if (!cities) return ReE(res, "State not found with id: " + cities_id);
    req.cities = cities;
    next();
}
module.exports.cities = cities;