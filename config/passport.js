const FacebookTokenStrategy = require('passport-facebook-token');
var jwt = require('jsonwebtoken');
var mongo = require('mongoskin');
var configAuth = require('./auth'); // use this one for testing
var fs = require('fs');
var path = require('path');
var db = mongo.db(config.connectionString, { native_parser: true });    // mongodb connectivity
db.bind('users');

module.exports = function (passport) {

    passport.use(new FacebookTokenStrategy({

        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
        function (req, token, refreshToken, profile, done) {
            console.log("inside passport.js req is          ", req);
            console.log("inside passport.js refreshToken is      ", done);
            console.log("inside passport.js profile is       ", profile);
            console.log("inside passport.js token is        ", token);
            console.log("inside passport.js email is        ", profile.emails);
            // asynchronous
            process.nextTick(function () {

                db.collection("users").findOne({ email: profile.emails[0].value }, function (err, user) {
                    console.log("mongo error : ", err);
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    // console.log("USER already exists : " + JSON.stringify(user));
                    if (user) {
                        user.flagForOAuth = '1';
                        var jwtToken = jwt.sign({ sub: user._id }, config.secret)

                        jwt.verify(jwtToken, config.secret, function (err, decoded) {
                            if (err) {
                                // return res.(err);
                                // res.send({
                                //     message: err,         // authentication successful and send token
                                // });
                                return done(err)
                            }
                            else {
                                console.log("verify ", decoded)
                                // req.session.token = jwtToken;
                                // console.log("TOKEN : " + req.session.token);
                                var response = {};
                                response["token"] = jwtToken;
                                response["message"] = "Successful";
                                response["user"] = user;
                                response["accessToken"] = token;
                                
                                
                                // abc(response);

                                // return done(user, jwtToken)
                                return done(null, response);
                                // res.status(200).send(response);
                            }
                        });

                    } else {

                        var userAdd = {
                            "username": profile.name.givenName,
                            "email": profile.emails[0].value,
                            "flagForOAuth": "1",
                            "flagForTooltipTour": 1,
                            "profileImageName": "user.png"
                        }

                        console.log("add user ", userAdd);
                        // console.log("userAdd = ", userAdd);
                        db.collection("users").insert(userAdd, function (err, doc) {
                            if (err) deferred.reject(err.name + ': ' + err.message);
                            console.log("abc", doc)


                            if (doc) {
                                console.log("###########", doc.ops[0]._id);

                                var destDir = (path.join(__dirname, '../uploads/profile-picture/' + profile.emails[0].value + ""))
                                fs.mkdir(destDir, function () {
                                    var readFile = (path.join(__dirname, '../uploads/profile-picture/default/user.png'))
                                    var inStr = fs.createReadStream(readFile);
                                    var writeFile = (path.join(__dirname, '../uploads/profile-picture/' + profile.emails[0].value + '/user.png'))
                                    var outStr = fs.createWriteStream(writeFile)
                                    inStr.pipe(outStr);
                                })

                                var idForToken = doc.ops[0]._id;

                                var jwtToken = jwt.sign({ sub: idForToken }, config.secret)

                                jwt.verify(jwtToken, config.secret, function (err, decoded) {
                                    if (err) {
                                        // res.send({
                                        //     message: err,         // authentication successful and send token
                                        // });

                                    }
                                    else {
                                        console.log("verify ", decoded)
                                        // req.session.token = jwtToken;
                                        console.log("TOKEN at add : " + jwtToken);
                                        var response = {};
                                        response["token"] = jwtToken;
                                        response["message"] = "Successful";
                                        response["user"] = doc.ops[0];
                                        response["accessToken"] = token;

                                        return done(null, response)
                                        // res.status(200).send(response);
                                    }
                                });

                            } else {
                                return done(null)

                            }
                        });

                    }
                })
            });



        }));

};