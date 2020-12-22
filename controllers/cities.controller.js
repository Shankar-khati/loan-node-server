const { Cities } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, cities;
    // let user = req.user;

    let cities_info = req.body;

    [err, cities] = await to(Cities.create(cities_info));
    if (err) return ReE(res, err, 422);

    return ReS(res, { cities: cities.toWeb() }, 201);
}
module.exports.create = create;

const getAll = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    // let user = req.user;
    const country_id = req.query.country_id;
    const state_id = req.query.state_id;
    let err, cities;
    if ((country_id != '' && country_id != undefined) || (state_id != '' && state_id != undefined)) {
        let query = {};
        if (country_id != '' && country_id != undefined)
            query['country'] = country_id
        if (state_id != '' && state_id != undefined)
            query['state'] = state_id;
        [err, cities] = await to(Cities.find(query)
            .populate('country')
            .populate('state')
        );
    } else {
        [err, cities] = await to(Cities.find()
            .populate('country')
            .populate('state')
        );
    }


    let cities_json = []
    for (let i in cities) {
        let city = cities[i];
        cities_json.push(city.toWeb())
    }
    return ReS(res, { cities: cities_json });
}
module.exports.getAll = getAll;

const get = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let cities = req.cities;
    return ReS(res, { cities: cities.toWeb() });
}
module.exports.get = get;

const update = async function(req, res) {
    let err, cities, data;
    cities = req.cities;
    data = req.body;
    console.log("update data", data);
    cities.set(data);

    [err, cities] = await to(cities.save());
    if (err) {
        return ReE(res, err);
    }
    return ReS(res, { cities: cities.toWeb() });
}
module.exports.update = update;

const remove = async function(req, res) {
    let cities, err;
    cities = req.cities;

    [err, cities] = await to(cities.remove());
    if (err) return ReE(res, 'error occured trying to delete the company');

    return ReS(res, { message: 'Deleted Company' }, 204);
}
module.exports.remove = remove;