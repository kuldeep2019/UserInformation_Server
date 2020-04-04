var config = require('config.json');
var express = require('express');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var rp = require('request-promise');
var mongo = require('mongoskin');
var service = {};

service.authenticate = authenticate;
module.exports = service;

function authenticate(req, res) {
    var deferred = Q.defer();
    var username = req.body.username;
    var password = req.body.password
    console.log("req.body",req.body)
    db.User.findOne({ username: username }, function (err, user) {
        var userToken = jwt.sign({ sub: user._id }, config.secret);
        console.log("userToken:",userToken)
        deferred.resolve({message:"successful"})
    })
    return deferred.promise
}