const { Company } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

let create = async function(req, res, next) {

    res.setHeader('Content-Type', 'application/json');

    let err, company;
    // console.log(req)
    //let user = req.user;
    // console.log(req.user)
    let company_info = req.body;
    console.log(company_info);

    [err, company] = await to(Company.create(company_info));
    if (err) return ReE(res, err, 422);

    return ReS(res, { company: company.toWeb() }, 201);
}

module.exports.create = create;

const getcompanyList = function(req, res) {
    res.setHeader('Content-Type', 'application/json');


    let company_json = [];
    const response = dbs.collection("companies").find({});
    response.toArray(function(err, resdata) {
        for (let i in resdata) {
            company_json.push(resdata[i])
        }
        console.log(company_json)
        return ReS(res, { company: company_json });
    });
}
module.exports.getcompanyList = getcompanyList;

let getcompanydetails = async function(req, res, next) {

    console.log(req.params.company_id);
    Company.findById(req.params.company_id)
        .then(result => {
            res.status(200).json({
                company: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}
module.exports.getcompanydetails = getcompanydetails;

let removecompany = async function(req, res, next) {

    var user_id = req.params.company_id;
    Company.findByIdAndRemove(user_id, function(err) {
        if (err) throw err;
        res.send("Successfully Record Deleted");
    })

}
module.exports.removecompany = removecompany;

let updatecompany = async function(req, res, next) {
    console.log(req.body)
    console.log(req.params.company_id)
    let id = req.params.company_id;
    let passEmail = req.body.companyname;
    Company.findById(id, function(err, data) {
        data.companyname = passEmail ? passEmail : data.companyname;
        console.log(data + '00000000000000')
        data.save(function(err) {
            if (err) throw err;
            res.send("Data updated successfully ");
        });
    });


}

module.exports.updatecompany = updatecompany;