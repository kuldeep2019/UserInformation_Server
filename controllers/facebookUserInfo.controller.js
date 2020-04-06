/**
 * Created By :- Madhu Jha
 * Created Date :- 06--2020 02:11 am
 * Version :- 1.0
 */

var express = require("express");
var router = express.Router();
var userInfoService = require("../services/facebookUserService");

router.post('/facebookUserInfo', facebookUserInfo);
router.post('/getfacebookUserInfo',getfacebookUserInfo)
module.exports = router;

/** 
 * @author:Madhu Jha
 * @argument:None
 * @description:Provide User Info.
 */
function facebookUserInfo(req, res) {
    userInfoService.facebookUserInfo(req).then(function(data) {
            res.send(data);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}
/** 
 * @author:Madhu Jha
 * @argument:None
 * @description:Get User Info.
 */
function getfacebookUserInfo(req, res) {
    console.log("req in controller",req.query.params);
    console.log("req in controller",req.params);
    userInfoService.getfacebookUserInfo(req).then(function(data) {
            res.send(data);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}