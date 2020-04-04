var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('services/svr.user.service');

module.exports = router;

function authenticateUser(req, res) {
    
    userService.authenticate(req, res)
        .then(function (data) {
            if (data) {
                res.send(data);
            } else {
                res.status(401).send('Username or password is incorrect');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}