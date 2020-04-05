var service = {};
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });    // mongodb connectivity
db.bind('userInfo');

service.googleUserInfo = googleUserInfo;

module.exports = service;

function googleUserInfo(req,res){
    console.log("req",req.body)
    var data = req.body;
    var deffered = Q.defer();
   db.userInfo.insert(data,function(err,res){
       if(err) deffered.reject(err);
       else{
        deffered.resolve(res);
       }
       
   })
    
    return deffered.promise;
}