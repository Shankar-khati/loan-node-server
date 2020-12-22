const { ModulePermission } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

let create = async function(req, res, next) {

    res.setHeader('Content-Type', 'application/json');

    let err, modulepermission;
    // console.log(req)
    //let user = req.user;
    // console.log(req.user)
    let modulepermission_info = req.body;
    console.log(modulepermission_info);

    [err, modulepermission] = await to(ModulePermission.create(modulepermission_info));
    if (err) return ReE(res, err, 422);

    return ReS(res, { modulepermission: modulepermission.toWeb() }, 201);
}
module.exports.create = create;


const getModulePermissionList = function(req, res) {
    res.setHeader('Content-Type', 'application/json');


    let module_json = [];
    const response = dbs.collection("modulepermissions").find({});
    response.toArray(function(err, resdata) {
        for (let i in resdata) {
            module_json.push(resdata[i])
        }
        console.log(module_json)
        return ReS(res, { modulepermission: module_json });
    });
}
module.exports.getModulePermissionList = getModulePermissionList;

let getModulePermissiondetails = async function(req, res, next) {

    console.log(req.params.modulePermission_id);
    ModulePermission.findById(req.params.modulePermission_id)
        .then(result => {
            res.status(200).json({
                modulepermission: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}
module.exports.getModulePermissiondetails = getModulePermissiondetails;

let removeModulePermission = async function(req, res, next) {

    var user_id = req.params.modulePermission_id;
    ModulePermission.findByIdAndRemove(user_id, function(err) {
        if (err) throw err;
        res.send("Successfully Record Deleted");
    })

}
module.exports.removeModulePermission = removeModulePermission;

let updateModulePermission = async function(req, res, next) {
    console.log(req.body)
    console.log(req.params.modulePermission_id)
    let id = req.params.modulePermission_id;
    let passData = req.body.companyname;
    ModulePermission.findById(id, function(err, data) {
        data.companyname = passData ? passData : data.companyname;
        console.log(data + '00000000000000')
        data.save(function(err) {
            if (err) throw err;
            res.send("Data updated successfully ");
        });
    });


}

module.exports.updateModulePermission = updateModulePermission;