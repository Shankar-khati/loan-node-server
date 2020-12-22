const { States } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, states;
    // let user = req.user;

    let states_info = req.body;
    console.log(states_info);

    [err, states] = await to(States.create(states_info));
    if (err) return ReE(res, err, 422);

    return ReS(res, { states: states.toWeb() }, 201);
}
module.exports.create = create;

const getAll = async function(req, res) {

    res.setHeader('Content-Type', 'application/json');
    // let user = req.user;
    const country_id = req.query.country_id;
    let err, states;
    if (country_id != '' && country_id != undefined) {
        [err, states] = await to(States.find({ 'country': country_id }));
    } else {
        [err, states] = await to(States.find());
    }
    let states_json = []
    for (let i in states) {
        let state = states[i];
        states_json.push(state.toWeb())
    }
    return ReS(res, { states: states_json });
}
module.exports.getAll = getAll;

const get = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let states = req.states;
    return ReS(res, { states: states.toWeb() });
}
module.exports.get = get;

const update = async function(req, res) {
    let err, states, data;
    states = req.states;
    data = req.body;
    console.log("update data", data);
    states.set(data);

    [err, states] = await to(states.save());
    if (err) {
        return ReE(res, err);
    }
    return ReS(res, { states: states.toWeb() });
}
module.exports.update = update;

const remove = async function(req, res) {
    let states, err;
    states = req.states;

    [err, states] = await to(states.remove());
    if (err) return ReE(res, 'error occured trying to delete the company');

    return ReS(res, { message: 'Deleted Company' }, 204);
}
module.exports.remove = remove;