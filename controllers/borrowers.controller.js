const { Borrowers, User } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

let create = async function(req, res, next) {

    res.setHeader('Content-Type', 'application/json');

    let err, borrower;
    // console.log(req)
    //let user = req.user;
    console.log(req)
    let borrower_info = req.body;
    console.log(borrower_info);

    [err, borrower] = await to(Borrowers.create(borrower_info));
    if (err) return ReE(res, err, 422);

    return ReS(res, { borrower: borrower.toWeb() }, 201);
}

module.exports.create = create;

const getBorrowersList = function(req, res) {
    res.setHeader('Content-Type', 'application/json');


    let borrowers_json = [];
    const response = dbs.collection("borroweres").find({});
    response.toArray(function(err, resdata) {
        for (let i in resdata) {
            borrowers_json.push(resdata[i])
        }
        console.log(borrowers_json)
        return ReS(res, { borrowers: borrowers_json });
    });
}
module.exports.getBorrowersList = getBorrowersList;

let getBorrowersdetails = async function(req, res, next) {

    console.log(req.params.borrowers_id);
    Borrowers.findById(req.params.borrowers_id)
        .then(result => {
            res.status(200).json({
                borrowers: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}
module.exports.getBorrowersdetails = getBorrowersdetails;

let removeBorrowers = async function(req, res, next) {

    var user_id = req.params.borrowers_id;
    Borrowers.findByIdAndRemove(user_id, function(err) {
        if (err) throw err;
        res.send("Successfully Record Deleted");
    })

}
module.exports.removeBorrowers = removeBorrowers;

let updateBorrowers = async function(req, res, next) {
    console.log(req.body)
    console.log(req.params.borrowers_id)
    let id = req.params.borrowers_id;
    let pass = req.body.borrower;
    let passData = req.body;
    Borrowers.findById(id, function(err, data) {
        data.borrower = passData ? passData : data.borrower;
        console.log(data + '00000000000000' + passData)
        data.zipcode = passData.zipcode;
        data.comment = passData.comment;
        data.statename = passData.statename;
        data.cityname = passData.cityname;
        data.textarea1 = passData.textarea1;
        data.textarea = passData.textarea;
        data.phone = passData.phone;
        data.emailname = passData.emailname;
        data.lastname = passData.lastname;
        data.firstname = passData.firstname;
        data.account = passData.account;
        data.imagename = passData.imagename;




        data.save(function(err) {
            if (err) throw err;
            res.send("Data updated successfully ");
        });
    });


}

module.exports.updateBorrowers = updateBorrowers;