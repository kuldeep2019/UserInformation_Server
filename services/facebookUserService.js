/**
 * Created By :- Madhu Jha
 * Created Date :- 06--2020 3:10 pm
 * Version :- 1.0
 */

var service = {};
var Q = require('q');
var mongo = require('mongoskin');
var config = require('../config/config')
var db = mongo.db(config.connectionString, { native_parser: true });    // mongodb connectivity
db.bind('FacebookUserInfo'); // add collection in DB

service.facebookUserInfo = facebookUserInfo;
service.getfacebookUserInfo = getfacebookUserInfo;
module.exports = service;

// Insert User Info in DB
function facebookUserInfo(req,res){
    var deffered = Q.defer();
    console.log("req",req.body)
    var data = req.body;
    
   db.FacebookUserInfo.insert(data,function(err,res){
       if(err) deffered.reject(err);
       else{
        deffered.resolve(res);
       } 
   })
    return deffered.promise;
}

// Get User Details from DB
function getfacebookUserInfo(req,res){
    console.log("requestedData is",req.body)

    var deffered = Q.defer();
    var fullName = req.body.userName;
//    db.UserInfo.find({},function(err,res){
//        console.log("response",res)
//        if(err) deffered.reject(err);
//        else{
//         deffered.resolve(res);
//        } 
//    })
   db.FacebookUserInfo.find({fullName:fullName}).toArray(function (err, user) {
    if (err) deffered.reject(err.name + ': ' + err.message);
    console.log("response",user)
    deffered.resolve(user);
  });
    return deffered.promise;
}