const { SavingAccount } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

let create = async function(req, res, next) {

    res.setHeader('Content-Type', 'application/json');

    let err, savingAccount;
    // console.log(req)
    //let user = req.user;
    // console.log(req.user)
    let savingAccount_info = req.body;
    console.log(savingAccount_info);

    [err, savingAccount] = await to(SavingAccount.create(savingAccount_info));
    if (err) return ReE(res, err, 422);

    return ReS(res, { savingAccount: savingAccount.toWeb() }, 201);
}

module.exports.create = create;

const getSavingAccountList = function(req, res) {
    res.setHeader('Content-Type', 'application/json');


    let savingaccounts_json = [];
    const response = dbs.collection("savingaccounts").find({});
    response.toArray(function(err, resdata) {
        for (let i in resdata) {
            savingaccounts_json.push(resdata[i])
        }
        console.log(savingaccounts_json)
        return ReS(res, { savingaccounts: savingaccounts_json });
    });
}
module.exports.getSavingAccountList = getSavingAccountList;

let getSavingAccountdetails = async function(req, res, next) {

    console.log(req.params.savingAccount_id);
    SavingAccount.findById(req.params.savingAccount_id)
        .then(result => {
            res.status(200).json({
                savingAccount: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}
module.exports.getSavingAccountdetails = getSavingAccountdetails;

let removeSavingAccount = async function(req, res, next) {

    var user_id = req.params.savingAccount_id;
    SavingAccount.findByIdAndRemove(user_id, function(err) {
        if (err) throw err;
        res.send("Successfully Record Deleted");
    })

}
module.exports.removeSavingAccount = removeSavingAccount;


let updateSavingAccount = async function(req, res, next) {
    console.log(req.body)
    console.log(req.params.savingAccount_id)
    let id = req.params.savingAccount_id;
    let passData = req.body.FName;
    SavingAccount.findById(id, function(err, data) {
        data.FName = passData ? passData : data.FName;
        console.log(data + '00000000000000')
        data.save(function(err) {
            if (err) throw err;
            res.send("Data updated successfully ");
        });
    });


}

module.exports.updateSavingAccount = updateSavingAccount;