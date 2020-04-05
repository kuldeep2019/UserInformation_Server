/**
 * Created By :- Madhu Jha
 * Created Date :- 05--2020 8:11 pm
 * Version :- 1.0
 */

var express = require("express");
var router = express.Router();
var userInfoService = require("../services/userInfoService");

router.post('/googleUserInfo', googleUserInfo);
module.exports = router;

/** 
 * @author:Madhu Jha
 * @argument:None
 * @description:Provide User Info.
 */
function googleUserInfo(req, res) {
    userInfoService.googleUserInfo(req).then(function(data) {
            res.send(data);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}