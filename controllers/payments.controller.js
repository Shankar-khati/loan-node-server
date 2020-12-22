const { Payments } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

let create = async function(req, res, next) {

    res.setHeader('Content-Type', 'application/json');

    let err, payments;
    // console.log(req)
    //let user = req.user;
    // console.log(req.user)
    let payments_info = req.body;
    console.log(payments_info);

    [err, payments] = await to(Payments.create(payments_info));
    if (err) return ReE(res, err, 422);

    return ReS(res, { payments: payments.toWeb() }, 201);
}

module.exports.create = create;

const getPaymentsList = function(req, res) {
    res.setHeader('Content-Type', 'application/json');


    let payments_json = [];
    const response = dbs.collection("payments").find({});
    response.toArray(function(err, resdata) {
        for (let i in resdata) {
            payments_json.push(resdata[i])
        }
        console.log(payments_json)
        return ReS(res, { payments: payments_json });
    });
}
module.exports.getPaymentsList = getPaymentsList;

let getPaymentsdetails = async function(req, res, next) {

    console.log(req.params.payments_id);
    Payments.findById(req.params.payments_id)
        .then(result => {
            res.status(200).json({
                payments: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}
module.exports.getPaymentsdetails = getPaymentsdetails;

let removePayments = async function(req, res, next) {

    var user_id = req.params.payments_id;
    Payments.findByIdAndRemove(user_id, function(err) {
        if (err) throw err;
        res.send("Successfully Record Deleted");
    })

}
module.exports.removePayments = removePayments;

let updatePayments = async function(req, res, next) {
    console.log(req.body)
    console.log(req.params.payments_id)
    let id = req.params.payments_id;
    let passData = req.body.Customer;
    Payments.findById(id, function(err, data) {
        data.Customer = passData ? passData : data.Customer;
        console.log(data + '00000000000000')
        data.save(function(err) {
            if (err) throw err;
            res.send("Data updated successfully ");
        });
    });


}

module.exports.updatePayments = updatePayments;