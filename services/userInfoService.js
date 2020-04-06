/**
 * Created By :- Madhu Jha
 * Created Date :- 05--2020 8:18 pm
 * Version :- 1.0
 */

var service = {};
var Q = require('q');
var mongo = require('mongoskin');
var config = require('../config/config')
var db = mongo.db(config.connectionString, { native_parser: true });    // mongodb connectivity
db.bind('UserInfo');

service.googleUserInfo = googleUserInfo;
service.getUserDetails = getUserDetails;
module.exports = service;

// Insert User Info in DB
function googleUserInfo(req,res){
    var deffered = Q.defer();
    console.log("req",req.body)
    var data = req.body;
    
   db.UserInfo.insert(data,function(err,res){
       if(err) deffered.reject(err);
       else{
        deffered.resolve(res);
       } 
   })
    return deffered.promise;
}

// Get User Details from DB
function getUserDetails(req,res){
    console.log("requestedData is",req.body)

    var deffered = Q.defer();
    var userName = req.body;
//    db.UserInfo.find({},function(err,res){
//        console.log("response",res)
//        if(err) deffered.reject(err);
//        else{
//         deffered.resolve(res);
//        } 
//    })
   db.UserInfo.find({fullName:userName}).toArray(function (err, user) {
    if (err) deffered.reject(err.name + ': ' + err.message);
    console.log("response",user)
    deffered.resolve(user);
  });
    return deffered.promise;
}