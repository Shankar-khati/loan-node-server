const { Employee } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

let create = async function(req, res, next) {

    res.setHeader('Content-Type', 'application/json');

    let err, employee;
    // console.log(req)
    //let user = req.user;
    // console.log(req.user)
    let employee_info = req.body;
    console.log(employee_info);

    [err, employee] = await to(Employee.create(employee_info));
    if (err) return ReE(res, err, 422);

    return ReS(res, { employee: employee.toWeb() }, 201);
}

module.exports.create = create;


const getEmployeeList = function(req, res) {
    res.setHeader('Content-Type', 'application/json');


    let employee_json = [];
    const response = dbs.collection("employees").find({});
    response.toArray(function(err, resdata) {
        for (let i in resdata) {
            employee_json.push(resdata[i])
        }
        console.log(employee_json)
        return ReS(res, { employee: employee_json });
    });
}
module.exports.getEmployeeList = getEmployeeList;

let getEmployeedetails = async function(req, res, next) {

    console.log(req.params.employee_id);
    Employee.findById(req.params.employee_id)
        .then(result => {
            res.status(200).json({
                employee: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}
module.exports.getEmployeedetails = getEmployeedetails;

let removeEmployee = async function(req, res, next) {

    var user_id = req.params.employee_id;
    Employee.findByIdAndRemove(user_id, function(err) {
        if (err) throw err;
        res.send("Successfully Record Deleted");
    })

}
module.exports.removeEmployee = removeEmployee;

let updateEmployee = async function(req, res, next) {
    console.log(req.body)
    console.log(req.params.employee_id)
    let id = req.params.employee_id;
    let passData = req.body.Borrower;
    Employee.findById(id, function(err, data) {
        data.Borrower = passData ? passData : data.Borrower;
        console.log(data + '00000000000000')
        data.save(function(err) {
            if (err) throw err;
            res.send("Data updated successfully ");
        });
    });


}

module.exports.updateEmployee = updateEmployee;