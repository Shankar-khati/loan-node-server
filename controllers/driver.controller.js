const { Driver } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');
const create = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, driver;
    // let user = req.user;

    let driver_info = req.body;
    console.log(driver_info);

    [err, driver] = await to(Driver.create(driver_info));
    if (err) return ReE(res, err, 422);

    return ReS(res, { driver: driver.toWeb() }, 201);
}
module.exports.create = create;

const getAll =  async function(req, res) {

    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let driver_json = [];
           const response = await dbs.collection("drivers").aggregate([
            {
                $lookup: {
                            from: "users",
                            localField: "user",
                            foreignField: "_id",
                            as: "user"   
                        }
                        
            },
            {
                $unwind:"$user"
            },
             {
                $lookup:
                {
                    from: "countries",
                    localField: "user.country",
                    foreignField: "_id",
                    as: "country"
                }
            },
            {
                $unwind: "$country"
            },
            {$sort: {'country.countryName': -1}},
            {
            $project: {
                "_id": 1,
                "userFirstName": "$user.userFirstName",
                "userLastName": "$user.userLastName",
                "userEmail": "$user.userEmail",
                "userPhone": "$user.userPhone",
                 "userStatus": "$user.userStatus",
                "countryName": "$country.countryName",
                "driverLicence":1,
                "driverDob":1,
                "driverLicenceFront":1,
                "driverLicenceBack":1,
                "driverIssueDate":1,
                "driverExpiryDate":1
                
            }
        }
            
        ]);    
        response.toArray(function(err,resdata){
            for (let i in resdata) {
               driver_json.push(resdata[i])
            }
            return ReS(res, { driver: driver_json });
        });

}


module.exports.getAll = getAll;


const getDriverByUser = async function(req, res) {

    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
   
    let err, driver;
        [err, driver] = await to(Driver.find({"user":user._id}).populate({"path":"user","select": '-userPassword -userAuthKey -userDeviceType'}))
    let driver_json = []
    for (let i in driver) {
        let driver_data = driver[i];
        driver_json.push(driver_data.toWeb())
    }
    return ReS(res, { driver: driver_json });
}

module.exports.getDriverByUser = getDriverByUser;

const get = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let driver = req.driver;
    return ReS(res, { driver: driver.toWeb() });
}
module.exports.get = get;

const update = async function(req, res) {
    let err, driver, data;
    driver = req.driver;
    data = req.body;
    driver.set(data);

    [err, driver] = await to(driver.save());
    if (err) {
        return ReE(res, err);
    }
    return ReS(res, { driver: driver.toWeb() });
}
module.exports.update = update;

const remove = async function(req, res) {
    let driver, err;
    driver = req.driver;

    [err, driver] = await to(driver.remove());
    if (err) return ReE(res, 'error occured trying to delete the driver');

    return ReS(res, { message: 'Deleted Driver' }, 204);
}
module.exports.remove = remove;
