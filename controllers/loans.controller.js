const { Loans } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

let create = async function(req, res, next) {

    res.setHeader('Content-Type', 'application/json');

    let err, loan;
    // console.log(req)
    //let user = req.user;
    // console.log(req.user)
    let loan_info = req.body;
    console.log(loan_info);

    [err, loan] = await to(Loans.create(loan_info));
    if (err) return ReE(res, err, 422);

    return ReS(res, { loan: loan.toWeb() }, 201);
}

module.exports.create = create;

const getLoansList = function(req, res) {
    res.setHeader('Content-Type', 'application/json');


    let loan_json = [];
    const response = dbs.collection("loans").find({});
    response.toArray(function(err, resdata) {
        for (let i in resdata) {
            loan_json.push(resdata[i])
        }
        console.log(loan_json)
        return ReS(res, { loan: loan_json });
    });
}
module.exports.getLoansList = getLoansList;

let getLoansdetails = async function(req, res, next) {

    console.log(req.params.loans_id);
    Loans.findById(req.params.loans_id)
        .then(result => {
            res.status(200).json({
                loans: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}
module.exports.getLoansdetails = getLoansdetails;

let removeLoans = async function(req, res, next) {

    var user_id = req.params.loans_id;
    Loans.findByIdAndRemove(user_id, function(err) {
        if (err) throw err;
        res.send("Successfully Record Deleted");
    })

}
module.exports.removeLoans = removeLoans;

let updateLoans = async function(req, res, next) {
    console.log(req.body)
    console.log(req.params.loans_id)
    let id = req.params.loans_id;
    let passData = req.body.Account;
    Loans.findById(id, function(err, data) {
        data.Account = passData ? passData : data.Account;
        console.log(data + '00000000000000')
        data.save(function(err) {
            if (err) throw err;
            res.send("Data updated successfully ");
        });
    });


}

module.exports.updateLoans = updateLoans;