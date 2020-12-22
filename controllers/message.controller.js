const { Message } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

let create = async function(req, res, next) {

    res.setHeader('Content-Type', 'application/json');

    let err, message;
    // console.log(req)
    //let user = req.user;
    // console.log(req.user)
    let message_info = req.body;
    console.log(message_info);

    [err, message] = await to(Message.create(message_info));
    if (err) return ReE(res, err, 422);

    return ReS(res, { message: message.toWeb() }, 201);
}

module.exports.create = create;

const getMessageList = function(req, res) {
    res.setHeader('Content-Type', 'application/json');


    let message_json = [];
    const response = dbs.collection("messages").find({});
    response.toArray(function(err, resdata) {
        for (let i in resdata) {
            message_json.push(resdata[i])
        }
        console.log(message_json)
        return ReS(res, { message: message_json });
    });
}
module.exports.getMessageList = getMessageList;

let getMessagedetails = async function(req, res, next) {

    console.log(req.params.message_id);
    Message.findById(req.params.message_id)
        .then(result => {
            res.status(200).json({
                message: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}
module.exports.getMessagedetails = getMessagedetails;

let removeMessage = async function(req, res, next) {

    var user_id = req.params.message_id;
    Message.findByIdAndRemove(user_id, function(err) {
        if (err) throw err;
        res.send("Successfully Record Deleted");
    })

}
module.exports.removeMessage = removeMessage;

let updateMessage = async function(req, res, next) {
    console.log(req.body)
    console.log(req.params.message_id)
    let id = req.params.message_id;
    let passData = req.body.description;
    Message.findById(id, function(err, data) {
        data.description = passData ? passData : data.description;
        console.log(data + '00000000000000')
        data.save(function(err) {
            if (err) throw err;
            res.send("Data updated successfully ");
        });
    });


}

module.exports.updateMessage = updateMessage;