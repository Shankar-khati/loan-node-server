const { EmailPanel } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');
const create = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    let err, emailPanel;
    console.log("ooooooooooooooooooooooooooooooooooo")
        // console.log(req)
        //let user = req.user;
        // console.log(req.user)
    let emailPanel_info = req.body;
    console.log(emailPanel_info);

    [err, emailPanel] = await to(EmailPanel.create(emailPanel_info));
    if (err) return ReE(res, err, 422);

    return ReS(res, { emailPanel: emailPanel.toWeb() }, 201);
}
module.exports.create = create;

const getEmailPanelList = function(req, res) {
    res.setHeader('Content-Type', 'application/json');


    let emailPanel_json = [];
    const response = dbs.collection("emailpanels").find({});
    response.toArray(function(err, resdata) {
        for (let i in resdata) {
            emailPanel_json.push(resdata[i])
        }
        console.log(emailPanel_json)
        return ReS(res, { emailPanel: emailPanel_json });
    });
}
module.exports.getEmailPanelList = getEmailPanelList;

let getemailPaneldetails = async function(req, res, next) {

    console.log(req.params.emailPanel_id);
    EmailPanel.findById(req.params.emailPanel_id)
        .then(result => {
            res.status(200).json({
                emailPanel: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}
module.exports.getemailPaneldetails = getemailPaneldetails;

let removeemailPanel = async function(req, res, next) {

    var user_id = req.params.emailPanel_id;
    EmailPanel.findByIdAndRemove(user_id, function(err) {
        if (err) throw err;
        res.send("Successfully Record Deleted");
    })

}
module.exports.removeemailPanel = removeemailPanel;

let updateemailPanel = async function(req, res, next) {
    console.log(req.body)
    console.log(req.params.emailPanel_id)
    let id = req.params.emailPanel_id;
    let passData = req.body.reciver;
    EmailPanel.findById(id, function(err, data) {
        data.reciver = passData ? passData : data.reciver;
        console.log(data + '00000000000000')
        data.save(function(err) {
            if (err) throw err;
            res.send("Data updated successfully ");
        });
    });


}

module.exports.updateemailPanel = updateemailPanel;