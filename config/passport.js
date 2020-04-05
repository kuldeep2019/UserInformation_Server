var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var jwt = require('jsonwebtoken');
var mongo = require('mongoskin');
var config = require('./config');
var configAuth = require('./auth'); // use this one for testing
var fs = require('fs');
var path = require('path');
var config = require('../config/config.json');
var db = mongo.db(config.connectionString, { native_parser: true });    // mongodb connectivity
db.bind('users');

module.exports = function (passport) {
    passport.use(new GoogleStrategy({

        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
        function (req, token, refreshToken, profile, done) {
            console.log("response: ",profile.displayName,profile.emails[0].value,profile.photos[0].value)
            process.nextTick(function () {
                //Check whether the User exists or not using profile.id
                return done(null, profile);
              });
        }))
    //Facebook
    passport.use(new FacebookStrategy({

        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: ["email", "name"],
        passReqToCallback: true
    },
        function (req, token, refreshToken, profile, done) {
            // console.log("response: ",profile)
            return done(null, profile)
        })); 
};